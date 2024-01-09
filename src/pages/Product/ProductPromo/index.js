import {
    React, Skeleton, Suspense, useHistory, useParams, useState, useEffect, PropTypes,
    withWidth, useTranslation
} from 'libraries';
import {
    getProductLists,
    getBanners,
    getProductAvailablePromotions,
    getProductDetails,
    postWishlistProduct, deleteWishlistProduct, getProductPackages, postCartItem, getCarts, headWishlistProduct
} from "services";
import {getIdentityFromHref} from "utils";

import 'assets/scss/menu/menu.scss';
import 'assets/scss/product/product.scss';
import 'assets/scss/product/productItem.scss';
import 'assets/scss/product/skeleton.scss';
import 'assets/scss/product/productDetail.scss';
import "assets/scss/product/productQuickView.scss";
import "assets/scss/product/productView.scss";
import "assets/scss/product/pagination.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const BannerAtom = React.lazy(() => import('components/atoms/BannerAtom'));
const ProductPromoOrganism = React.lazy(() => import('components/organisms/ProductOrganism/ProductPromoOrganism'));
const ProductListTimeEvent = React.lazy(() => import('components/molecules/ProductMolecule/ProductListTimeEvent'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const ProductPromo = () => {

    const params = useParams();
    const history = useHistory();
    const acceess = localStorage.getItem('access');
    const t = useTranslation();

    const [meta, setMeta] = useState({
        title: 'KitchenArt - Home Appliances'
    });
    const [banner, setBanner] = useState({
        alt: null,
        type: null,
        youtubeId: null,
        desktopImage: null,
        mobileImage: null,
        image: null
    });
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({
        data: [], meta: {filtering: [], ordering: [], paginating: { links: [], totalResults: 0, pageSize: 0 }}
    });
    const [view, setView] = useState(15);
    const [page, setPage] = useState(1);
    const [hrefParams, setHrefParams] = useState('');
    const [dateEventActive, setDateEventActive] = useState(0);
    const [selected, setSelected] = useState({
        index: null,
        field: null
    });
    const [value, setValue] = useState('');
    const [filterCheckBox, setFilterCheckBox] = useState([]);
    const [filterRadio, setFilterRadio] = useState('');
    const [filterMobile, setFilterMobile] = useState(false);
    const [availablePromotion, setAvailablePromotion] = useState([]);
    const [action, setAction] = useState("item_selection");
    const [openDialog, setDialog] = useState(false);
    const [product, setProduct] = useState([]);
    const [href, setHref] = useState('');
    const [slide, setSlide] = useState({
        image: null,
        key: 0,
    });
    const [deadline, setDeadline] = useState({
        validFrom: null,
        validTo: null,
        prev: [],
        next: []
    });
    const [buttonCartDisable, setButtonCartDisable] = useState(true);
    const [discountView, setDiscountView] = useState(true);
    const [paramSlug, setParamSlug] = useState('');
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [openCart, setOpenCart] = useState(false);
    const [productAddCart, setProductAddCart] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(true);

    useEffect(() => {
        let payload = null;
        let payloadBanner = null;
        const payloadAvailablePromotion = {path: 'available-promotion'};
        const paramUrl = params.url.replace('-', '_');
        setParamSlug(paramUrl);
        if (paramUrl === 'package_deal') {
            payload = {
                headers: {
                    'Authorization': acceess
                },
                params: {page: 1, per_page: view, structure: 'package', package_type: 'package_deal'}
            };
            setHrefParams(`?page=1&per_page=${view}&structure=package&package_type=package_deal`);
            payloadBanner = {
                params: {
                    group: 'package_banners',
                    is_active: true,
                    per_page: 1,
                    is_valid_period: true
                }
            };
            setMeta({title: 'KitchenArt - Package Deal'});
        }
        else if (paramUrl === 'giveaway') {
            payload = {
                headers: {
                    'Authorization': acceess
                },
                params: {page: 1, per_page: view, structure: 'package', package_type: 'giveaway'}
            };
            setHrefParams(`?page=1&per_page=${view}&structure=package&package_type=giveaway`);
            payloadBanner = {
                params: {
                    group: 'giveaway_banners',
                    is_active: true,
                    per_page: 1,
                    is_valid_period: true
                }
            };
            setMeta({title: 'KitchenArt - Giveaway'});
        }
        else if (paramUrl === 'deal_zone' || paramUrl === 'sale_event' || paramUrl === 'hot_deal' || paramUrl === 'clearance_sale') {
            payload = {
                headers: {
                    'Authorization': acceess
                },
                params: {page: 1, per_page: view, promotion: params.url, type: paramUrl},
                path: 'product-promotion'
            };
            setHrefParams(`?page=1&per_page=${view}&type=${paramUrl}`);
        }
        else{
            history.push('/404');
        };

        getProductAvailablePromotions(payloadAvailablePromotion).then(available => {
            if (available?.axiosResponse?.status === 200) {
                const dataAvailable = available?.axiosResponse?.data;
                setAvailablePromotion(dataAvailable);
            };
        });

        if (payload !== null) {
            if (paramUrl === 'package_deal' || paramUrl === 'giveaway') {
                getProductLists(payload).then(product => {
                    if (product?.axiosResponse?.status === 200) {
                        const dataProduct = product?.axiosResponse?.data;
                        setProducts(dataProduct);
                        setTimeout(() => {
                            setLoading(false);
                            setLoadingProduct(false);
                        }, 2000);
                    };
                });
            }
            else {
                getProductAvailablePromotions(payload).then(product => {
                    if (product?.axiosResponse?.status === 200) {
                        const dataProductPromo = product?.axiosResponse?.data;
                        setProducts(dataProductPromo);
                        setMeta({title: `KitchenArt - ${dataProductPromo?.meta?.promotion?.name}`});
                        setBanner({
                            desktopImage: dataProductPromo?.meta?.promotion?.bannerImage,
                            alt: 'banner-promo',
                            mobileImage: dataProductPromo?.meta?.promotion?.bannerImage,
                            type: 'banner-responsive'
                        });
                        setDeadline({
                            validFrom: dataProductPromo?.meta?.promotion?.validFrom,
                            validTo: dataProductPromo?.meta?.promotion?.validTo,
                            prev: dataProductPromo?.meta?.promotion?.prev,
                            next: dataProductPromo?.meta?.promotion?.next
                        });
                        setLoading(false);
                        setLoadingProduct(false);
                    };
                });
            }
        };

        if (payloadBanner !== null) {
            getBanners(payloadBanner).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const dataBanner = result?.axiosResponse?.data;
                    if (dataBanner?.length > 0) {
                        setBanner({
                            desktopImage: dataBanner[0].desktopImage,
                            alt: 'banner-promo',
                            mobileImage: dataBanner[0].mobileImage,
                            youtubeId: dataBanner[0].youtubeId,
                            type: dataBanner[0].type === 'image' ? 'banner-responsive' : 'banner-video'
                        });
                    };
                };
            });
        };

        setTimeout(() => {
            setDateEventActive(0);
            setButtonCartDisable(true);
            setDiscountView(true);
        }, 2000);
    }, [params, view, history, acceess]);

    const handleProductViewList = (pageView, e) => {
        setLoadingProduct(true);
        const page = 1;
        const query = new URLSearchParams(hrefParams);
        query.set('per_page', pageView.toString());
        query.set('page', page.toString());
        setPage(1);
        setView(pageView);

        let payload = null;
        if (paramSlug === 'package_deal' || paramSlug === 'giveaway') {
            payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/product-document/?${query.toString()}`
            };
            setHrefParams(`?${query.toString()}`);
        }
        else{
            payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/promotion/product-promotion/?${query.toString()}`
            };
            setHrefParams(`?${query.toString()}`);
        };

        getProductLists(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setProducts(data);
                setLoadingProduct(false);
            };
        });
        e.preventDefault();
    };

    const handleChangeUrl = (href) => {
        setLoading(true);
        setLoadingProduct(true);
        const slug = href.replace('_', '-');
        if (slug !== 'trade-in') {
            history.push(`/promo/${slug}`);
        }
        else{
            history.push(`/${slug}`);
        };
    };

    const handleEventDate = (index, data) => {
        setLoadingProduct(true);
        setDateEventActive(index);
        setValue('');
        setFilterCheckBox([]);
        setFilterRadio('');
        setHrefParams('');
        let payload = null;
        if (data !== null) {
            const slug = getIdentityFromHref(data?.href);
            const queries = new URLSearchParams(slug);
            const param = queries.get('promotion');
            payload = {
                headers: {
                    'Authorization': acceess
                },
                params: {page: 1, per_page: view, promotion: param},
                path: 'product-promotion'
            };
            getProductAvailablePromotions(payload).then(product => {
                if (product?.axiosResponse?.status === 200) {
                    const data = product?.axiosResponse?.data;
                    setProducts(data);
                    setButtonCartDisable(false);
                    setDiscountView(false);
                    setLoadingProduct(false);
                };
            });
        }
        else {
            payload = {
                headers: {
                    'Authorization': acceess
                },
                params: {page: 1, per_page: view, type: paramSlug},
                path: 'product-promotion'
            };
            getProductAvailablePromotions(payload).then(product => {
                if (product?.axiosResponse?.status === 200) {
                    const data = product?.axiosResponse?.data;
                    setProducts(data);
                    setButtonCartDisable(true);
                    setDiscountView(true);
                    setLoadingProduct(false);
                };
            });
        };
    };

    const handleChangePagination = (value, url) => {
        setLoadingProduct(true);
        setPage(value);
        let payload = null;
        if (paramSlug === 'package_deal' || paramSlug === 'giveaway') {
            payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/product-document/?${url}`
            };
            setHrefParams(`${url}`);
        }
        else{
            payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/promotion/product-promotion/?${url}`
            };
            setHrefParams(`${url}`);
        };

        getProductLists(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setProducts(data);
                setLoadingProduct(false);
            };
        });
        setFilterMobile(filter => !filter);
    };

    const handleFilterMobile = () => {
        setFilterMobile(filter => !filter);
    };

    const handleUrl = (href) => {
        if (paramSlug === 'package_deal') {
            history.push(`/product/package-deals/${href}`);
        }
        else if (paramSlug === 'giveaway') {
            history.push(`/product/giveaway/${href}`);
        }
        else{
            history.push(`/product/${href}`);
        };
    };

    const handleChangeRadio = (event) => {
        setLoadingProduct(true);
        setValue(event.target.value);
        setFilterRadio(event.target.name);
        setPage(1);

        const page = 1;
        const query = new URLSearchParams(event.target.value);
        query.set('page', page.toString());

        let payload = null;
        if (paramSlug === 'package_deal' || paramSlug === 'giveaway') {
            payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/product-document/?${query.toString()}`
            };
            setHrefParams(`?${query.toString()}`);
        }
        else{
            payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/promotion/product-promotion/?${query.toString()}`
            };
            setHrefParams(`?${query.toString()}`);
        };

        getProductLists(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setProducts(data);
                setLoadingProduct(false);
            };
        });
        setFilterMobile(filter => !filter);
    };

    const handleChangeCheckbox = (event, isChecked) => {
        setLoadingProduct(true);
        const id = event.target.id;
        const name = event.target.name;
        const lowercase = name.toLowerCase();
        const value = event.target.value;

        let params;
        if (filterCheckBox[id] === true) {
            if (selected.field === 'brand') {
                const brand = lowercase.replace(' ', '+');
                params = value.replace(`brand=${brand}&`, '');
            }
            else if (selected.field === 'features') {
                const features = name.replace(' ', '+');
                params = value.replace(`features=${features}&`, '');
            }
            else if (selected.field === 'capacity') {
                const capacity = name.replace(' ', '+');
                params = value.replace(`capacity=${capacity}&`, '');
            }
            else if (selected.field === 'finishing') {
                const finishing = name.replace(' ', '+');
                params = value.replace(`finishing=${finishing}&`, '');
            }
            else if (selected.field === 'system') {
                const system = name.replace(' ', '+');
                params = value.replace(`system=${system}&`, '');
            }
            else if (selected.field === 'size') {
                const size = name.replace(' ', '+');
                params = value.replace(`size=${size}&`, '');
            };
        }
        else {
            params = value;
        };

        setFilterCheckBox({...filterCheckBox, [id]: isChecked});
        setPage(1);

        const page = 1;
        const query = new URLSearchParams(params);
        query.set('page', page.toString());
        let payload = null;
        if (paramSlug === 'package_deal' || paramSlug === 'giveaway') {
            payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/product-document/?${query.toString()}`
            };
            setHrefParams(`?${query.toString()}`);
        }
        else{
            payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/promotion/product-promotion/?${query.toString()}`
            };
            setHrefParams(`?${query.toString()}`);
        };
        getProductLists(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setProducts(data);
                setLoadingProduct(false);
            };
        });
        setFilterMobile(filter => !filter);
    };

    const handleFilter = (select, field) => {
        if (select === selected.index) {
            setSelected({index: null, field: null});
        }
        else {
            setSelected({index: select, field: field});
        };
    };

    const handleQuickView = (identity) => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': acceess
            },
            url: `core/product/${identity}/`
        };
        getProductDetails(payload).then(result => {
            setProduct(result);
            setHref(result.href);
            if (result.images.length > 0) {
                setSlide({image: result.images[0].image, key: 0});
            };
            setBackDrop(false);
            setDialog(true);
        });
    };

    const handleChangeProduct = (href) => {
        const identity = getIdentityFromHref(href);
        const payload = {
            headers: {
                'Authorization': acceess
            },
            url: `core/product/${identity}/`
        };
        getProductDetails(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setProduct(data);
                setHref(data.href);
                if (data.images?.length > 0) {
                    setSlide({image: data.images[0].image, key: 0});
                }
                else {
                    setSlide({image: null, key: 0});
                };
            };
        });
    };

    const handleCloseDialog = () => {
        setDialog(false);
    };

    const handleMultiSlide = (item, key) => {
        setSlide({
            image: item.image,
            key: key
        });
    };

    const handleAction = (value) => {
        setAction(value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handlePostWishlist = (href) => {
        setBackDrop(true);
        const paramUrl = params.url.replace('-', '_');
        let slug = null;
        if (paramUrl === 'package_deal' || paramUrl === 'giveaway') {
            slug = href.replace('/package/', '/product/');
        }
        else{
            slug = href;
        };
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
                const paramUrl = params.url.replace('-', '_')
                const query = new URLSearchParams(hrefParams);
                let payloadProduct = null;
                if (paramUrl === 'package_deal' || paramUrl === 'giveaway') {
                    payloadProduct = {
                        headers: {
                            'Authorization': acceess
                        },
                        url: `core/product-document/?${query.toString()}`
                    };
                }
                else{
                    payloadProduct = {
                        headers: {
                            'Authorization': acceess
                        },
                        url: `core/promotion/product-promotion/?${query.toString()}`
                    };
                };
                getProductLists(payloadProduct).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const data = result?.axiosResponse?.data;
                        setProducts(data);
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
        const paramUrl = params.url.replace('-', '_');
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
                const query = new URLSearchParams(hrefParams);
                let payloadProduct = null;
                if (paramUrl === 'package_deal' || paramUrl === 'giveaway') {
                    payloadProduct = {
                        headers: {
                            'Authorization': acceess
                        },
                        url: `core/product-document/?${query.toString()}`
                    };
                }
                else{
                    payloadProduct = {
                        headers: {
                            'Authorization': acceess
                        },
                        url: `core/promotion/product-promotion/?${query.toString()}`
                    };
                };
                getProductLists(payloadProduct).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const data = result?.axiosResponse?.data;
                        setProducts(data);
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

    const handleAddToCart = (item) => {
        setBackDrop(true);
        const paramUrl = params.url.replace('-', '_');
        const href = getIdentityFromHref(item?.href);
        const payloadCart = {
            headers: {
                'Authorization': acceess,
                'Cache-Control': 'no-cache'
            },
            body: {
                product: {
                    href: item?.href
                },
                quantity: 1
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
            else {
                const payload = {
                    headers: {
                        'Cache-Control': 'no-cache'
                    },
                    path: href
                };
                const payloadCart = {
                    headers: {
                        'Authorization': acceess,
                        'Cache-Control': 'no-cache'
                    },
                };
                if (paramUrl === 'package_deal' || paramUrl === 'giveaway') {
                    getProductPackages(payload).then(detail => {
                        if (detail?.axiosResponse?.status === 200) {
                            const data = detail?.axiosResponse?.data;
                            setOpenCart(true);
                            setProductAddCart(data?.relatedPackages);
                            getCarts(payloadCart);
                            setBackDrop(false);
                        };
                    });
                } else {
                    getProductDetails(payload).then(detail => {
                        if (detail?.axiosResponse?.status === 200) {
                            const data = detail?.axiosResponse?.data;
                            setOpenCart(true);
                            setProductAddCart(data?.related);
                            getCarts(payloadCart);
                            setBackDrop(false);
                        };
                    });
                };
            };
        });
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    const handleToCart = () => {
        history.push('/cart');
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            {loading ? <Skeleton variant="rect" className={'skeleton__banner'} /> :
                <BannerAtom {...banner} />
            }
            {paramSlug === 'deal_zone' &&
                <ProductListTimeEvent deadline={deadline} dateActive={dateEventActive} handleEventDate={handleEventDate} />
            }
            <ProductPromoOrganism
                loading={loading}
                view={view}
                handleView={handleProductViewList}
                param={paramSlug}
                handleChangeUrl={handleChangeUrl}
                products={products}
                page={page}
                handleChangePagination={handleChangePagination}
                selected={selected}
                value={value}
                filterCheckBox={filterCheckBox}
                filterRadio={filterRadio}
                filterMobile={filterMobile}
                handleFilter={handleFilter}
                handleFilterMobile={handleFilterMobile}
                handleUrl={handleUrl}
                valueRadio={value}
                handleChangeCheckbox={handleChangeCheckbox}
                handleChangeRadio={handleChangeRadio}
                availablePromotion={availablePromotion}
                action={action}
                openDialog={openDialog}
                product={product}
                href={href}
                slide={slide}
                handleQuickView={handleQuickView}
                handleChangeProduct={handleChangeProduct}
                handleCloseDialog={handleCloseDialog}
                handleMultiSlide={handleMultiSlide}
                handleAction={handleAction}
                dateActive={dateEventActive}
                disabled={buttonCartDisable}
                discountView={discountView}
                handlePostWishlist={handlePostWishlist}
                handleDeleteWishlist={handleDeleteWishlist}
                handleAddToCart={handleAddToCart}
                openCart={openCart}
                handleCloseCart={handleCloseCart}
                productAddCart={productAddCart}
                handleToCart={handleToCart}
                loadingProduct={loadingProduct}
            />
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <BackDropLoading open={backDrop} />
        </Suspense>
    );
};

ProductPromo.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(ProductPromo);