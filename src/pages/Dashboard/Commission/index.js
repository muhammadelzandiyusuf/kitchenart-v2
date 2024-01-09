import {Localbase, React, Suspense, useEffect, useHistory, useState} from 'libraries';
import {getCommissionHistories, getCommissions} from "services";
import filterCommissions from 'configs/data/filterCommissions.json';

import 'assets/scss/dashboard/commission.scss';
import {convertDate} from "utils";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const CommissionOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/CommissionOrganism'));

const Commission = (props) => {

    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Commission'
    });
    const [commission, setCommission] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [filterPeriod, setFilterPeriod] = useState(0);
    const [histories, setHistories] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        if (access !== null) {
            let db = new Localbase('db');
            db.collection('customer').get().then(customer => {
                if (customer !== undefined) {
                    setCustomer(customer);
                    const payload = {
                        path: 'available-balance',
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        }
                    };
                    getCommissions(payload).then(response => {
                       if (response?.axiosResponse?.status === 200) {
                           const data = response?.axiosResponse?.data;
                           setCommission(data);
                           const payloadHistory = {
                               headers: {
                                   'Authorization': access,
                                   'Cache-Control': 'no-cache'
                               },
                               params: {
                                   user: customer[0]?.username
                               }
                           };
                           getCommissionHistories(payloadHistory).then(result => {
                                if (result?.axiosResponse?.status === 200) {
                                    const dataHistory = result?.axiosResponse?.data;
                                    setHistories(dataHistory);
                                };
                           });
                       }
                       else if (response?.axiosResponse?.status === 401) {
                           history.push('/login');
                       };
                    });
                }
                else{
                    history.push('/login');
                };
            });
        }
        else{
            history.push('/login');
        };
    }, [access, history]);

    const handleWithdraw = () => {
        history.push('/profile/commission/withdraw');
    };

    const handleFilterType = (event) => {
        setFilterType(event.target.value);
        const date = new Date();
        const currentDate = convertDate(date, 'YYYY-MM-DD 23:59:59');
        const last = new Date(date.getTime() - (filterPeriod * 24 * 60 * 60 * 1000));
        const newDate = convertDate(last, 'YYYY-MM-DD 00:00:00');
        let payload = {};
        let typeCommission = {};
        if (event.target.value !== 'all') {
            typeCommission.type = event.target.value;
        }
        else{
            typeCommission = null;
        };
        if (filterPeriod !== 0) {
            payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                params: {
                    user: customer[0]?.username,
                    created__gte: newDate,
                    created__lte: currentDate,
                    ...typeCommission
                }
            };
            getCommissionHistories(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const dataHistory = result?.axiosResponse?.data;
                    setHistories(dataHistory);
                };
            });
        }
        else {
            payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                params: {
                    user: customer[0]?.username,
                    ...typeCommission
                }
            };
            getCommissionHistories(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const dataHistory = result?.axiosResponse?.data;
                    setHistories(dataHistory);
                };
            });
        };
    };

    const handleFilterPeriod = (event) => {
        setFilterPeriod(event.target.value);
        const date = new Date();
        const currentDate = convertDate(date, 'YYYY-MM-DD 23:59:59');
        const last = new Date(date.getTime() - (filterPeriod * 24 * 60 * 60 * 1000));
        const newDate = convertDate(last, 'YYYY-MM-DD 00:00:00');
        let payload = {};
        let typeCommission = {};
        if (filterType !== 'all') {
            typeCommission.type = filterType;
        }
        else{
            typeCommission = null;
        };
        if (event.target.value !== 0) {
            payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                params: {
                    user: customer[0]?.username,
                    created__gte: newDate,
                    created__lte: currentDate,
                    ...typeCommission
                }
            };
            getCommissionHistories(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const dataHistory = result?.axiosResponse?.data;
                    setHistories(dataHistory);
                };
            });
        }
        else {
            payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                params: {
                    user: customer[0]?.username,
                    ...typeCommission
                }
            };
            getCommissionHistories(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const dataHistory = result?.axiosResponse?.data;
                    setHistories(dataHistory);
                };
            });
        };
    };

    const handleSeeMore = () => {
        setLimit(limit + 6);
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <MenuDashboard>
                <div className={'commission'}>
                    <CommissionOrganism
                        commission={commission}
                        handleWithdraw={handleWithdraw}
                        filterCommissions={filterCommissions}
                        filterType={filterType}
                        handleFilterType={handleFilterType}
                        filterPeriod={filterPeriod}
                        handleFilterPeriod={handleFilterPeriod}
                        histories={histories}
                        limit={limit}
                        handleSeeMore={handleSeeMore}
                    />
                </div>
            </MenuDashboard>
        </Suspense>
    );
};

export default Commission;