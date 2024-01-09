import {React, Suspense, useEffect, useHistory, useParams, useState} from "libraries";

import 'assets/scss/dashboard/historyOrder.scss';
import {getTrackingOrder} from "services";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const TrackingOrderOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/TrackingOrder'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));

const TrackingOrder = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');
    const params = useParams();

    const [meta] = useState({
        title: 'KitchenArt - Tracking Order'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [trackingOrder, setTrackingOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: params.code
            };

            getTrackingOrder(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setTrackingOrder(data);
                    setLoading(false);
                }
            })
        }
        else {
            history.push('/login');
        }
    }, [access, history, params]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCopyTrackingNumber = () => {
        setSnackbar({type: 'success', message: "Success copy tracking number"});
        setOpen(true);
    };

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <TrackingOrderOrganism
                    loading={loading}
                    handleCopyTrackingNumber={handleCopyTrackingNumber}
                    trackingOrder={trackingOrder}
                />
            </MenuDashboard>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
        </Suspense>
    )
}

export default TrackingOrder;