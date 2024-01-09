import {React, Suspense, useEffect, useHistory, useState} from "libraries";
import {getOrderComplaint, optionsOrderComplaint} from "services";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const OrderComplaintOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/OrderComplaintOrganism'));

const OrderComplaint = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Order Complaints'
    });

    const [loading, setLoading] = useState(true);
    const [orderComplaints, setOrderComplaints] = useState([]);
    const [optionStatus, setOptionStatus] = useState([]);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            }

            getOrderComplaint(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setOrderComplaints(data);
                    optionsOrderComplaint(payload).then(response => {
                        if (response?.axiosResponse?.status === 200) {
                            const dataOptions = response?.axiosResponse?.data;
                            setOptionStatus(dataOptions?.actions?.POST?.status?.choices);
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
    }, [access, history]);

    const handleDetail = (orderNumber) => {
        history.push(`/profile/order-complaint/${orderNumber}`);
    }

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <OrderComplaintOrganism
                    loading={loading}
                    orderComplaints={orderComplaints}
                    handleDetail={handleDetail}
                    optionStatus={optionStatus}
                />
            </MenuDashboard>
        </Suspense>
    )
}

export default OrderComplaint;