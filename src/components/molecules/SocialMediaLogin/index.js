import {FacebookLogin, GoogleLogin, Localbase, React, Suspense, useHistory, useState, useTranslation, useEffect} from 'libraries';
import {getCarts, getProfileCustomers, headWishlistProduct, registerLoginFacebook, registerLoginGoogle} from "services";
import { appConfig } from 'configs';

import 'assets/scss/button/button.scss';

const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const SkeletonAtom = React.lazy(() => import('components/atoms/SkeletonAtom'));

const SocialMediaLogin = (props) => {

    const t = useTranslation();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({});

    const responseFacebook = (response) => {
        if(response['status'] === 'unknown') {
            setSnackbar({type: 'error', message: t('message.closePopup')});
            setOpen(true);
        }
        else{
            const payload = { body: { accessToken: response['accessToken'] } }
            registerLoginFacebook(payload).then(result => {
                setSnackbar({type: 'success', message: t('message.successLogin', {param: 'Facebook'})});
                const access = localStorage.getItem('access');
                let db = new Localbase('db');
                const payloadProfileCustomer = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    }
                };
                getProfileCustomers(payloadProfileCustomer).then(profile => {
                    if (profile.axiosResponse?.status === 200) {
                        const data = profile.axiosResponse?.data;
                        db.collection('customer').get().then(customer => {
                            if (customer?.length > 0) {
                                if (db.collection('customer').delete()) {
                                    db.collection('customer').add(data);
                                    getCarts(payloadProfileCustomer).then(carts => {
                                        setOpen(true);
                                        headWishlistProduct(payloadProfileCustomer).then(wishlist => {
                                            history.goBack();
                                        });
                                    });
                                };
                            }
                            else{
                                if (db.collection('customer').add(data)) {
                                    getCarts(payloadProfileCustomer).then(carts => {
                                        setOpen(true);
                                        headWishlistProduct(payloadProfileCustomer).then(wishlist => {
                                            history.goBack();
                                        });
                                    });
                                };
                            };
                        });
                    };
                });
            });
        };
    }

    const responseGoogle = (response) => {
        if(response['error'] === 'popup_closed_by_user') {
            setSnackbar({type: 'error', message: t('message.closePopup')});
            setOpen(true);
        }
        else{
            const payload = { body: { accessToken: response['accessToken'] } }
            registerLoginGoogle(payload).then(result => {
                if (result?.axiosResponse?.status === 201) {
                    setSnackbar({type: 'success', message: t('message.successLogin', {param: 'Google'})});
                    const access = localStorage.getItem('access');
                    let db = new Localbase('db');
                    const payloadProfileCustomer = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        }
                    };
                    getProfileCustomers(payloadProfileCustomer).then(profile => {
                        if (profile.axiosResponse?.status === 200) {
                            const data = profile.axiosResponse?.data;
                            db.collection('customer').get().then(customer => {
                                if (customer?.length > 0) {
                                    if (db.collection('customer').delete()) {
                                        db.collection('customer').add(data);
                                        getCarts(payloadProfileCustomer).then(carts => {
                                            setOpen(true);
                                            headWishlistProduct(payloadProfileCustomer).then(wishlist => {
                                                history.goBack();
                                            });
                                        });
                                    };
                                }
                                else{
                                    if (db.collection('customer').add(data)) {
                                        getCarts(payloadProfileCustomer).then(carts => {
                                            setOpen(true);
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
            });
        };
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        setLoading(false);
        setOpen(false);
    }, []);

    return (
        <Suspense fallback={null}>
            <div className="w-100">
                <h4 className={props.styleTitle} align={props.align}>
                    {loading ? <SkeletonAtom variant={'text'} height={60} /> : props.title}
                </h4>
                <div className="mb-10">
                    {loading ? <SkeletonAtom variant={'text'} height={80} /> :
                        <FacebookLogin appId={appConfig.facebookId}
                                       fields="name,email,picture"
                                       callback={responseFacebook}
                                       textButton="Facebook"
                                       cssClass="btn btn__facebook btn--blue w-100 ta-l"
                                       icon="fa-facebook"
                        />
                    }
                </div>
                <div className="mb-10">
                    {loading ? <SkeletonAtom variant={'text'} height={80} /> :
                        <GoogleLogin clientId={appConfig.googleClientId}
                                     buttonText="Google"
                                     className="w-100 btn__google"
                                     onSuccess={responseGoogle}
                                     onFailure={responseGoogle}
                                     cookiePolicy={'single_host_origin'}
                        />
                    }
                </div>
            </div>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
        </Suspense>
    );
}

export default React.memo(SocialMediaLogin);