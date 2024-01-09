import {React, Suspense, useState, useEffect, useHistory, Localbase} from 'libraries';
import {
    getAnnouncements, getHistoryOrder,
    getHistoryProducts,
    getWishlistProduct,
    headCoupons,
    headGiftVouchers, headHistoryOrder,
    headVouchers, optionsHistoryOrderItem
} from "services";

import 'assets/scss/dashboard/dashboardCustomer.scss';
import 'assets/scss/dashboard/historyOrder.scss';
import {convertDate} from "utils";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const DashboardCustomer = React.lazy(() => import('components/organisms/DashboardOrganism/DashboardCustomer'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const Dashboard = () => {

    const history = useHistory();
    const access = localStorage.getItem('access');

    const date = new Date();
    const last = new Date(date.getTime() - (30 * 24 * 60 * 60 * 1000));

    const [meta] = useState({
        title: 'KitchenArt - Dashboard'
    });
    const [announcements, setAnnouncements] = useState([]);
    const [wishlists, setWishlists] = useState([]);
    const [products, setProducts] = useState([]);
    const [productHistory, setProductHistory] = useState([]);
    const [countPromo, setCountPromo] = useState({
        voucher: 0,
        giftVoucher: 0,
        coupon: 0
    });
    const [historyOrders, setHistoryOrders] = useState([]);
    const [status, setStatus] = useState('unpaid');
    const [totalUnpaid, setTotalUnpaid] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalComplete, setTotalComplete] = useState(0);
    const [totalCancel, setTotalCancel] = useState(0);
    const [createdGte] = useState(convertDate(last, 'yyyy-MM-DD'));
    const [createdLte] = useState(convertDate(date, 'yyyy-MM-DD'));
    const [backDrop, setBackDrop] = useState(false);
    const [loading, setLoading] = useState(true);
    const [optionStatus, setOptionStatus] = useState([]);

    useEffect(() => {
        if (access !== null) {
            const payloadAnnouncement = {
                params: {
                    is_available: true
                }
            };
            getAnnouncements(payloadAnnouncement).then(announcement => {
                if (announcement?.axiosResponse?.status === 200) {
                    const data = announcement?.axiosResponse?.data;
                    setAnnouncements(data);

                    const payloadPromo = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                        params: {
                            is_available: true
                        }
                    };
                    headVouchers(payloadPromo).then(headVoucher => {
                        if (headVoucher?.axiosResponse?.status === 200) {
                            headGiftVouchers(payloadPromo).then(headGift => {
                                if (headGift?.axiosResponse?.status === 200) {
                                    headCoupons(payloadPromo).then(coupon => {
                                        if (coupon?.axiosResponse?.status === 200) {
                                            setCountPromo({
                                                voucher: Number(headVoucher?.headers?.['x-total-results']),
                                                giftVoucher: Number(headGift?.headers?.['x-total-results']),
                                                coupon: Number(coupon?.headers?.['x-total-results'])
                                            });

                                            const payloadUnpaid = {
                                                headers: {
                                                    'Authorization': access,
                                                    'Cache-Control': 'no-cache'
                                                },
                                                params: {
                                                    status: 'unpaid',
                                                    is_owner: true,
                                                    created__gte: `${createdGte} 00:00:00`,
                                                    created__lte: `${createdLte} 23:59:59`
                                                }
                                            };
                                            const payloadOptions = {
                                                headers: {
                                                    'Authorization': access,
                                                    'Cache-Control': 'no-cache'
                                                }
                                            };
                                            optionsHistoryOrderItem(payloadOptions).then(options => {
                                                if (options?.axiosResponse?.status === 200) {
                                                    const dataOptions = options?.axiosResponse?.data;
                                                    setOptionStatus(dataOptions?.actions?.POST?.status?.choices);
                                                    headHistoryOrder(payloadUnpaid).then(unpaid => {
                                                        if (unpaid?.axiosResponse?.status === 200) {
                                                            setTotalUnpaid(unpaid?.axiosResponse?.headers["x-total-results"]);
                                                            const payloadPaid = {
                                                                headers: {
                                                                    'Authorization': access,
                                                                    'Cache-Control': 'no-cache'
                                                                },
                                                                params: {
                                                                    status: 'paid',
                                                                    is_owner: true,
                                                                    created__gte: `${createdGte} 00:00:00`,
                                                                    created__lte: `${createdLte} 23:59:59`
                                                                }
                                                            };
                                                            headHistoryOrder(payloadPaid).then(paid => {
                                                                if (paid?.axiosResponse?.status === 200) {
                                                                    setTotalPaid(paid?.axiosResponse?.headers["x-total-results"]);
                                                                    const payloadComplete = {
                                                                        headers: {
                                                                            'Authorization': access,
                                                                            'Cache-Control': 'no-cache'
                                                                        },
                                                                        params: {
                                                                            status: 'completed',
                                                                            is_owner: true,
                                                                            created__gte: `${createdGte} 00:00:00`,
                                                                            created__lte: `${createdLte} 23:59:59`
                                                                        }
                                                                    };
                                                                    headHistoryOrder(payloadComplete).then(complete => {
                                                                        if (complete?.axiosResponse?.status === 200) {
                                                                            setTotalComplete(complete?.axiosResponse?.headers["x-total-results"]);
                                                                            const payloadCancel = {
                                                                                headers: {
                                                                                    'Authorization': access,
                                                                                    'Cache-Control': 'no-cache'
                                                                                },
                                                                                params: {
                                                                                    status: 'cancelled',
                                                                                    is_owner: true,
                                                                                    created__gte: `${createdGte} 00:00:00`,
                                                                                    created__lte: `${createdLte} 23:59:59`
                                                                                }
                                                                            };
                                                                            headHistoryOrder(payloadCancel).then(cancel => {
                                                                                if (cancel?.axiosResponse?.status === 200) {
                                                                                    setTotalCancel(cancel?.axiosResponse?.headers["x-total-results"]);
                                                                                    const payloadHistory = {
                                                                                        headers: {
                                                                                            'Authorization': access,
                                                                                            'Cache-Control': 'no-cache'
                                                                                        },
                                                                                        params: {
                                                                                            status: 'unpaid',
                                                                                            is_owner: true,
                                                                                            created__gte: createdGte,
                                                                                            created__lte: createdLte,
                                                                                            per_page: 1
                                                                                        }
                                                                                    };
                                                                                    getHistoryOrder(payloadHistory).then(historyOrder => {
                                                                                        if (historyOrder?.axiosResponse?.status === 200) {
                                                                                            const data = historyOrder?.axiosResponse?.data;
                                                                                            setHistoryOrders(data);

                                                                                            const payload = {
                                                                                                headers: {
                                                                                                    'Authorization': access,
                                                                                                    'Cache-Control': 'no-cache'
                                                                                                },
                                                                                                params: {
                                                                                                    per_page: 3
                                                                                                }
                                                                                            };
                                                                                            getWishlistProduct(payload).then(result => {
                                                                                                if (result?.axiosResponse?.status === 200) {
                                                                                                    const dataWishlist = result?.axiosResponse?.data;
                                                                                                    setWishlists(dataWishlist);
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
                                                                                                            getHistoryProducts(payload).then(productHistories => {
                                                                                                                if (productHistories?.axiosResponse?.status === 200) {
                                                                                                                    const dataHistory = productHistories?.axiosResponse?.data;
                                                                                                                    setProducts(dataHistory);
                                                                                                                    setProductHistory(histories);
                                                                                                                    setLoading(false);
                                                                                                                };
                                                                                                            });
                                                                                                        };
                                                                                                    });
                                                                                                };
                                                                                            });
                                                                                        };
                                                                                    });
                                                                                };
                                                                            });
                                                                        };
                                                                    });
                                                                };
                                                            });
                                                        };
                                                    });
                                                };
                                            });
                                        };
                                    });
                                };
                            });
                        };
                    });
                };
            });
        }
        else {
            history.push('/login');
        }
    }, [access, history, createdGte, createdLte]);

    const handleSeeMore = (href) => {
        history.push(href);
    };

    const handleHistoryOrder = (payload) => {
        getHistoryOrder(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setHistoryOrders(data);
                setBackDrop(false);
            };
        });
    };

    const handleStatus = (status) => {
        setBackDrop(true);
        setStatus(status);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            params: {
                status: status,
                is_owner: true,
                created__gte: createdGte,
                created__lte: createdLte,
                per_page: 1
            }
        };
        handleHistoryOrder(payload);
    };

    const handleDetail = (orderNumber) => {
        history.push(`/profile/history-order/${orderNumber}`);
    };

    const handleCompletePayment = (orderNumber) => {
        history.push(`/payment/virtual-account/${orderNumber}`);
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <MenuDashboard>
                <DashboardCustomer
                    announcements={announcements}
                    products={products}
                    handleSeeMore={handleSeeMore}
                    wishlists={wishlists}
                    productHistory={productHistory}
                    countPromo={countPromo}
                    totalUnpaid={totalUnpaid}
                    totalPaid={totalPaid}
                    totalComplete={totalComplete}
                    totalCancel={totalCancel}
                    status={status}
                    handleStatus={handleStatus}
                    historyOrders={historyOrders}
                    handleDetail={handleDetail}
                    handleCompletePayment={handleCompletePayment}
                    loading={loading}
                    optionStatus={optionStatus}
                />
                <BackDropLoading open={backDrop} />
            </MenuDashboard>
        </Suspense>
    );
};

export default Dashboard;