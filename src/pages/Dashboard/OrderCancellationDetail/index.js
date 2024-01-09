import {React, Suspense, useEffect, useHistory, useParams, useState} from "libraries";
import {getOrderCancellation, getOrders, optionHistoryOrderItem, optionOrderCancellation} from "services";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const OrderCancellationDetailOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/OrderCancellationDetailOrganism'));

const OrderCancellationDetail = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');
    const params = useParams();

    const [meta] = useState({
        title: 'KitchenArt - Order Cancellations Detail'
    });

    const [loading, setLoading] = useState(true);
    const [orderCancellation, setOrderCancellation] = useState([]);
    const [orders, setOrders] = useState([]);
    const [statusOption, setStatusOption] = useState([]);
    const [statusOrderOption, setStatusOrderOption] = useState([]);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: params.code
            }

            getOrderCancellation(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setOrderCancellation(data);

                    const payloadOrder = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                        path: data.order.orderNumber
                    }

                    getOrders(payloadOrder).then(orders => {
                        if (orders?.axiosResponse?.status === 200) {
                            const order = orders?.axiosResponse?.data;
                            setOrders(order);
                            setLoading(false);
                        }
                    })
                } else if (result?.axiosResponse?.status === 401) {
                    history.push('/login');
                } else {
                    history.push('/404');
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

            const payloadOrderOption = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache',
                },
            }

            optionHistoryOrderItem(payloadOrderOption).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const orderOption = response?.axiosResponse?.data;
                    setStatusOrderOption(orderOption);
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
                <OrderCancellationDetailOrganism
                    loading={loading}
                    orderCancellation={orderCancellation}
                    orders={orders}
                    statusOption={statusOption}
                    statusOrderOption={statusOrderOption}
                />
            </MenuDashboard>
        </Suspense>
    )
}

export default OrderCancellationDetail;