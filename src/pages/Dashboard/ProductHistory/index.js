import {React, Suspense, useState, useEffect, useHistory, Localbase, useTranslation} from 'libraries';
import {
    getCarts,
    getHistoryProducts,
    postCartItem,
    getProductDetails,
    postWishlistProduct, deleteWishlistProduct, headWishlistProduct
} from "services";

import 'assets/scss/dashboard/dashboardCustomer.scss';
import 'assets/scss/product/productItem.scss';
import {getIdentityFromHref} from "utils";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const ProductHistoryOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/ProductHistoryOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const ProductHistory = () => {

    const t = useTranslation();
    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Product History'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [backDrop, setBackDrop] = useState(false);
    const [products, setProducts] = useState([]);
    const [openCart, setOpenCart] = useState(false);
    const [productAddCart, setProductAddCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [productHistory, setProductHistory] = useState([]);
    const [limit, setLimit] = useState(6);
    const [message, setMessage] = useState(false);

    useEffect(() => {
        if (access !== null) {
            let db = new Localbase('db');
            db.collection('product-history').orderBy('date', 'asc').get().then(histories => {
                if (histories !== undefined) {
                    let productParams = histories.map(function(el) {
                        return `product=${el.slug}`;
                    }).join('&');
                    const payload = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                        url: `core/product/history?${productParams}`
                    };
                    getHistoryProducts(payload).then(response => {
                        if (response?.axiosResponse?.status === 200) {
                            const data = response?.axiosResponse?.data;
                            setProducts(data);
                            setLoading(false);
                            setProductHistory(histories);
                        };
                    });
                };
            });
        }
        else {
            history.push('/login');
        }
    }, [access, history]);

    const handleFilter = (day) => {
        setBackDrop(true);
        setDate(day);
        const date = new Date();
        const last = new Date(date.getTime() - (day * 24 * 60 * 60 * 1000));
        const db = new Localbase('db');
        db.collection('product-history').orderBy('date', 'asc').get().then(document => {
            if (document !== undefined) {
                const productHistory = document.filter(item => item.date <= date && item.date >= last);
                if (productHistory?.length > 0) {
                    let productParams = productHistory.map(function(el) {
                        return `product=${el.slug}`;
                    }).join('&');
                    const payload = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                        url: `core/product/history?${productParams}`
                    };
                    getHistoryProducts(payload).then(response => {
                        if (response?.axiosResponse?.status === 200) {
                            const data = response?.axiosResponse?.data;
                            setProducts(data);
                            setProductHistory(productHistory);
                            setMessage(false);
                            setBackDrop(false);
                        };
                    });
                };
            }
            else{
                setBackDrop(false);
                setMessage(true);
            };
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handleAddToCart = (item) => {
        setBackDrop(true);
        const href = getIdentityFromHref(item?.href);
        const payloadCart = {
            headers: {
                'Authorization': access,
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
                    path: href
                };
                getProductDetails(payload).then(detail => {
                    setBackDrop(false);
                    if (detail?.axiosResponse?.status === 200) {
                        const data = detail?.axiosResponse?.data;
                        setOpenCart(true);
                        setProductAddCart(data?.related);
                        const payloadCart = {
                            headers: {
                                'Authorization': access,
                                'Cache-Control': 'no-cache'
                            },
                        };
                        getCarts(payloadCart);
                    }
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

    const handlePostWishlist = (href) => {
        setBackDrop(true);
        const slug = href.replace('/package/', '/product/');
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                product: `${slug}`
            }
        };
        postWishlistProduct(payload).then(result => {
            if (result.message) {
                setSnackbar({type: 'error', message: result.message});
                setBackDrop(false);
            }
            else{
                setSnackbar({type: 'success', message: t('message.successWishlist')});
                let db = new Localbase('db');
                db.collection('product-history').orderBy('date', 'desc').get().then(histories => {
                    if (histories !== undefined) {
                        let productParams = histories.map(function(el) {
                            return `product=${el.slug}`;
                        }).join('&');
                        const payload = {
                            headers: {
                                'Authorization': access,
                                'Cache-Control': 'no-cache'
                            },
                            url: `core/product/history?${productParams}`
                        };
                        getHistoryProducts(payload).then(response => {
                            if (response?.axiosResponse?.status === 200) {
                                const data = response?.axiosResponse?.data;
                                setProducts(data);
                                const payloadWishlist = {
                                    headers: {
                                        'Authorization': access,
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

    const handleDeleteWishlist = (href) => {
        setBackDrop(true);
        const slug = href.replace('/package/', '/product/');
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: `product/${slug}`
        };
        deleteWishlistProduct(payload).then(result => {
            if (result.message) {
                setSnackbar({type: 'error', message: result.message});
                setBackDrop(false);
            }
            else{
                setSnackbar({type: 'success', message: t('message.deleteWishlist')});
                let db = new Localbase('db');
                db.collection('product-history').orderBy('date', 'desc').get().then(histories => {
                    if (histories !== undefined) {
                        let productParams = histories.map(function(el) {
                            return `product=${el.slug}`;
                        }).join('&');
                        const payload = {
                            headers: {
                                'Authorization': access,
                                'Cache-Control': 'no-cache'
                            },
                            url: `core/product/history?${productParams}`
                        };
                        getHistoryProducts(payload).then(response => {
                            if (response?.axiosResponse?.status === 200) {
                                const data = response?.axiosResponse?.data;
                                setProducts(data);
                                const payloadWishlist = {
                                    headers: {
                                        'Authorization': access,
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

    const handleLoadMore = () => {
        setLimit(limit + 6);
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <MenuDashboard>
                <ProductHistoryOrganism
                    products={products}
                    handleFilter={handleFilter}
                    handleAddToCart={handleAddToCart}
                    openCart={openCart}
                    handleCloseCart={handleCloseCart}
                    productAddCart={productAddCart}
                    handleToCart={handleToCart}
                    loading={loading}
                    handlePostWishlist={handlePostWishlist}
                    handleDeleteWishlist={handleDeleteWishlist}
                    date={date}
                    productHistory={productHistory}
                    handleLoadMore={handleLoadMore}
                    limit={limit}
                    message={message}
                />
            </MenuDashboard>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <BackDropLoading open={backDrop} />
        </Suspense>
    );
};

export default ProductHistory;