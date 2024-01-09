import {
    React, Suspense, useEffect, useParams, useState, useHistory, useForm, useTranslation, Localbase, EmptyProduct,
    useLocation
} from 'libraries';
import {
    getProductDetails,
    postRequestStockAlert,
    postReportProduct,
    getSimulationInstallments,
    getCalculateInstallments,
    getShipmentVendors,
    getProductLinks,
    postProductDiscussion,
    getProductDiscussions,
    postWishlistProduct,
    deleteWishlistProduct,
    postCartItem,
    getCarts,
    postShortLinks,
    headWishlistProduct,
    postShipmentTariffs,
    getProductReviews,
    postCalculatePrice
} from 'services';
import {getHostUrl, getIdentityFromHref, setErrorValidation} from "utils";

import aboutProduct from 'configs/data/aboutProductDetail.json';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/scss/product/productItem.scss";
import "assets/scss/product/productDetail.scss";
import "assets/scss/product/productView.scss";
import "assets/scss/product/pagination.scss";
import "assets/scss/button/button.scss";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const ProductDetailOrganism = React.lazy(() => import('components/organisms/ProductOrganism/ProductDetailOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const ProductDetail = () => {

    const t = useTranslation();
    const params = useParams();
    const history = useHistory();
    const location = useLocation();
    const acceess = localStorage.getItem('access');

    const [meta, setMeta] = useState({
        title: 'KitchenArt - Home Appliances',
        keyword: '',
        description: ''
    });
    const [product, setProduct] = useState({
        name: null,
        code: null,
        brand: {
            href: null,
            name: null
        },
        category: {
            href: null,
            name: null,
            fullPath: null,
            fullSlug: null
        },
        images: [],
        availability: {
            value: null,
            label: null
        },
        stock: null,
        catalogFile: null,
        cuttingImage: null,
        price: {
            basePrice: 0,
            netPrice: 0
        },
        specifications: [],
        accessories: [],
        consumables: [],
        series: [],
        variants: [],
        related: [],
        videos: [],
        weight: 0,
        href: null,
        activePackages: [],
        activePromotion: []
    });
    const [slide, setSlide] = useState({
       image: null,
       key: 0,
    });
    const [value, setValue] = useState(0);
    const [valueSpecification, setValueSpecification] = useState(0);

    const [youtube] = useState({
        fullWidth: true,
        maxWidth: 'md',
    });
    const [openYoutube, setOpenYoutube] = useState(false);
    const [youtubeId, setYoutubeId] = useState(null);
    const [openReport, setOpenReport] = useState(false);
    const [openRequestStock, setOpenRequestStock] = useState(false);

    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [validation] = useState({
        detail: {
            email: [null],
        }
    });
    const { errors, setError, reset } = useForm();

    const [openSimulation, setOpenSimulation] = useState(false);
    const [indexInstallment, setIndexInstallment] = useState(0);
    const [openShipiingCost, setOpenShipiingCost] = useState(false);
    const [vendorShipment, setVendorShipment] = useState([]);
    const [openAddProductLink, setOpenAddProductLink] = useState(false);
    const [checkedProductLink, setCheckedProductLink] = useState([-1]);
    const [productLinks, setProductLinks] = useState([]);

    const [itemProductLink, setItemProductLink] = useState([]);
    const [count, setCount] = useState(0);
    const [productChosen, setProductChosen] = useState([]);
    const [discussion, setDiscussion] = useState([]);
    const [customer] = useState({
        name: "Username"
    });
    const [replies, setReplies] = useState([]);
    const [indexedReplies, setIndexedReplies] = useState([]);
    const [page, setPage] = useState(1);
    const [view, setView] = useState(15);
    const [hrefParams, setHrefParams] = useState('');
    const [loading, setLoading] = useState(true);
    const [paginationDiscussion, setPaginationDiscussion] = useState({
        total: 0,
        link: ''
    });
    const [parentQuestion, setParentQuestion] = useState(0);
    const [backDrop, setBackDrop] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [productAddCart, setProductAddCart] = useState([]);
    const [shortLink, setShortLink] = useState(process.env.REACT_APP_DOMAIN_NAME + location.pathname);
    const [openShortLink, setOpenShortLink] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [tariff, setTariff] = useState([]);
    const [message, setMessage] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [pageReview, setPageReview] = useState(1);
    const [viewPage, setViewPage] = useState(15);
    const [hrefParamsReview, setHrefParamsReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [paginationReview, setPaginationReview] = useState({
        total: 0,
        link: ''
    });
    const [detailReview, setDetailReview] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [openWholesale, setOpenWholesale] = useState(false);

    useEffect(() => {
        let db = new Localbase('db');
        const payload = {
            headers: {
                'Authorization': acceess,
                'Cache-Control': 'no-cache'
            },
            path: params.url
        };
        let countProductHistory = 0;
        let productsHistory = [];
        db.collection('product-history').get().then(products => {
            if (products !== undefined) {
                countProductHistory = products?.length;
                productsHistory.push(products);
            };
        });
        getProductDetails(payload).then(detail => {
            if (detail?.axiosResponse?.status === 200) {
                const data = detail?.axiosResponse?.data;
                setProduct(data);
                db.collection('product-history').doc({ href: data?.href }).get().then(document => {
                    if (document === undefined) {
                        if (countProductHistory < 30) {
                            if (data?.href !== undefined) {
                                db.collection('product-history').add({
                                    href: data?.href,
                                    name: data?.name,
                                    date: new Date(),
                                    slug: params.url
                                });
                            };
                        }
                        else {
                            db.collection('product-history').doc({ href: productsHistory[0][0]?.href }).delete().then(response => {
                                if (data?.href !== undefined) {
                                    db.collection('product-history').add({
                                        href: data?.href,
                                        name: data?.name,
                                        date: new Date(),
                                        slug: params.url
                                    });
                                };
                            });
                        };
                    }
                    else {
                        db.collection('product-history').doc({ href: data?.href }).update({
                            href: data?.href,
                            name: data?.name,
                            date: new Date(),
                            slug: params.url
                        });
                    }
                });
                let imageProduct = EmptyProduct;
                if (data.images?.length > 0) {
                    setSlide({image: data?.images[0]?.image, key: 0});
                    imageProduct = data?.images[0]?.image;
                }
                else {
                    setSlide({image: EmptyProduct, key: 0});
                };
                setMeta({
                    title: `KitchenArt - ${data?.name}`,
                    keyword: data?.seoMetaKeyword,
                    description: data?.seoMetaDescription,
                    image: data.images?.length > 0 ? data?.images[0]?.image : EmptyProduct,
                    titleShare: `${data?.brand?.name} ${data?.name} ${data?.code}`
                });
                localStorage.setItem('product', params.url);
                if (data?.isActive !== true) {
                    history.push('/404');
                };
                const href = getIdentityFromHref(data?.href);
                const payloadDiscussion = {
                    params: {
                        structure: 'parent',
                        is_active: true,
                        product: href,
                        page: 1,
                        per_page: view
                    }
                };
                getProductDiscussions(payloadDiscussion).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const dataDiscussion = result?.axiosResponse?.data;
                        setDiscussion(dataDiscussion);
                        setPaginationDiscussion({
                            total: result?.axiosResponse?.headers['x-total-results'],
                            link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                        });
                        setHrefParams(`?structure=parent&is_active=true&product=${href}&page=1&per_page=1`);
                        const payloadReview = {
                            params: {
                                product: href,
                                is_active: true,
                                page: 1,
                                per_page: 15
                            }
                        };
                        getProductReviews(payloadReview).then(reviews => {
                            if (reviews?.axiosResponse?.status === 200) {
                                const dataReview = reviews?.axiosResponse?.data;
                                setPaginationReview({
                                    total: reviews?.axiosResponse?.headers['x-total-results'],
                                    link: reviews?.axiosResponse?.headers?.link !== undefined ? reviews?.axiosResponse?.headers?.link : ''
                                });
                                setHrefParamsReview(`?is_active=true&product=${href}&page=1&per_page=15`);
                                setReviews(dataReview);
                                const payloadDetailReview = {
                                    path: 'rating-summary',
                                    params: {
                                        product: href
                                    }
                                };
                                getProductReviews(payloadDetailReview).then(reviewDetail => {
                                    if (reviewDetail?.axiosResponse?.status === 200) {
                                        const dataDetailReview =  reviewDetail?.axiosResponse?.data;
                                        setDetailReview(dataDetailReview);
                                    }
                                    const payloadShortLink = {
                                        headers: {
                                            'Authorization': acceess,
                                            'Cache-Control': 'no-cache'
                                        },
                                        body: {
                                            url: `${process.env.REACT_APP_DOMAIN_NAME}product/${href}`,
                                            og_title: `${data?.brand?.name} ${data?.name} ${data?.code}`,
                                            og_description: data?.seoMetaDescription,
                                            og_image: imageProduct
                                        }
                                    };
                                    postShortLinks(payloadShortLink).then(shortLink => {
                                        if (shortLink?.axiosResponse?.status === 200) {
                                            const dataShortLink = shortLink?.axiosResponse?.data;
                                            setShortLink(dataShortLink);
                                            setLoading(false);
                                        }
                                        else{
                                            setLoading(false);
                                        };
                                    });
                                });
                            };
                        });
                    };
                });
            }
        });
    }, [history, params, view, acceess]);

    const handleMultiSlide = (item, key) => {
          setSlide({
             image: item.image,
             key: key
          });
    };

    const handleDownload = (file) => {
        if (file !== null) {
            const fileDownload = getHostUrl(file);
            window.open(fileDownload);
        };
    };

    const handleChangeProduct = (href) => {
        setBackDrop(true);
        const url = getIdentityFromHref(href);
        history.push(`/product/${url}`);
        setTimeout(() => {
            setBackDrop(false);
        }, 3000);
    };

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeTabSpecification = (event, newValue) => {
        setValueSpecification(newValue);
    };

    const handleSeeMore = (href) => {
        const url = getIdentityFromHref(href);
        history.push(`/category/${url}`);
    };

    const handleShowYoutube = (item) => {
        setOpenYoutube(true);
        setYoutubeId(item);
    };

    const handleCloseYoutube = () => {
        setOpenYoutube(false);
    };

    const handleShowReport = () => {
        if (acceess !== null) {
            setOpenReport(true);
        }
        else {
            history.push('/login');
        };
    };

    const handleCloseReport = () => {
        setOpenReport(false);
    };

    const handleSubmitReportProduct = data => {
        setButtonLoading(true);
        let dataReport = [];
        if (data.allowImage === true) {
            dataReport.push('Image');
        };
        if (data.allowDescription === true) {
            dataReport.push('Description');
        };
        if (data.allowCuttingSize === true) {
            dataReport.push('Cutting Size');
        };
        if (data.allowOthers === true) {
            dataReport.push('Others');
        };
        const params = { issues: dataReport, message: data.note };
        const payload = { body: params, path: `${params.url}/report`, headers: { 'Authorization' : acceess } };
        postReportProduct(payload).then(result => {
            setErrorValidation(validation, false, setError);
            if (result.message) {
                if (result.message === 'Invalid input.') {
                    setErrorValidation(result, true, setError);
                    setSnackbar({type: 'error', message: result.detail.issues[0]});
                }
                else{
                    setErrorValidation(result, true, setError);
                    setSnackbar({type: 'error', message: result.message});
                };
            }
            else{
                setSnackbar({type: 'success', message: t('message.successReportProduct')});
                setOpenReport(false);
            };
            setButtonLoading(false);
            setOpen(true);
        });
    };

    const handleShowRequestStock = () => {
        setOpenRequestStock(true);
    };

    const handleCloseRequestStock = () => {
        setOpenRequestStock(false);
    };

    const handleSubmitRequestStock = data => {
        setButtonLoading(true);
        const payload = { body: data, path: `${params.url}/stock-notification` };
        postRequestStockAlert(payload).then(result => {
            setErrorValidation(validation, false, setError);
            if (result.message) {
                setErrorValidation(result, true, setError);
                setSnackbar({type: 'error', message: result.detail?.email[0]});
            }
            else{
                setSnackbar({type: 'success', message: t('message.successRequestStock')});
                setOpenRequestStock(false);
            };
            setButtonLoading(false);
            setOpen(true);
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handleCloseSimulation = () => {
        setOpenSimulation(false);
    };

    const handleShowSimulation = () => {
        setBackDrop(true);
        const payload = {params: {type: 'installment', is_active: true}};
        getSimulationInstallments(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                if (data?.length > 0) {
                    const slug = getIdentityFromHref(data[0].href);
                    const payloadCalculate = {path: `${slug}/calculate-installment`, params: { nominal: product?.netPrice } };
                    getCalculateInstallments(payloadCalculate);
                    setBackDrop(false);
                    setOpenSimulation(true);
                };
            };
        });
    };

    const handleChooseBankInstallment = (index, href) => {
        setIndexInstallment(index);
        const slug = getIdentityFromHref(href);
        const payload = {path: `${slug}/calculate-installment`, params: { nominal: product?.netPrice } };
        getCalculateInstallments(payload);
    };

    const handleCloseShippingCost = () => {
        setOpenShipiingCost(false);
        setTariff([]);
        setMessage(null);
        setShowTable(false);
    };

    const handleOpenShippingCost = () => {
        setBackDrop(true);
        const payload = {path: 'rate-type'};
        getShipmentVendors(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setVendorShipment(data);
                setBackDrop(false);
                setOpenShipiingCost(true);
            };
        });
    };

    const handleCalculate = data => {
        setButtonLoading(true);
        const paramDestination = [
            {
                price: product?.price,
                height: product?.packageHeight,
                length: product?.packageLength,
                width: product?.packageWidth,
                weight: product?.weight
            }
        ];
        const destination = data.postalCode.value.split('/');
        const payload = {
            path: 'domestic-price',
            body: {
                rateType: data.vendor.value,
                destination: {
                    code: destination[0],
                    latitude: destination[2],
                    longitude: destination[1]
                },
                lineItems: paramDestination
            }
        };
        postShipmentTariffs(payload).then(response => {
            if (response.message) {
                setMessage(response.message);
                setTariff([]);
            }
            else if (response?.axiosResponse?.status === 200){
                const data = response?.axiosResponse?.data;
                setTariff(data);
                setMessage(null);
            };
            setShowTable(true);
            setButtonLoading(false);
        });
    };

    const handleCloseAddProductLink = () => {
        setOpenAddProductLink(false);
    };

    const handleShowAddProductLink = (id) => {
        setBackDrop(true);
        setParentQuestion(id);
        let slug = null;
        if (product.category.fullPath !== null) {
            slug = product.category.fullSlug.split('/');
        };
        const payload = {
            'params': {
                'category': slug[2],
                'is_active': true
            }
        };
        getProductLinks(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setProductLinks(data);
                setOpenAddProductLink(true);
                setBackDrop(false);
            };
        });
    };

    const handleCheckProductLink = (item, value, href) => () => {
        const product = productChosen.filter((value) => value === href);
        let currentIndex = null;
        let newChecked = [];
        if (checkedProductLink.length > 0) {
            currentIndex = checkedProductLink.indexOf(value);
            newChecked = [...checkedProductLink];
        };
        if (product[0] !== href) {
            if (count <= 3) {
                setCount(count + 1);
                newChecked.push(value);
                setItemProductLink(itemProductLink => [...itemProductLink, item]);
                setProductChosen([...productChosen, href]);
            };
        } else {
            itemProductLink.splice(value, 1);
            newChecked.splice(currentIndex, 1);
            let array = [...productChosen];
            const index = array.indexOf(href);
            if (index !== -1) {
                array.splice(index, 1);
                setProductChosen(array);
                setCount(count - 1);
            };
        };
        setCheckedProductLink(newChecked);
    };

    const handleSearch = data => {
        let slug = null;
        if (product.category.fullPath !== null) {
            slug = product.category.fullSlug.split('/');
        };
        const payload = {
            'params': {
                'q': data.findProduct,
                'category': slug[2],
                'is_active': true
            }
        };
        getProductLinks(payload).then(result => {
            if (result.axiosResponse.status === 200) {
                const data = result.axiosResponse.data;
                setProductLinks(data);
            };
        });
    };

    const handleShowSelectItem = () => {
        setOpenAddProductLink(false);
    };

    const handleRemoveProductLink = (value, href) => {
        const currentIndex = checkedProductLink.indexOf(value);
        const newChecked = [...checkedProductLink];
        itemProductLink.splice(value, 1);
        newChecked.splice(currentIndex, 1);
        let array = [...productChosen];
        const index = array.indexOf(href);
        if (index !== -1) {
            array.splice(index, 1);
            setProductChosen(array);
            setCount(count - 1);
        };
    };

    const handlePostDiscussion = data => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': acceess
            },
            body: {
                product: {
                    href: `${product?.href}`,
                },
                content: data.content,
                productLinks: [],
                isActive: true
            }
        };
        postProductDiscussion(payload).then(result => {
            if (result.message) {
                setSnackbar({type: 'error', message: result.message});
            }
            else{
                setSnackbar({type: 'success', message: t('message.successSendDiscussion')});
                setDiscussion(result);
                setItemProductLink([]);
                setCount(0);
                setProductChosen([]);
                setCheckedProductLink(-1);
                reset();
                const href = getIdentityFromHref(product.href);
                const payloadDiscussion = {
                    params: {
                        structure: 'parent',
                        is_active: true,
                        product: href,
                        page: 1,
                        per_page: view
                    }
                };
                getProductDiscussions(payloadDiscussion).then(discussion => {
                    if (discussion?.axiosResponse?.status === 200) {
                        const dataDiscussion = discussion?.axiosResponse?.data;
                        setPage(1);
                        setDiscussion(dataDiscussion);
                        setPaginationDiscussion({
                            total: discussion?.axiosResponse?.headers['x-total-results'],
                            link: discussion?.axiosResponse?.headers?.link !== undefined ? discussion?.axiosResponse?.headers?.link : ''
                        });
                        setHrefParams(`?structure=parent&is_active=true&product=${href}&page=1&per_page=${view}`);
                        setBackDrop(false);
                    };
                });
            };
            setOpen(true);
        });
    };

    const handleReplyDiscussion = data => {
        setBackDrop(true);
        const productLinks = [...itemProductLink];
        let products = [];
        if (productLinks.length > 0) {
            productLinks.forEach(item => {
                products.push({
                    href: item.href
                });
            });
        };
        const payload = {
            headers: {
                'Authorization': acceess
            },
            body: {
                product: {
                    href: `${product?.href}`,
                },
                parent: data.parent,
                content: data.content,
                productLinks: products,
                isActive: true
            }
        };
        const idParent = getIdentityFromHref(data.parent);
        const payloadDiscussion = {path: idParent};
        postProductDiscussion(payload).then(result => {
            if (result.message) {
                setSnackbar({type: 'error', message: result.message});
            }
            else{
                setSnackbar({type: 'success', message: t('message.successSendDiscussion')});
                reset();
                let array = [...replies];
                let indexed = [...indexedReplies];
                getProductDiscussions(payloadDiscussion).then(detail => {
                    if (detail?.axiosResponse?.status === 200) {
                        const dataDiscussion = detail?.axiosResponse?.data;
                        array[idParent] = dataDiscussion;
                        indexed.push(idParent);
                        setReplies(array);
                        setIndexedReplies(indexed);
                        setParentQuestion(idParent);
                        setItemProductLink([]);
                        setBackDrop(false);
                    };
                });
            };
            setOpen(true);
        });
    };

    const handleChangePackage = (type, href) => {
        if (type === 'package_deal') {
            history.push(`/product/package-deals/${href}`);
        }
        else if (type === 'base') {
            history.push(`/product/${href}`);
        }
        else{
            history.push(`/product/giveaway/${href}`);
        };
    };

    const handleSeeMoreReplies = (index, href) => {
        const id = getIdentityFromHref(href);
        const payload = {path: id};
        let array = [...replies];
        let indexed = [...indexedReplies];
        getProductDiscussions(payload).then(detail => {
            if (detail?.axiosResponse?.status === 200) {
                const dataDiscussion = detail?.axiosResponse?.data;
                array[id] = dataDiscussion;
                indexed.push(id);
                setReplies(array);
                setIndexedReplies(indexed);
            };
        });
    };

    const handleChangePagination = (value, url) => {
        setPage(value);
        setHrefParams(`${url}`);
        const payload = {
            url: `core/product-discussion/${url}`
        };
        getProductDiscussions(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const dataDiscussion = result?.axiosResponse?.data;
                setDiscussion(dataDiscussion);
                setPaginationDiscussion({
                    total: result?.axiosResponse?.headers['x-total-results'],
                    link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                });
            };
        });
    };

    const handleProductViewList = (pageView, e) => {
        const page = 1;
        const query = new URLSearchParams(hrefParams);
        query.set('per_page', pageView.toString());
        query.set('page', page.toString());
        setPage(1);
        setView(pageView);
        setHrefParams(query);

        const payload = {
            url: `core/product-discussion/?${query.toString()}`
        };
        getProductDiscussions(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const dataDiscussion = result?.axiosResponse?.data;
                setDiscussion(dataDiscussion);
                setPaginationDiscussion({
                    total: result?.axiosResponse?.headers['x-total-results'],
                    link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                });
            };
        });
        e.preventDefault();
    };

    const handlePostWishlist = (href) => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': acceess
            },
            body: {
                product: `${href}`
            }
        };
        postWishlistProduct(payload).then(result => {
            if (result.message) {
                setSnackbar({type: 'error', message: result.message});
            }
            else{
                setSnackbar({type: 'success', message: t('message.successWishlist')});
                const payloadProduct = {
                    headers: {
                        'Authorization': acceess,
                        'Cache-Control': 'no-cache'
                    },
                    path: params.url
                };
                getProductDetails(payloadProduct).then(detail => {
                    if (detail?.axiosResponse?.status === 200) {
                        const data = detail?.axiosResponse?.data;
                        setProduct(data);
                        const payloadWishlist = {
                            headers: {
                                'Authorization': acceess,
                                'Cache-Control': 'no-cache'
                            },
                        };
                        headWishlistProduct(payloadWishlist);
                        setBackDrop(false);
                    };
                });
            };
            setOpen(true);
        });
    };

    const handleDeleteWishlist = (href) => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': acceess
            },
            path: `product/${href}`
        };
        deleteWishlistProduct(payload).then(result => {
            if (result.message) {
                setSnackbar({type: 'error', message: result.message});
            }
            else{
                setSnackbar({type: 'success', message: t('message.deleteWishlist')});
                const payloadProduct = {
                    headers: {
                        'Authorization': acceess,
                        'Cache-Control': 'no-cache'
                    },
                    path: params.url
                };
                getProductDetails(payloadProduct).then(detail => {
                    if (detail?.axiosResponse?.status === 200) {
                        const data = detail?.axiosResponse?.data;
                        setProduct(data);
                        const payloadWishlist = {
                            headers: {
                                'Authorization': acceess,
                                'Cache-Control': 'no-cache'
                            },
                        };
                        headWishlistProduct(payloadWishlist);
                        setBackDrop(false);
                    };
                });
            };
            setOpen(true);
        });
    };

    const handleAddToCart = () => {
        setBackDrop(true);
        let url = product?.href;
        const payloadCart = {
            headers: {
                'Authorization': acceess,
                'Cache-Control': 'no-cache'
            },
            body: {
                product: {
                    href: url
                },
                quantity: quantity
            }
        };
        postCartItem(payloadCart).then(response => {
            if (response?.axiosResponse?.status === 401) {
                history.push('/login');
            }
            else if (response?.axiosResponse?.status === 400) {
                setBackDrop(false);
                setSnackbar({type: 'warning', message: t('message.maxQuantityCart')});
                setOpen(true);
            }
            else{
                const payloadCart = {
                    headers: {
                        'Authorization': acceess,
                        'Cache-Control': 'no-cache'
                    },
                };
                getCarts(payloadCart).then(result => {
                    const payloadDetail = {
                        headers: {
                            'Cache-Control': 'no-cache'
                        },
                        path: params.url
                    };
                    getProductDetails(payloadDetail).then(detail => {
                        if (detail?.axiosResponse?.status === 200) {
                            const data = detail?.axiosResponse?.data;
                            setOpenCart(true);
                            setProductAddCart(data?.related);
                            setBackDrop(false);
                            setSnackbar({type: 'success', message: t('message.successAddToCart')});
                            setOpen(true);
                            setQuantity(1);
                        };
                    });
                });
            }
        });
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const handleToCart = () => {
        history.push('/cart');
    };

    const handleUrl = (href) => {
        history.push(`/product/${href}`);
        setOpenCart(false);
    };

    const handleCopyShortLink = () => {
        setSnackbar({type: 'success', message: t('label.success')});
        setOpen(true);
    };

    const handleOpenSharingUrl = () => {
        setOpenShortLink(!openShortLink);
    };

    const handleChangePaginationReview = (value, url) => {
        setPageReview(value);
        setHrefParamsReview(`${url}`);
        const payload = {
            url: `core/review/${url}`
        };
        getProductReviews(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const dataReview = result?.axiosResponse?.data;
                setReviews(dataReview);
                setPaginationReview({
                    total: result?.axiosResponse?.headers['x-total-results'],
                    link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                });
            };
        });
    };

    const handleProductViewListReview = (pageView, e) => {
        const page = 1;
        const query = new URLSearchParams(hrefParamsReview);
        query.set('per_page', pageView.toString());
        query.set('page', page.toString());
        setPageReview(1);
        setViewPage(pageView);
        setHrefParamsReview(query);

        const payload = {
            url: `core/review/?${query.toString()}`
        };
        getProductReviews(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const dataReview = result?.axiosResponse?.data;
                setReviews(dataReview);
                setPaginationReview({
                    total: result?.axiosResponse?.headers['x-total-results'],
                    link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                });
            };
        });
        e.preventDefault();
    };

    const handleQuantity = (type, qty, maxQty, href) => {
        const identity = getIdentityFromHref(href);
        if (type === 'plus') {
            if (qty < maxQty) {
                const quantity = qty + 1;
                const payload = {
                    body: {
                        quantity: quantity
                    },
                    path: `${identity}/calculate-price`
                }

                postCalculatePrice(payload).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const data = result?.axiosResponse?.data;
                        product.price = data.subtotal;
                        product.netPrice = data.grandTotal;
                        setProduct(product);
                        setQuantity(quantity);
                    }
                })
            } else {
                setSnackbar({type: 'warning', message: t('message.maxQuantityCart')});
                setOpen(true);
            }
        } else {
            if (qty !== 1) {
                const quantity = qty - 1;
                const payload = {
                    body: {
                        quantity: quantity
                    },
                    path: `${identity}/calculate-price`
                }

                postCalculatePrice(payload).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const data = result?.axiosResponse?.data;
                        product.price = data.subtotal;
                        product.netPrice = data.grandTotal;
                        setProduct(product);
                        setQuantity(quantity);
                    }
                })
            }
        }
    };

    const handleShowWholesale = () => {
        setOpenWholesale(true);
    };

    const handleCloseWholesale = () => {
        setOpenWholesale(false);
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <div className="product__detail">
                <ProductDetailOrganism
                    product={product}
                    slide={slide}
                    handleMultiSlide={handleMultiSlide}
                    handleDownload={handleDownload}
                    handleChangeProduct={handleChangeProduct}
                    aboutProduct={aboutProduct}
                    value={value}
                    handleChangeTab={handleChangeTab}
                    valueSpecification={valueSpecification}
                    handleChangeTabSpecification={handleChangeTabSpecification}
                    handleSeeMore={handleSeeMore}
                    handleShowYoutube={handleShowYoutube}
                    yotube={youtube}
                    openYoutube={openYoutube}
                    youtubeId={youtubeId}
                    handleCloseYoutube={handleCloseYoutube}
                    openReport={openReport}
                    handleCloseReport={handleCloseReport}
                    handleShowReport={handleShowReport}
                    handleSubmitReportProduct={handleSubmitReportProduct}
                    openRequestStock={openRequestStock}
                    handleShowRequestStock={handleShowRequestStock}
                    handleCloseRequestStock={handleCloseRequestStock}
                    handleSubmitRequestStock={handleSubmitRequestStock}
                    error={errors}
                    handleCloseSimulation={handleCloseSimulation}
                    handleShowSimulation={handleShowSimulation}
                    openSimulation={openSimulation}
                    indexInstallment={indexInstallment}
                    handleChooseBankInstallment={handleChooseBankInstallment}
                    openShipiingCost={openShipiingCost}
                    handleCloseShippingCost={handleCloseShippingCost}
                    handleOpenShippingCost={handleOpenShippingCost}
                    vendorShipment={vendorShipment}
                    discussions={discussion}
                    openAddProductLink={openAddProductLink}
                    handleCloseAddProductLink={handleCloseAddProductLink}
                    handleShowAddProductLink={handleShowAddProductLink}
                    checkedProductLink={checkedProductLink}
                    handleCheckProductLink={handleCheckProductLink}
                    productLinks={productLinks}
                    handleSearch={handleSearch}
                    count={count}
                    productChosen={productChosen}
                    itemProductLink={itemProductLink}
                    selectItemShow={parentQuestion}
                    handleShowSelectItem={handleShowSelectItem}
                    handleRemoveProductLink={handleRemoveProductLink}
                    handlePostDiscussion={handlePostDiscussion}
                    handleReplyDiscussion={handleReplyDiscussion}
                    customer={customer}
                    handleChangePackage={handleChangePackage}
                    handleSeeMoreReplies={handleSeeMoreReplies}
                    replies={replies}
                    indexedReplies={indexedReplies}
                    page={page}
                    handleChangePagination={handleChangePagination}
                    view={view}
                    handleView={handleProductViewList}
                    loading={loading}
                    paginationDiscussion={paginationDiscussion}
                    handlePostWishlist={handlePostWishlist}
                    handleDeleteWishlist={handleDeleteWishlist}
                    handleAddToCart={handleAddToCart}
                    openCart={openCart}
                    handleCloseCart={handleCloseCart}
                    productAddCart={productAddCart}
                    handleToCart={handleToCart}
                    handleUrl={handleUrl}
                    shortLink={shortLink}
                    handleCopyShortLink={handleCopyShortLink}
                    handleOpenSharingUrl={handleOpenSharingUrl}
                    openShortLink={openShortLink}
                    buttonLoading={buttonLoading}
                    tariff={tariff}
                    message={message}
                    showTable={showTable}
                    handleCalculate={handleCalculate}
                    pageReview={pageReview}
                    viewPage={viewPage}
                    paginationReview={paginationReview}
                    reviews={reviews}
                    handleChangePaginationReview={handleChangePaginationReview}
                    handleProductViewListReview={handleProductViewListReview}
                    detailReview={detailReview}
                    handleQuantity={handleQuantity}
                    quantity={quantity}
                    openWholesale={openWholesale}
                    handleShowWholesale={handleShowWholesale}
                    handleCloseWholesale={handleCloseWholesale}
                />
            </div>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <BackDropLoading open={backDrop} />
        </Suspense>
    );
};

export default ProductDetail;