import {React, Suspense, useState, Dialog, DialogTitle, DialogContent, Container, LogoKitchenArt, useEffect,
    useParams, useTranslation, useHistory} from 'libraries';

import {getCarts, getCustomerOrders} from "services";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const TypographAtom = React.lazy(() => import('components/atoms/TypographyAtom'));
const PaymentVirtualAccount = React.lazy(() => import('components/organisms/OderOrganism/PaymentOrganism/PaymentVirtualAccount'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const Payment = () => {

    const params = useParams();
    const t = useTranslation();
    const history = useHistory();
    const access = localStorage.getItem('access');
    const [meta] = useState({
        title: 'KitchenArt - Payment',
        keyword: 'payment',
        description: 'payment'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [payments, setPayments] = useState([]);
    const [backDrop, setBackDrop] = useState(false);

    useEffect(() => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: `${params.code}/payment-summary`,
        };
        getCustomerOrders(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setPayments(data);
            };
        });
    }, [access, params]);

    const handleCopyVirtualAccountNumber = () => {
        setSnackbar({type: 'success', message: t('message.successCopyVirtualAccountNumber')});
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handleViewPayments = (orderNumber) => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
        };
        getCarts(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                setBackDrop(false);
                history.push(`/profile/history-order/${orderNumber}`);
            };
        });
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <Dialog fullScreen open={true}>
                <Container maxWidth="lg">
                    <DialogTitle>
                        <TypographAtom type="image" image={LogoKitchenArt}
                                       styleImage="h-42" alt="logo-image" />
                    </DialogTitle>
                    <DialogContent>
                        <PaymentVirtualAccount
                            payments={payments}
                            handleCopyVirtualAccountNumber={handleCopyVirtualAccountNumber}
                            params={params}
                            handleViewPayments={handleViewPayments}
                        />
                    </DialogContent>
                </Container>
            </Dialog>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <BackDropLoading open={backDrop} />
        </Suspense>
    );
};

export default Payment;