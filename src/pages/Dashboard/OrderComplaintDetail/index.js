import {React, Suspense, useEffect, useHistory, useParams, useState} from "libraries";
import {getOrderComplaint, optionsOrderComplaint} from "services";

import 'assets/scss/dashboard/historyOrder.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const OrderComplaintDetailOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/OrderComplaintDetailOrganism'));

const OrderComplaintDetail = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');
    const params = useParams();

    const [meta] = useState({
        title: 'KitchenArt - History Order Detail'
    });

    const [loading, setLoading] = useState(true);
    const [orderComplaint, setOrderComplaint] = useState([]);
    const [optionStatus, setOptionStatus] = useState([]);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: params.code
            }

            getOrderComplaint(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setOrderComplaint(data);
                    optionsOrderComplaint(payload).then(response => {
                        if (response?.axiosResponse?.status === 200) {
                            const dataOptions = response?.axiosResponse?.data;
                            setOptionStatus(dataOptions?.actions?.PUT?.status?.choices);
                            setLoading(false);
                        };
                    });
                } else if (result?.axiosResponse?.status === 401) {
                    history.push('/login');
                } else {
                    history.push('/404');
                }
            })
        }
        else {
            history.push('/login');
        }
    }, [access, history, params]);

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <OrderComplaintDetailOrganism
                    loading={loading}
                    orderComplaint={orderComplaint}
                    optionStatus={optionStatus}
                />
            </MenuDashboard>
        </Suspense>
    )
}

export default OrderComplaintDetail;