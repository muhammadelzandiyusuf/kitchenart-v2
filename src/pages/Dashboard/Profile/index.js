import {Localbase, React, Suspense, useEffect, useForm, useHistory, useState, useTranslation} from "libraries";
import {
    businessPartner,
    deleteShippingAddress,
    getShippingAddresses,
    postShippingAddress,
    updateShippingAddress
} from "services";
import {getIdentityFromHref, setErrorValidation} from "utils";

import 'assets/scss/checkout/shippingAddress.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const ProfileOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/ProfileOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const DialogMolecule = React.lazy(() => import('components/molecules/DialogMolecule'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const ProfilePage = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');
    const t = useTranslation();

    const [meta] = useState({
        title: 'KitchenArt - Profile'
    });

    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [loading, setLoading] = useState(true);
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [shippingAddress, setShippingAddress] = useState([]);
    const [openShippingAddress, setOpenShippingAddress] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [actionShippingAddress, setActionShippingAddress] = useState('create');
    const [openCorrectionDialog, setCorrectionDialog] = useState(false);
    const [identity, setIdentity] = useState('');
    const [search, setSearch] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [options, setOptions] = useState([]);
    const [backDrop, setBackDrop] = useState(false);

    const [validation] = useState({
        name: [null],
        email: [null],
        phoneNumber: [null],
        birthDate: [null],
        password: [null],
        passwordConfirm: [null]
    });

    const { errors, setError } = useForm();

    useEffect(() => {
        const queryParams = new URLSearchParams(history.location.search);
        if (access !== null) {
            const db = new Localbase('db');
            db.collection('customer').get().then(customer => {
                if (customer?.length > 0) {
                    setCustomer(customer[0]);
                };
            });
            const payloadOption = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            };
            businessPartner(payloadOption).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const dataOption = response?.axiosResponse?.data;
                    setOptions(dataOption);
                    const payload = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                        params: {
                            'q': queryParams.get('key') ? queryParams.get('key') : search
                        }
                    }
                    getShippingAddresses(payload).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data;
                            setShippingAddresses(data);
                        } else if (result?.axiosResponse?.status === 401) {
                            history.push('/login');
                        } else {
                            history.push('/404');
                        }
                    })
                };
            });

            if (queryParams.get('key')) {
                setSearch(queryParams.get('key'));
            }
        } else {
            history.push('/login');
        }
    }, [access, history, search, refresh]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleUpdateShippingAddress = (href) => {
        const slug = getIdentityFromHref(href);
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: slug
            };
            getShippingAddresses(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data
                    setShippingAddress(data);
                    setActionShippingAddress('update');
                    setOpenShippingAddress(true);
                    setLoading(false);
                }
            });
        } else {
            history.push('/login');
        }
    }

    const handleOpenDialog = (href) => {
        const slug = getIdentityFromHref(href);
        setIdentity(slug);
        setCorrectionDialog(true);
    }

    const handleDeleteShippingAddress = (href) => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: href
            };
            deleteShippingAddress(payload).then(result => {
                if (result?.axiosResponse?.status === 204) {
                    setRefresh(!refresh);
                }
            });
        } else {
            history.push('/login');
        }

        setCorrectionDialog(false);
    }

    const handleChooseDefaultShipping = (href) => {
        setBackDrop(true);
        const slug = getIdentityFromHref(href);
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                body: {
                    'is_default': true
                },
                path: `${slug}/set-default-address`
            };
            updateShippingAddress(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    setRefresh(!refresh);
                    setBackDrop(false);
                }
            });
        } else {
            history.push('/login');
        }
    }

    const handleShowShippingAddress = () => {
        setOpenShippingAddress(true);
        setShippingAddress([]);
        setActionShippingAddress('create');
    };

    const handleCloseShippingAddress = () => {
        setOpenShippingAddress(false);
        setShowLocation(false);
    };

    const handleCloseCorrectionDialog = () => {
        setCorrectionDialog(false);
    };

    const onSubmitShippingAddress = data => {
        setButtonLoading(true);
        if (actionShippingAddress === 'create') {
            delete data.href;
            const payload = {
                headers: {
                    'Authorization': access,
                },
                body: data
            };
            postShippingAddress(payload).then(result => {
                setErrorValidation(validation, false, setError);
                if (result.message) {
                    setErrorValidation(result, true, setError);
                    setSnackbar({ type: 'error', message: result.message });
                    setOpen(true);
                } else {
                    setOpenShippingAddress(false);
                    setShowLocation(false);
                    setRefresh(!refresh);
                }
                setButtonLoading(false);
            });
        } else {
            const slug = getIdentityFromHref(data.href);
            const payload = {
                headers: {
                    'Authorization': access,
                },
                body: data,
                path: slug
            };
            updateShippingAddress(payload).then(result => {
                setErrorValidation(validation, false, setError);
                if (result.message) {
                    setErrorValidation(result, true, setError);
                    setSnackbar({ type: 'error', message: result.message });
                    setOpen(true);
                } else {
                    setOpenShippingAddress(false);
                    setShowLocation(false);
                    setRefresh(!refresh);
                }
                setButtonLoading(false);
            });
        }
    };

    const handleToEditProfile = () => {
        history.push('/profile/edit')
    };

    const handleSearch = (data) => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            params: {
                'q': data.search
            }
        };
        getShippingAddresses(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setShippingAddresses(data);
                setBackDrop(false);
            }
            else if (result?.axiosResponse?.status === 401) {
                history.push('/login');
            }
            else {
                history.push('/404');
            };
        })
    };

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <ProfileOrganism
                    shippingAddresses={shippingAddresses}
                    shippingAddressSubmit={onSubmitShippingAddress}
                    handleCloseShippingAddress={handleCloseShippingAddress}
                    openShippingAddress={openShippingAddress}
                    showLocation={showLocation}
                    setShowLocation={setShowLocation}
                    loading={loading}
                    errors={errors}
                    actionShippingAddress={actionShippingAddress}
                    buttonLoading={buttonLoading}
                    handleShowShippingAddress={handleShowShippingAddress}
                    shippingAddress={shippingAddress}
                    handleUpdateShippingAddress={handleUpdateShippingAddress}
                    search={search}
                    handleOpenDialog={handleOpenDialog}
                    handleChooseDefaultShipping={handleChooseDefaultShipping}
                    customer={customer}
                    handleToEditProfile={handleToEditProfile}
                    options={options}
                    handleSearch={handleSearch}
                />
            </MenuDashboard>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <DialogMolecule handleOpen={openCorrectionDialog} handleCloseSecond={handleCloseCorrectionDialog}
                            content={t('message.confirmDelete')} buttonName={t('label.yes')}
                            handleClose={() => handleDeleteShippingAddress(identity)} secondButton={true}
                            secondButtonName={t('label.no')} />
            <BackDropLoading open={backDrop} />
        </Suspense>
    )
}

export default ProfilePage;