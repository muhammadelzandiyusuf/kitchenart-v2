import {React, Suspense, useHistory, useState, useTranslation, useEffect} from 'libraries';
import {
    deleteWishlistProduct,
    getCarts,
    getProductDetails,
    postCartItem,
    getWishlistProduct,
    headWishlistProduct
} from "services";
import {getIdentityFromHref} from "utils";

import 'assets/scss/dashboard/dashboardCustomer.scss';
import 'assets/scss/product/productItem.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));
const WishlistOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/WishlistOrganism'));

const Wishlist = () => {

    const t = useTranslation();
    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Wishlist'
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
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                }
            };
            getWishlistProduct(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setProducts(data);
                    setLoading(false);
                };
            });
        }
        else{
            history.push('/login');
        };
    }, [access, history]);

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
                    url: `core/product/${href}`
                };
                getProductDetails(payload).then(detail => {
                    setBackDrop(false);
                    if (detail?.axiosResponse?.status !== 404 || detail?.axiosResponse?.status !== 401) {
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
                const payloadWish = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    }
                };
                setSnackbar({type: 'success', message: t('message.deleteWishlist')});
                getWishlistProduct(payloadWish).then(response => {
                    setBackDrop(false);
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
                    };
                });
            };
            setOpen(true);
        });
    };

    const handleSearch = (data) => {
        setLimit(6);
        setBackDrop(true);
        const payloadWish = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            params: {
                q: data.findProduct
            }
        };
        getWishlistProduct(payloadWish).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setProducts(data);
                setBackDrop(false);
            };
        });
    };

    const handleLoadMore = () => {
        setLimit(limit + 6);
    };

    return(
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <MenuDashboard>
                <WishlistOrganism
                    products={products}
                    handleAddToCart={handleAddToCart}
                    openCart={openCart}
                    handleCloseCart={handleCloseCart}
                    productAddCart={productAddCart}
                    handleToCart={handleToCart}
                    loading={loading}
                    handleDeleteWishlist={handleDeleteWishlist}
                    handleSearch={handleSearch}
                    handleLoadMore={handleLoadMore}
                    limit={limit}
                />
                <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
                <BackDropLoading open={backDrop} />
            </MenuDashboard>
        </Suspense>
    );
};

export default Wishlist;