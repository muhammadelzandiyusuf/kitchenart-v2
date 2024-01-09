import {
    React, Suspense, useState, useEffect, useParams, useHistory, Hidden, PropTypes, withWidth, Skeleton, Localbase,
    useLocation, useTranslation
} from 'libraries';
import {
    postProductViewList, getCategoryDetails, getProductLists, getProductDetails, getBrandDetails, postWishlistProduct,
    deleteWishlistProduct, postCartItem, getCarts, headWishlistProduct
} from 'services';
import {getHostUrl, getIdentityFromHref, getQueryParams} from 'utils';

import 'assets/scss/menu/menu.scss';
import 'assets/scss/product/product.scss';
import 'assets/scss/product/productItem.scss';
import 'assets/scss/product/productDetail.scss';
import "assets/scss/product/productQuickView.scss";
import "assets/scss/product/productView.scss";
import "assets/scss/product/pagination.scss";
import 'assets/scss/product/skeleton.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const BannerAtom = React.lazy(() => import('components/atoms/BannerAtom'));
const ProductListOrganism = React.lazy(() => import('components/organisms/ProductOrganism/ProductListOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const ProductList = () => {

    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const db = new Localbase('db');
    const pathName = location.pathname;
    const pathUrl = pathName.split('/');
    const acceess = localStorage.getItem('access');
    const t = useTranslation();

    const [meta, setMeta] = useState({
        title: 'KitchenArt - Home Appliances'
    });
    const [banner, setBanner] = useState({
        image: null,
        alt: null,
        title: null
    });
    const [countResult] = useState(6);
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState({
        index: null,
        field: null
    });
    const [countPagination] = useState(10);
    const [page, setPage] = useState(1);
    const [filterMobile, setFilterMobile] = useState(false);
    const [selectColor, setSelectColor] = useState([]);
    const [filterCheckBox, setFilterCheckBox] = useState([]);
    const [hrefParams, setHrefParams] = useState('');
    const [view, setView] = useState(15);
    const [filterRadio, setFilterRadio] = useState('');
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState("item_selection");
    const [openDialog, setDialog] = useState(false);
    const [product, setProduct] = useState([]);
    const [href, setHref] = useState('');
    const [itemCount, setItemCount] = useState(0);
    const [productCompares, setProductCompares] = useState([]);
    const [slide, setSlide] = useState({
        image: null,
        key: 0,
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [openCart, setOpenCart] = useState(false);
    const [productAddCart, setProductAddCart] = useState([]);
    const [backDrop, setBackDrop] = useState(false);

    useEffect(() => {
        const dbColection = new Localbase('db');
        const payloadDetailCategory = {path: params.url};
        const payloadBrandDetail = {path: params.brand};
        let payloadProduct = null;
        const path = pathName.split('/');
        if (path[1] === 'brand') {
            if (path?.length > 3) {
                payloadProduct = {
                    headers: {
                        'Authorization': acceess
                    },
                    params: {brand: params.brand, category: params.url, page: 1, per_page: view, structure: 'stand_alone'}
                };
                setHrefParams(`?brand=${params.brand}&category=${params.url}&page=1&per_page=${view}`);
                getCategoryDetails(payloadDetailCategory).then(result => {
                    const slug = getIdentityFromHref(result.href);
                    setBanner({
                        image: getHostUrl(result.bannerImage), alt: slug, title: result.name
                    });
                    setMeta({ title: `KitchenArt - ${result.name}` });
                });
            }
            else{
                payloadProduct = {
                    headers: {
                        'Authorization': acceess
                    },
                    params: {brand: params.brand, page: 1, per_page: view, structure: 'stand_alone'}
                };
                setHrefParams(`?brand=${params.brand}&page=1&per_page=${view}`);
                getBrandDetails(payloadBrandDetail).then(result => {
                    if (result?.status === 200) {
                        const slug = getIdentityFromHref(result?.data?.href);
                        setBanner({
                            image: getHostUrl(result?.data?.bannerImage), alt: slug, title: result?.data?.name
                        });
                        setMeta({ title: `KitchenArt - ${result?.data?.name}` });
                    };
                });
            };
        }
        else{
            payloadProduct = {
                headers: {
                    'Authorization': acceess
                },
                params: {category: params.url, page: 1, per_page: view, structure: 'stand_alone'}
            };
            setHrefParams(`?category=${params.url}&page=1&per_page=${view}`);
            getCategoryDetails(payloadDetailCategory).then(result => {
                const slug = getIdentityFromHref(result.href);
                setBanner({
                    image: getHostUrl(result.bannerImage), alt: slug, title: result.name
                });
                setMeta({ title: `KitchenArt - ${result.name}` });
            });
        };
        getProductLists(payloadProduct).then(data => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
        if (localStorage.getItem('reset') === 'true') {
            dbColection.collection('compare').delete();
        };
        let result = [];
        dbColection.collection('compare').get().then(compares => {
            compares.forEach(compare => {
                result.push(compare.value)
            })
            setProductCompares(result)
            setItemCount(compares?.length)
            if (compares?.length > 0) {
                dbColection.collection('compare').delete();
            };
        });
    }, [pathName, params, view, acceess]);

    const handleChangeUrl = (event, url) => {
        setLoading(true);
        postProductViewList(15);
        const param = getQueryParams(url, 'category');
        const path = pathName.split('/');
        if (path[1] === 'brand') {
            history.push(`/brand/${params.brand}/${param}`);
        }
        else{
            history.push(`/category/${param}`);
        };
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const handleProductViewList = (pageView, e) => {
        setLoading(true);
        const page = 1;
        const query = new URLSearchParams(hrefParams);
        query.set('per_page', pageView.toString());
        query.set('page', page.toString());
        setPage(1);
        setView(pageView);
        setHrefParams(query);

        const payload = {
            headers: {
                'Authorization': acceess
            },
            url: `core/product-document/?${query.toString()}`
        };
        setTimeout(() => {
            getProductLists(payload);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }, 1000);
        e.preventDefault();
    }

    const handleFilter = (select, field) => {
        if (select === selected.index) {
            setSelected({index: null, field: null});
        }
        else {
            setSelected({index: select, field: field});
        };
    };

    const handleChangeRadio = (event) => {
        setLoading(true);
        setValue(event.target.value);
        setFilterRadio(event.target.name);
        setPage(1);

        const page = 1;
        const query = new URLSearchParams(event.target.value);
        query.set('page', page.toString());

        const payloadProduct = {
            headers: {
                'Authorization': acceess
            },
            url: `core/product-document/?${query.toString()}`
        };
        setHrefParams(`?${query.toString()}`);
        getProductLists(payloadProduct);
        setFilterMobile(filter => !filter);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleChangePagination = (value, url) => {
        setLoading(true);
        setPage(value);
        const payload = {
            headers: {
                'Authorization': acceess
            },
            url: `core/product-document/${url}`
        };
        setHrefParams(`${url}`);
        getProductLists(payload);
        setFilterMobile(filter => !filter);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleChangeCheckbox = (event, isChecked) => {
        setLoading(true);
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
            }
        }
        else {
            params = value;
        };

        setFilterCheckBox({...filterCheckBox, [id]: isChecked});
        setPage(1);

        const page = 1;
        const query = new URLSearchParams(params);
        query.set('page', page.toString());
        const payload = {
            headers: {
                'Authorization': acceess
            },
            url: `core/product-document/?${query.toString()}`
        };
        setHrefParams(`?${query.toString()}`);
        getProductLists(payload);
        setFilterMobile(filter => !filter);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };


    const handleFilterColor = (data, key) => {
        setLoading(true);
        const href = getIdentityFromHref(data.href);
        const color =  data.name.replace(/#/, '%23');
        setPage(1);

        let array = [...selectColor];
        const dataArray = array.find((number)=> number === key);
        if (dataArray === key) {
            let index = array.indexOf(key)
            if (index !== -1) {
                array.splice(index, 1);
                setSelectColor([...array]);

                const params = href.replace(`color=${color}&`, '');
                const page = 1;
                const query = new URLSearchParams(params);
                query.set('page', page.toString());

                const payload = {
                    headers: {
                        'Authorization': acceess
                    },
                    url: `core/product-document/?${query.toString()}`
                };
                setHrefParams(`?${query.toString()}`);
                getProductLists(payload);
            };
        }
        else{
            setSelectColor([...selectColor, key]);
            const page = 1;
            const query = new URLSearchParams(href);
            query.set('page', page.toString());

            const payload = {
                headers: {
                    'Authorization': acceess
                },
                url: `core/product-document/?${query.toString()}`
            };
            setHrefParams(`?${query.toString()}`);
            getProductLists(payload);
        };
        setFilterMobile(filter => !filter);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleFilterMobile = () => {
        setFilterMobile(filter => !filter);
    };

    const handleUrl = (href) => {
        history.push(`/product/${href}`);
    };

    const handleQuickView = (identity) => {
        setBackDrop(true);
        const payload = {
            url: `core/product/${identity}/`,
            headers: {
                'If-None-Match': localStorage.getItem('etag'),
                'Authorization': acceess
            }
        };
        getProductDetails(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setProduct(data);
                setHref(data.href);
                if (data.images.length > 0) {
                    setSlide({image: data.images[0].image, key: 0});
                } else {
                    setSlide({image: null, key: 0});
                };
                setBackDrop(false);
                setDialog(true);
            };
        });
    };

    const handleChangeProduct = (href) => {
        const identity = getIdentityFromHref(href);
        const payload = {
            headers: {
                'Authorization': acceess
            },
            url: `core/product/${identity}/`
        }
        getProductDetails(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                setProduct(result);
                setHref(result.href);
                if (result.images.length > 0) {
                    setSlide({image: result.images[0].image, key: 0});
                } else {
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

    const handleChangeCompare = (e) => {
        let count = itemCount;
        const compare = productCompares;
        const value = e.target.value;

        if (count === 0) {
            db.collection('compare').delete();
        };

        if (e.target.checked === true) {
            setItemCount(count + 1);
            compare.push(value);
        } else {
            setItemCount(count - 1);
            compare.splice(compare.indexOf(value), 1);
        };

        setProductCompares(compare);
    };

    const handleCompare = () => {
        productCompares.forEach(value => {
            db.collection('compare').add({value});
        });

        let products = productCompares.map(function(el) {
            return `product=${el}`;
        }).join('&');

        localStorage.setItem('reset', 'false');
        localStorage.setItem('path', history.location.pathname);
        history.push(`/compare/?${products}`);
    };

    const disabled = itemCount === 4;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
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
                const query = new URLSearchParams(hrefParams);
                const payloadProduct = {
                    headers: {
                        'Authorization': acceess
                    },
                    url: `core/product-document/?${query.toString()}`
                };
                getProductLists(payloadProduct).then(response => {
                    if (response?.axiosResponse?.status === 200) {
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
                const query = new URLSearchParams(hrefParams);
                const payloadProduct = {
                    headers: {
                        'Authorization': acceess
                    },
                    url: `core/product-document/?${query.toString()}`
                };
                getProductLists(payloadProduct).then(response => {
                    if (response?.axiosResponse?.status === 200) {
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
            else{
                const payload = {
                    headers: {
                        'Cache-Control': 'no-cache'
                    },
                    url: `core/product/${href}`
                };
                getProductDetails(payload).then(detail => {
                    if (detail?.axiosResponse?.status === 200) {
                        const data = detail?.axiosResponse?.data;
                        setOpenCart(true);
                        setProductAddCart(data?.related);
                        const payloadCart = {
                            headers: {
                                'Authorization': acceess,
                                'Cache-Control': 'no-cache'
                            },
                        };
                        getCarts(payloadCart);
                        setBackDrop(false);
                    };
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

    const handlePostWishlistDetail = (href) => {
        const slug = getIdentityFromHref(href);
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
                    path: slug
                };
                getProductDetails(payloadProduct).then(detail => {
                    if (detail?.axiosResponse?.status === 200) {
                        const data = detail?.axiosResponse?.data;
                        setProduct(data);
                        const query = new URLSearchParams(hrefParams);
                        const payloadProduct = {
                            headers: {
                                'Authorization': acceess
                            },
                            url: `core/product-document/?${query.toString()}`
                        };
                        getProductLists(payloadProduct).then(response => {
                            if (response?.axiosResponse?.status === 200) {
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
                });
            };
            setOpen(true);
        });
    };

    const handleDeleteWishlistDetail = (href) => {
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
                    path: href
                };
                getProductDetails(payloadProduct).then(detail => {
                    if (detail?.axiosResponse?.status === 200) {
                        const data = detail?.axiosResponse?.data;
                        setProduct(data);
                        const query = new URLSearchParams(hrefParams);
                        const payloadProduct = {
                            headers: {
                                'Authorization': acceess
                            },
                            url: `core/product-document/?${query.toString()}`
                        };
                        getProductLists(payloadProduct).then(response => {
                            if (response?.axiosResponse?.status === 200) {
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
                });
            };
            setOpen(true);
        });
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <Hidden only={['xs','sm', 'md']}>
                {loading ? <Skeleton variant="rect" className={'skeleton__banner'} /> :
                    <BannerAtom {...banner} titleShow={pathUrl[1] === 'brand' ? false : true} />
                }
            </Hidden>
            <ProductListOrganism
                result={countResult}
                handleChangeUrl={handleChangeUrl}
                slug={params.url}
                view={view}
                handleView={handleProductViewList}
                selected={selected}
                valueRadio={value}
                handleFilter={handleFilter}
                handleChangeRadio={handleChangeRadio}
                countPagination={countPagination}
                page={page}
                handleChangePagination={handleChangePagination}
                filterMobile={filterMobile}
                handleFilterMobile={handleFilterMobile}
                handleChangeCheckbox={handleChangeCheckbox}
                selectColor={selectColor}
                handleFilterColor={handleFilterColor}
                filterCheckBox={filterCheckBox}
                filterRadio={filterRadio}
                loading={loading}
                handleUrl={handleUrl}
                handleMultiSlide={handleMultiSlide}
                slide={slide}
                setSlide={setSlide}
                handleAction={handleAction}
                action={action}
                openDialog={openDialog}
                product={product}
                href={href}
                handleQuickView={handleQuickView}
                handleChangeProduct={handleChangeProduct}
                handleCloseDialog={handleCloseDialog}
                handleChangeCompare={handleChangeCompare}
                itemCount={itemCount}
                handleCompare={handleCompare}
                disabled={disabled}
                compares={productCompares}
                handlePostWishlist={handlePostWishlist}
                handleDeleteWishlist={handleDeleteWishlist}
                handleAddToCart={handleAddToCart}
                openCart={openCart}
                handleCloseCart={handleCloseCart}
                productAddCart={productAddCart}
                handleToCart={handleToCart}
                handlePostWishlistDetail={handlePostWishlistDetail}
                handleDeleteWishlistDetail={handleDeleteWishlistDetail}
            />
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <BackDropLoading open={backDrop} />
        </Suspense>
    );
};

ProductList.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(ProductList);