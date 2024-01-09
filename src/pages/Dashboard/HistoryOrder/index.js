import {React, Suspense, useEffect, useHistory, useState} from "libraries";

import 'assets/scss/dashboard/historyOrder.scss';
import {getHistoryOrder, headHistoryOrder, optionsHistoryOrderItem} from "services";
import {convertDate} from "utils";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const HistoryOrderOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/HistoryOrder'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const HistoryOrder = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - History Order'
    });

    const date = new Date();
    const last = new Date(date.getTime() - (30 * 24 * 60 * 60 * 1000));

    const [status, setStatus] = useState('unpaid');
    const [created_gte, setCreated_gte] = useState(convertDate(last, 'yyyy-MM-DD'));
    const [created_lte, setCreated_lte] = useState(convertDate(date, 'yyyy-MM-DD'));
    const [search, setSearch] = useState('');
    const [day, setDay] = useState('');
    const [openFilter, setOpenFilter] = useState(false);
    const [historyOrders, setHistoryOrders] = useState([]);
    const [totalUnpaid, setTotalUnpaid] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalComplete, setTotalComplete] = useState(0);
    const [totalCancel, setTotalCancel] = useState(0);
    const [backDrop, setBackDrop] = useState(false);
    const [loading, setLoading] = useState(true);
    const [optionStatus, setOptionStatus] = useState([]);

    useEffect(() => {
        if (access !== null) {
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
                    const payload = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                        params: {
                            'status': 'unpaid',
                            'is_owner': true,
                            'created__gte': `${created_gte} 00:00:00`,
                            'created__lte': `${created_lte} 23:59:59`
                        }
                    };
                    getHistoryOrder(payload).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data;
                            setHistoryOrders(data);

                            const payloadUnpaid = {
                                headers: {
                                    'Authorization': access,
                                    'Cache-Control': 'no-cache'
                                },
                                params: {
                                    'status': 'unpaid',
                                    'is_owner': true,
                                    'created__gte': `${created_gte} 00:00:00`,
                                    'created__lte': `${created_lte} 23:59:59`
                                }
                            };
                            headHistoryOrder(payloadUnpaid).then(unpaid => {
                                if (unpaid?.axiosResponse?.status === 200) {
                                    setTotalUnpaid(unpaid?.axiosResponse?.headers["x-total-results"]);

                                    const payloadPaid = {
                                        headers: {
                                            'Authorization': access,
                                            'Cache-Control': 'no-cache'
                                        },
                                        params: {
                                            'status': 'paid',
                                            'is_owner': true,
                                            'created__gte': `${created_gte} 00:00:00`,
                                            'created__lte': `${created_lte} 23:59:59`
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
                                                    'status': 'completed',
                                                    'is_owner': true,
                                                    'created__gte': `${created_gte} 00:00:00`,
                                                    'created__lte': `${created_lte} 23:59:59`
                                                }
                                            };
                                            headHistoryOrder(payloadComplete).then(completed => {
                                                if (completed?.axiosResponse?.status === 200) {
                                                    setTotalComplete(completed?.axiosResponse?.headers["x-total-results"]);

                                                    const payloadCancel = {
                                                        headers: {
                                                            'Authorization': access,
                                                            'Cache-Control': 'no-cache'
                                                        },
                                                        params: {
                                                            'status': 'cancelled',
                                                            'is_owner': true,
                                                            'created__gte': `${created_gte} 00:00:00`,
                                                            'created__lte': `${created_lte} 23:59:59`
                                                        }
                                                    };
                                                    headHistoryOrder(payloadCancel).then(cancelled => {
                                                        if (cancelled?.axiosResponse?.status === 200) {
                                                            setTotalCancel(cancelled?.axiosResponse?.headers["x-total-results"]);
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
        }
        else {
            history.push('/login');
        }
    }, [access, history, created_gte, created_lte]);

    const handleHistoryOrder = (payload) => {
        getHistoryOrder(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setHistoryOrders(data);
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
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            params: {
                'q': search,
                'status': e,
                'is_owner': true,
                'created__gte': created_gte,
                'created__lte': created_lte
            }
        };
        handleHistoryOrder(payload);
    }

    const handleDetail = (orderNumber) => {
        history.push(`/profile/history-order/${orderNumber}`);
    }

    const handleCompletePayment = (orderNumber) => {
        history.push(`/payment/virtual-account/${orderNumber}`);
    }

    const handleOpenFilter = () => {
        setOpenFilter(!openFilter);
    };

    const handleFilter = (day) => {
        setBackDrop(true);
        const date = new Date();
        const to = convertDate(date, 'yyyy-MM-DD');
        const last = new Date(date.getTime() - (day * 24 * 60 * 60 * 1000));
        const from = convertDate(last, 'yyyy-MM-DD');

        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            params: {
                'q': search,
                'status': status,
                'is_owner': true,
                'created__gte': `${from} 00:00:00`,
                'created__lte': `${to} 23:59:59`
            }
        };

        setCreated_gte(from);
        setCreated_lte(to);
        setDay(day);
        setOpenFilter(false);

        handleHistoryOrder(payload);
    };

    const handleSearch = (data) => {
        setBackDrop(true);
        setSearch(data.search);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            params: {
                'q': data.search,
                'status': status,
                'is_owner': true,
                'created__gte': `${created_gte} 00:00:00`,
                'created__lte': `${created_lte} 23:59:59`
            }
        };
        handleHistoryOrder(payload);
    };

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <HistoryOrderOrganism
                    handleStatus={handleStatus}
                    handleDetail={handleDetail}
                    status={status}
                    setStatus={setStatus}
                    handleCompletePayment={handleCompletePayment}
                    openFilter={openFilter}
                    handleOpenFilter={handleOpenFilter}
                    handleFilter={handleFilter}
                    historyOrders={historyOrders}
                    totalUnpaid={totalUnpaid}
                    totalPaid={totalPaid}
                    totalComplete={totalComplete}
                    totalCancel={totalCancel}
                    day={day}
                    search={search}
                    handleSearch={handleSearch}
                    loading={loading}
                    optionStatus={optionStatus}
                />
                <BackDropLoading open={backDrop} />
            </MenuDashboard>
        </Suspense>
    );
};

export default HistoryOrder;