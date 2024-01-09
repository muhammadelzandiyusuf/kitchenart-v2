import {React, Suspense, useHistory, useState, useEffect, Localbase, useTranslation, useParams} from 'libraries';
import {getCarts, getProductDetails, getTradeInRequests, optionsTradeInRequests, postCartItem} from "services";
import {getIdentityFromHref} from "utils";

import 'assets/scss/product/productItem.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const TradeInOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/TradeInOrganism'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));

const TradeIn = () => {

    const t = useTranslation();
    const history = useHistory();
    const params = useParams();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - TradeIn'
    });
    const [status, setStatus] = useState('pending');
    const [types, setTypes] = useState([]);
    const [tradein, setTradein] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [countStatus, setCountStatus] = useState({
        pending: 0,
        approve: 0,
        decline: 0
    });
    const [backDrop, setBackDrop] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [openCart, setOpenCart] = useState(false);
    const [productAddCart, setProductAddCart] = useState([]);
    const [tradeinDetail, setTradeinDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                }
            };
            optionsTradeInRequests(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data?.actions?.POST?.confirmation?.choices;
                    setTypes(data);
                    const db = new Localbase('db');
                    db.collection('customer').get().then(customer => {
                        if (customer?.length > 0) {
                            setCustomer(customer[0]);
                            const payloadCount = {
                                headers: {
                                    'Authorization': access,
                                    'Cache-Control': 'no-cache'
                                },
                                params: {
                                    ordering: '-created',
                                    user: customer[0]?.username
                                }
                            };
                            getTradeInRequests(payloadCount).then(counts => {
                                if (counts?.axiosResponse?.status === 200) {
                                    const dataCount = counts?.axiosResponse?.data;
                                    const countPending = dataCount.filter(item => item.confirmation === 'pending');
                                    const countApprove = dataCount.filter(item => item.confirmation === 'approve');
                                    const countDecline = dataCount.filter(item => item.confirmation === 'decline');
                                    setCountStatus({
                                        pending: countPending.length,
                                        approve: countApprove.length,
                                        decline: countDecline.length
                                    });
                                    if (params.code === undefined) {
                                        const payloadPending = {
                                            headers: {
                                                'Authorization': access,
                                                'Cache-Control': 'no-cache'
                                            },
                                            params: {
                                                confirmation: status,
                                                ordering: '-created',
                                                user: customer[0]?.username
                                            }
                                        };
                                        getTradeInRequests(payloadPending).then(results => {
                                            if (results?.axiosResponse?.status === 200) {
                                                const data = results?.axiosResponse?.data;
                                                setTradein(data);
                                                setLoading(false);
                                            };
                                        });
                                    }
                                    else {
                                        const payloadDetail = {
                                            headers: {
                                                'Authorization': access,
                                                'Cache-Control': 'no-cache'
                                            },
                                            path: params.code
                                        };
                                        getTradeInRequests(payloadDetail).then(results => {
                                            if (results?.axiosResponse?.status === 200) {
                                                const data = results?.axiosResponse?.data;
                                                setTradeinDetail(data);
                                                setLoading(false);
                                            };
                                        });
                                    };
                                }
                            });
                        };
                    });
                };
            });
        }
        else {
            history.push('/login');
        };
    }, [access, history, params, status]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handleChangeHistory = (type) => {
        setBackDrop(true);
        setStatus(type);
        const payloadHistory = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            params: {
                confirmation: type,
                ordering: '-created',
                user: customer?.username
            }
        };
        getTradeInRequests(payloadHistory).then(results => {
            setBackDrop(false);
            if (results?.axiosResponse?.status === 200) {
                const data = results?.axiosResponse?.data;
                setTradein(data);
            };
        });
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
                    if (detail?.axiosResponse?.status === 200) {
                        const detailProduct = detail?.axiosResponse?.data;
                        setOpenCart(true);
                        setProductAddCart(detailProduct?.related);
                        const payloadCart = {
                            headers: {
                                'Authorization': access,
                                'Cache-Control': 'no-cache'
                            },
                        };
                        getCarts(payloadCart);
                        setBackDrop(false);
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

    const handleToTradeInDetail = (code) => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: code
        };
        getTradeInRequests(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setTradeinDetail(data);
                history.push(`/profile/tradein/${code}`);
            };
        });
    };

    const handleBack = () => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            params: {
                confirmation: status,
                ordering: '-created',
                user: customer[0]?.username
            }
        };
        getTradeInRequests(payload).then(results => {
            if (results?.axiosResponse?.status === 200) {
                const data = results?.axiosResponse?.data;
                setTradein(data);
                history.push(`/profile/tradein`);
            };
        });
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <TradeInOrganism
                    status={status}
                    handleChangeHistory={handleChangeHistory}
                    tradein={tradein}
                    types={types}
                    countStatus={countStatus}
                    handleAddToCart={handleAddToCart}
                    handleCloseCart={handleCloseCart}
                    handleToCart={handleToCart}
                    openCart={openCart}
                    productAddCart={productAddCart}
                    params={params}
                    handleToTradeInDetail={handleToTradeInDetail}
                    handleBack={handleBack}
                    tradeinDetail={tradeinDetail}
                    loading={loading}
                />
                <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
                <BackDropLoading open={backDrop} />
            </MenuDashboard>
        </Suspense>
    );
};

export default TradeIn;