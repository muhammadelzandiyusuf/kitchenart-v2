import {CancelProcess, CancelApprove, CancelReject, React, Suspense, useEffect, useHistory, useState} from "libraries";
import {getOrderCancellation, getProfileCustomers, headOrderCancellation, optionOrderCancellation} from "services";

import 'assets/scss/dashboard/historyOrder.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const OrderCancellationOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/OrderCancellationOrganism'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const OrderCancellation = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Order Cancellations'
    });

    const [loading, setLoading] = useState(true);
    const [orderCancellations, setOrderCancellations] = useState([]);
    const [status, setStatus] = useState('pending');
    const [statusOption, setStatusOption] = useState([]);
    const [totalPending, setTotalPending] = useState(0);
    const [totalApprove, setTotalApprove] = useState(0);
    const [totalDecline, setTotalDecline] = useState(0);
    const [backDrop, setBackDrop] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (access !== null) {
            const payloadCustomer = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache',
                },
            }

            getProfileCustomers(payloadCustomer).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const customer = response?.axiosResponse?.data;

                    const payload = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache',
                        },
                        params: {
                            'status': 'pending',
                            'user': customer.username
                        }
                    }

                    getOrderCancellation(payload).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data;
                            setOrderCancellations(data);

                            headOrderCancellation(payload).then(pending => {
                                if (pending?.axiosResponse?.status === 200) {
                                    setTotalPending(pending?.axiosResponse?.headers["x-total-results"]);

                                    const payloadApprove = {
                                        headers: {
                                            'Authorization': access,
                                            'Cache-Control': 'no-cache',
                                        },
                                        params: {
                                            'status': 'approved',
                                            'user': customer.username
                                        }
                                    }

                                    headOrderCancellation(payloadApprove).then(approve => {
                                        if (approve?.axiosResponse?.status === 200) {
                                            setTotalApprove(approve?.axiosResponse?.headers["x-total-results"]);

                                            const payloadDecline = {
                                                headers: {
                                                    'Authorization': access,
                                                    'Cache-Control': 'no-cache',
                                                },
                                                params: {
                                                    'status': 'decline',
                                                    'user': customer.username
                                                }
                                            }

                                            headOrderCancellation(payloadDecline).then(decline => {
                                                if (decline?.axiosResponse?.status === 200) {
                                                    setTotalDecline(decline?.axiosResponse?.headers["x-total-results"]);
                                                    setLoading(false);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

            const payloadOption = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache',
                },
            }

            optionOrderCancellation(payloadOption).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const option = response?.axiosResponse?.data;
                    setStatusOption(option);
                }
            })
        }
        else {
            history.push('/login');
        }
    }, [access, history]);

    const handleOrderCancellation = (payload) => {
        getOrderCancellation(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setOrderCancellations(data);
                setBackDrop(false);
            } else if (result?.axiosResponse?.status === 401) {
                history.push('/login');
            } else {
                history.push('/404');
            }
        });
    }

    const handleStatus = (e) => {
        setBackDrop(true);
        setStatus(e);
        const payloadCustomer = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache',
            },
        }

        getProfileCustomers(payloadCustomer).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const customer = response?.axiosResponse?.data;
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    params: {
                        'q': search,
                        'status': e,
                        'user': customer.username
                    }
                };
                handleOrderCancellation(payload);
            }
        })
    }

    const handleSearch = (data) => {
        setBackDrop(true);
        setSearch(data.search);
        const payloadCustomer = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            }
        };

        getProfileCustomers(payloadCustomer).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const customer = response?.axiosResponse?.data;
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    params: {
                        'q': data.search,
                        'status': status,
                        'user': customer.username
                    }
                };
                handleOrderCancellation(payload);
            }
        })
    };

    const handleDetail = (orderNumber) => {
        history.push(`/profile/order-cancellation/${orderNumber}`);
    }

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <OrderCancellationOrganism
                    loading={loading}
                    orderCancellations={orderCancellations}
                    handleDetail={handleDetail}
                    handleStatus={handleStatus}
                    status={status}
                    CancelProcess={CancelProcess}
                    CancelApprove={CancelApprove}
                    CancelReject={CancelReject}
                    totalPending={totalPending}
                    totalApprove={totalApprove}
                    totalDecline={totalDecline}
                    handleSearch={handleSearch}
                    statusOption={statusOption}
                />
                <BackDropLoading open={backDrop} />
            </MenuDashboard>
        </Suspense>
    )
}

export default OrderCancellation;