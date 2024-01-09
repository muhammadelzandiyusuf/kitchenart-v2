import {React, useState, Suspense, useForm, useHistory, Localbase} from 'libraries';
import {getCarts, getProfileCustomers, headWishlistProduct, loginCustomer} from 'services';
import { setErrorValidation } from 'utils';

const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const LoginOrganism = React.lazy(() => import('components/organisms/LoginOrganism'));

const CustomerLogin = React.memo(props => {

    const history = useHistory();

    const [meta] = useState({
        title: 'KitchenArt - Login'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: 'Selamat Datang di KitchenArt'
    });
    const [validation] = useState({
       detail: {
           email: [null],
           password: [null]
       }
    });
    const [buttonLoading, setButtonLoading] = useState(false);

    const { errors, setError } = useForm();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const onSubmit = data => {
        setButtonLoading(true);
        const payload = { body: data };
        loginCustomer(payload).then(result => {
            setErrorValidation(validation, false, setError);
            if (result.message) {
                setErrorValidation(result, true, setError);
                setSnackbar({type: 'error', message: result.message});
            }
            else{
                if (result?.axiosResponse?.status === 200) {
                    const access = localStorage.getItem('access');
                    setSnackbar({type: 'success', message: 'Selamat Datang di KitchenArt'});
                    let db = new Localbase('db');
                    const payloadProfileCustomer = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        }
                    };
                    getProfileCustomers(payloadProfileCustomer).then(response => {
                        if (response.axiosResponse?.status === 200) {
                            const data = response.axiosResponse?.data;
                            setButtonLoading(false);
                            db.collection('customer').get().then(customer => {
                                if (customer?.length > 0) {
                                    if (db.collection('customer').delete()) {
                                        db.collection('customer').add(data);
                                        getCarts(payloadProfileCustomer).then(carts => {
                                            headWishlistProduct(payloadProfileCustomer).then(wishlist => {
                                                history.goBack();
                                            });
                                        });
                                    };
                                }
                                else{
                                    if (db.collection('customer').add(data)) {
                                        getCarts(payloadProfileCustomer).then(carts => {
                                            headWishlistProduct(payloadProfileCustomer).then(wishlist => {
                                                history.goBack();
                                            });
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
            };
            setOpen(true);
        });
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <LoginOrganism loginSubmit={onSubmit} error={errors } buttonLoading={buttonLoading} />
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
        </Suspense>
    );
});

export default CustomerLogin;