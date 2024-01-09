import {
    React,
    Suspense,
    useState,
    useEffect,
    useParams,
    useHistory,
    Localbase,
    useTranslation,
    useForm, useLocation, EmptyProduct
} from 'libraries';
import {
    deleteWishlistProduct,
    getCalculateInstallments, getCarts,
    getProductDetails,
    getProductPackages, getProductReviews, getShipmentVendors,
    getSimulationInstallments, headWishlistProduct, postCalculatePrice, postCartItem, postReportProduct,
    postRequestStockAlert, postShipmentTariffs, postShortLinks, postWishlistProduct
} from 'services';
import {getHostUrl, getIdentityFromHref, setErrorValidation} from "utils";

import aboutProduct from 'configs/data/aboutProductDetail.json';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "assets/scss/product/productDetail.scss";
import "assets/scss/product/pagination.scss";
import "assets/scss/product/productView.scss";
import 'assets/scss/tab/tab.scss';
import "assets/scss/button/button.scss";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const ProductDetailPackageOrganism = React.lazy(() => import('components/organisms/ProductOrganism/ProductDetailPackageOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const ProductDetailPackage = () => {

    const params = useParams();
    const history = useHistory();
    const db = new Localbase('db');
    const t = useTranslation();
    const location = useLocation();
    const acceess = localStorage.getItem('access');

    const { errors, setError } = useForm();
    const [validation] = useState({
        detail: {
            email: [null],
        }
    });

    const [meta, setMeta] = useState({
        title: 'KitchenArt - Home Appliances',
        keyword: '',
        description: ''
    });
    const [product, setProduct] = useState([]);
    const [slide, setSlide] = useState({
        image: null,
        key: 0,
    });
    const [breadcumb, setBreadcumb] = useState({
        fullPath: null,
        fullSlug: null
    });
    const [valueDownload, setValueDownload] = useState(0);
    const [lineItems, setLineItems] = useState([]);
    const [fileDownload, setFileDownload] = useState({
        catalogFile: null,
        cuttingImage: null,
        manualFile: null,
    });
    const [openRequestStock, setOpenRequestStock] = useState(false);
    const [openSimulation, setOpenSimulation] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [indexInstallment, setIndexInstallment] = useState(0);
    const [openShipiingCost, setOpenShipiingCost] = useState(false);
    const [vendorShipment, setVendorShipment] = useState([]);
    const [openReport, setOpenReport] = useState(false);
    const [valueTabProduct, setValueTabProduct] = useState(0);
    const [productDetail, setProductDetail] = useState(0);
    const [valueDetailTabProduct, setValueDetailTabProduct] = useState(0);
    const [youtube] = useState({
        fullWidth: true,
        maxWidth: 'md',
    });
    const [openYoutube, setOpenYoutube] = useState(false);
    const [youtubeId, setYoutubeId] = useState(null);
    const [valueSpecification, setValueSpecification] = useState(0);
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
    const [loading, setLoading] = useState(true);
    const [detailReview, setDetailReview] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [openWholesale, setOpenWholesale] = useState(false);

    useEffect(() => {
        const dbColection = new Localbase('db');
        const payload = {
            headers: {
                'Authorization': acceess,
                'Cache-Control': 'no-cache'
            },
            path: params.url
        };
        let countProductHistory = 0;
        let productsHistory = [];
        dbColection.collection('product-history').get().then(products => {
            if (products !== undefined) {
                countProductHistory = products?.length;
                productsHistory.push(products);
            };
        });
        getProductPackages(payload).then(detail => {
            if (detail?.axiosResponse?.status === 200) {
                const data = detail?.axiosResponse?.data;
                setMeta({
                    title: `KitchenArt - ${data?.packageMeta?.typeDisplayName}`,
                    keyword: data?.seoMetaKeyword,
                    description: data?.seoMetaDescription,
                    image: data.media?.length > 0 ? data.media[0].image : EmptyProduct,
                    titleShare: `${data?.name}`
                });
                setProduct(data);
                dbColection.collection('product-history').doc({ href: data?.href }).get().then(document => {
                    if (document === undefined) {
                        if (countProductHistory < 30) {
                            if (data?.href !== undefined) {
                                dbColection.collection('product-history').add({
                                    href: data?.href,
                                    name: data?.name,
                                    date: new Date(),
                                    slug: params.url
                                });
                            };
                        }
                        else {
                            dbColection.collection('product-history').doc({ href: productsHistory[0][0]?.href }).delete().then(response => {
                                if (data?.href !== undefined) {
                                    dbColection.collection('product-history').add({
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
                        dbColection.collection('product-history').doc({ href: data?.href }).update({
                            href: data?.href,
                            name: data?.name,
                            date: new Date(),
                            slug: params.url
                        });
                    }
                });
                if (params.type === 'package-deals') {
                    setBreadcumb({
                        fullPath: `Home > Package Deals > ${data?.packageMeta?.typeDisplayName} - ${data.name}`,
                        fullSlug: `home/package_deal/${params.url}`
                    });
                }
                else{
                    setBreadcumb({
                        fullPath: `Home > Giveaway > ${data?.packageMeta?.typeDisplayName} - ${data.name}`,
                        fullSlug: `home/giveaway/${params.url}`
                    });
                };
                setLineItems(data.packageItems);
                let imageProduct = EmptyProduct;
                if (data?.media?.length > 0) {
                    setSlide({image: data?.media[0].image, key: 0})
                    imageProduct = data?.media[0].image;
                };
                if (params.url !== localStorage.getItem('product')) {
                    dbColection.collection('package').get().then(product => {
                        if (product.length > 0) {
                            dbColection.collection('package').delete();
                        };
                    });
                };
                let href = null;
                let url = null;
                if (data?.packageItems?.length > 0) {
                    href = data?.packageItems[0]?.product?.href;
                    url = getIdentityFromHref(href);
                };
                const payloadDetail = { path: url };
                getProductDetails(payloadDetail).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const dataDetail = result?.axiosResponse?.data;
                        setFileDownload({
                            catalogFile: dataDetail.catalogFile,
                            cuttingImage: dataDetail.cuttingImage,
                            manualFile: dataDetail.manualFile
                        });
                        setProductDetail(dataDetail);
                        dbColection.collection('package').doc(url).set(dataDetail);
                        const payloadReview = {
                            params: {
                                product: url,
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
                                setHrefParamsReview(`?is_active=true&product=${url}&page=1&per_page=15`);
                                setReviews(dataReview);
                                const payloadDetailReview = {
                                    path: 'rating-summary',
                                    params: {
                                        product: url
                                    }
                                };
                                getProductReviews(payloadDetailReview).then(reviewDetail => {
                                    if (reviewDetail?.axiosResponse?.status === 200) {
                                        const dataDetailReview =  reviewDetail?.axiosResponse?.data;
                                        setDetailReview(dataDetailReview);
                                    };
                                    const payloadShortLink = {
                                        headers: {
                                            'Authorization': acceess,
                                            'Cache-Control': 'no-cache'
                                        },
                                        body: {
                                            url: `${process.env.REACT_APP_DOMAIN_NAME}product/package-deals/${params.url}`,
                                            og_title: data?.name,
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
                                        else {
                                            setLoading(false);
                                        };
                                    });
                                });
                            };
                        });
                    }
                    else{
                        history.push('/404');
                    };
                });
                if (data?.isActive !== true) {
                    history.push('/404');
                };
            }
            else{
                history.push('/404');
            };
        });
    }, [params, history, acceess]);

    const handleMultiSlide = (item, key) => {
        setSlide({
            image: item.image,
            key: key
        });
    };

    const handleChangeDownload = (event, newValue) => {
        setValueDownload(newValue);
        const href = getIdentityFromHref(lineItems[newValue]?.product?.href);
        const payload = { path: href };
        db.collection('package').doc(href).get().then(document => {
            if (document !== null) {
                setFileDownload({
                    catalogFile: document.catalogFile,
                    cuttingImage: document.cuttingImage,
                    manualFile: document.manualFile
                });
            }
            else{
                getProductDetails(payload).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const dataDetail = result?.axiosResponse?.data;
                        setFileDownload({
                            catalogFile: dataDetail.catalogFile,
                            cuttingImage: dataDetail.cuttingImage,
                            manualFile: dataDetail.manualFile
                        });
                        db.collection('package').doc(href).set(dataDetail);
                    };
                });
            };
        });
    };

    const handleDownload = (file) => {
        if (file !== null) {
            const fileDownload = getHostUrl(file);
            window.open(fileDownload);
        };
    };

    const handleShowRequestStock = () => {
        setOpenRequestStock(true);
    };

    const handleCloseRequestStock = () => {
        setOpenRequestStock(false);
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

    const handleCloseSimulation = () => {
        setOpenSimulation(false);
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

    const handleChooseBankInstallment = (index, href) => {
        setIndexInstallment(index);
        const slug = getIdentityFromHref(href);
        const payload = {path: `${slug}/calculate-installment`, params: { nominal: product?.netPrice } };
        getCalculateInstallments(payload);
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

    const handleCloseShippingCost = () => {
        setOpenShipiingCost(false);
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
            };
            setButtonLoading(false);
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

    const handleChangeTabProduct = (event, newValue) => {
        setValueTabProduct(newValue);
        const href = getIdentityFromHref(lineItems[newValue]?.product?.href);
        const payload = { path: href };
        db.collection('package').doc(href).get().then(document => {
            if (document !== null) {
                setProductDetail(document);
                getProductReview(href);
            }
            else{
                getProductDetails(payload).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const data = result?.axiosResponse?.data;
                        setProductDetail(data);
                        db.collection('package').doc(href).set(data);
                        getProductReview(href);
                    };
                });
            };
        });
    };

    const handleChangeTab = (event, newValue) => {
        setValueDetailTabProduct(newValue);
    };

    const handleShowYoutube = (item) => {
        setOpenYoutube(true);
        setYoutubeId(item);
    };

    const handleCloseYoutube = () => {
        setOpenYoutube(false);
    };

    const handleChangeTabSpecification = (event, newValue) => {
        setValueSpecification(newValue);
    };

    const handlePostWishlist = (href) => {
        setBackDrop(true);
        const slug = href.replace('/package/', '/product/');
        const payload = {
            headers: {
                'Authorization': acceess
            },
            body: {
                product: `${slug}`
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
                getProductPackages(payloadProduct).then(detail => {
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
                getProductPackages(payloadProduct).then(detail => {
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
        let url = product?.href.replace('/package', '/product');
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
                        setBackDrop(false);
                        setSnackbar({type: 'success', message: t('message.successAddToCart')});
                        setOpen(true);
                        if (detail?.axiosResponse?.status === 200) {
                            const data = detail?.axiosResponse?.data;
                            setOpenCart(true);
                            setProductAddCart(data?.related);
                        };
                        setQuantity(1);
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

    const getProductReview = (href) => {
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
                setPageReview(1);
                setViewPage(15);
                const payloadDetailReview = {
                    path: 'rating-summary',
                    params: {
                        product: href
                    }
                };
                getProductReviews(payloadDetailReview).then(reviewDetail => {
                    console.log("reviewDetail", reviewDetail);
                    if (reviewDetail?.axiosResponse?.status === 200) {
                        const dataDetailReview =  reviewDetail?.axiosResponse?.data;
                        setDetailReview(dataDetailReview);
                        setLoading(false);
                    }
                    else{
                        setDetailReview([]);
                        setLoading(false);
                    };
                });
            };
        });
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
                <ProductDetailPackageOrganism
                    product={product}
                    slide={slide}
                    handleMultiSlide={handleMultiSlide}
                    productType={params.type}
                    breadcumb={breadcumb}
                    valueDownload={valueDownload}
                    handleChangeDownload={handleChangeDownload}
                    fileDownload={fileDownload}
                    handleDownload={handleDownload}
                    openRequestStock={openRequestStock}
                    handleShowRequestStock={handleShowRequestStock}
                    handleCloseRequestStock={handleCloseRequestStock}
                    openSimulation={openSimulation}
                    handleShowSimulation={handleShowSimulation}
                    handleCloseSimulation={handleCloseSimulation}
                    handleSubmitRequestStock={handleSubmitRequestStock}
                    indexInstallment={indexInstallment}
                    handleChooseBankInstallment={handleChooseBankInstallment}
                    openShipiingCost={openShipiingCost}
                    handleOpenShippingCost={handleOpenShippingCost}
                    handleCloseShippingCost={handleCloseShippingCost}
                    vendorShipment={vendorShipment}
                    openReport={openReport}
                    handleShowReport={handleShowReport}
                    handleCloseReport={handleCloseReport}
                    handleSubmitReportProduct={handleSubmitReportProduct}
                    error={errors}
                    handleChangePackage={handleChangePackage}
                    valueTabProduct={valueTabProduct}
                    handleChangeTabProduct={handleChangeTabProduct}
                    productDetail={productDetail}
                    aboutProduct={aboutProduct}
                    valueDetailTabProduct={valueDetailTabProduct}
                    handleChangeTab={handleChangeTab}
                    openYoutube={openYoutube}
                    youtubeId={youtubeId}
                    handleShowYoutube={handleShowYoutube}
                    handleCloseYoutube={handleCloseYoutube}
                    youtube={youtube}
                    handleChangeTabSpecification={handleChangeTabSpecification}
                    valueSpecification={valueSpecification}
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
                    loading={loading}
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

export default ProductDetailPackage;