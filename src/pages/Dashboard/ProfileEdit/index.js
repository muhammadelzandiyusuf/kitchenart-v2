import {React, Suspense, useState, useEffect, useHistory, Localbase, useTranslation, useForm} from 'libraries';
import {
    getOtpVerification,
    getProfileCustomers,
    optionProfileCustomers,
    patchProfileCustomers,
    postOtpVerification, postProfileCustomers,
    putChangePasswordCustomer
} from "services";

import 'assets/scss/dashboard/profile.scss';
import {convertDate, setErrorValidation} from "utils";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const ProfileDetailOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/ProfileDetailOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));
const DialogMolecule = React.lazy(() => import('components/molecules/DialogMolecule'));

const ProfileEdit = () => {

    const history = useHistory();
    const t = useTranslation();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Edit Profile'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [tabMenu, setTabMenu] = useState(0);
    const [customer, setCustomer] = useState([]);
    const [gender, setGender] = useState('');
    const [formName, setFormName] = useState(false);
    const [formDate, setFormDate] = useState(false);
    const [dateBirth, setDateBirth] = useState(new Date());
    const [formPassword, setFormPassword] = useState(false);
    const [formPhoneNumber, setFormPhoneNumber] = useState(false);
    const [validation] = useState({
        detail: {
            oldPassword: [null],
            password: [null],
            passwordConfirm: [null]
        }
    });
    const { errors, setError } = useForm();
    const [backDrop, setBackDrop] = useState(false);
    const [openDialog, setDialog] = useState(false);
    const [openSuccessDialog, setSuccessDialog] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [verificationCode, setVerificationCode] = useState('');
    const [signature, setSignature] = useState('');

    useEffect(() => {
        if (access !== null) {
            const db = new Localbase('db');
            db.collection('customer').get().then(customer => {
                if (customer?.length > 0) {
                    setCustomer(    customer[0]);
                    const payloadOption = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                    };
                    optionProfileCustomers(payloadOption).then(response => {
                        if (response?.axiosResponse?.status === 200) {
                            const dataOption = response?.axiosResponse?.data;
                            const customerGender = dataOption?.actions?.PUT?.profile?.children?.gender?.choices;
                            if (customerGender?.length > 0) {
                                const genderType = customerGender.find(item => item.value === customer[0]?.profile?.gender);
                                if (genderType !== undefined) {
                                    setGender(genderType?.value);
                                    setDateBirth(customer[0]?.birthDate);
                                };
                            };
                        };
                    });
                };
            });
        }
        else {
            history.push('/login');
        };
    }, [access, history]);

    const handleChangeMenu = (event, newValue) => {
        setTabMenu(newValue);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                profile: {
                    gender: event.target.value
                }
            },
            path: 'update'
        };
        patchProfileCustomers(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setCustomer(data);
                let db = new Localbase('db');
                db.collection('customer').get().then(customer => {
                    if (customer?.length > 0) {
                        db.collection('customer').delete();
                        db.collection('customer').add(data);
                    }
                    else{
                        db.collection('customer').add(data);
                    };
                });
                setSnackbar({type: 'success', message: t('label.success')});
                setOpen(true);
            }
            else if (response?.axiosResponse?.status === 401) {
                history.push('/login');
            }
            else {
                history.push('/404');
            };
        });
    };

    const handleShowFormName = () => {
        setFormName(true);
    };

    const handleChangeName = (data) => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
            path: 'update'
        };
        patchProfileCustomers(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setCustomer(data);
                let db = new Localbase('db');
                db.collection('customer').get().then(customer => {
                    if (customer?.length > 0) {
                        db.collection('customer').delete();
                        db.collection('customer').add(data);
                    }
                    else{
                        db.collection('customer').add(data);
                    };
                });
                setSnackbar({type: 'success', message: t('label.success')});
                setOpen(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
            else if (response?.axiosResponse?.status === 401) {
                history.push('/login');
            }
            else {
                history.push('/404');
            };
        });
    };

    const handleShowFormDate = () => {
        setFormDate(true);
    };

    const handleDateChange = () => {
        const date = convertDate(dateBirth, 'yyyy-MM-DD');
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                birthDate: date
            },
            path: 'update'
        };
        patchProfileCustomers(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setCustomer(data);
                let db = new Localbase('db');
                db.collection('customer').get().then(customer => {
                    if (customer?.length > 0) {
                        db.collection('customer').delete();
                        db.collection('customer').add(data);
                    }
                    else{
                        db.collection('customer').add(data);
                    };
                });
                setSnackbar({type: 'success', message: t('label.success')});
                setOpen(true);
                setFormDate(false);
            }
            else if (response?.axiosResponse?.status === 401) {
                history.push('/login');
            }
            else {
                history.push('/404');
            };
        });
    };

    const handleShowFormPassword = () => {
        setFormPassword(true);
    };

    const handleChangePassword = (data) => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                oldPassword: data.oldPassword,
                password: data.newPassword,
                passwordConfirm: data.confirmPassword
            }
        };
        putChangePasswordCustomer(payload).then(response => {
            setErrorValidation(validation, false, setError);
            setBackDrop(false);
            if (response?.axiosResponse?.status === 400) {
                const data = response?.axiosResponse?.data;
                setErrorValidation(data, true, setError);
                setSnackbar({type: 'error', message: data?.message});
            }
            else if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setErrorValidation(validation, false, setError);
                setSnackbar({type: 'success', message: data?.message});
                setFormPassword(false);
            };
            setOpen(true);
        });
    };

    const handleSettingPassword = (data) => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                password: data.newPassword,
                passwordConfirm: data.confirmPassword
            }
        };
        putChangePasswordCustomer(payload).then(response => {
            setErrorValidation(validation, false, setError);
            setBackDrop(false);
            if (response?.axiosResponse?.status === 400) {
                const data = response?.axiosResponse?.data;
                setErrorValidation(data, true, setError);
                setSnackbar({type: 'error', message: data?.message});
            }
            else if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setErrorValidation(validation, false, setError);
                setSnackbar({type: 'success', message: data?.message});
                setFormPassword(false);
            };
            setOpen(true);
        });
    };

    const handleShowFormPhoneNumber = () => {
        setFormPhoneNumber(true);
    };

    const handleChangePhoneNumber = (data) => {
        setPhoneNumber(data.phoneNumber);

        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                phoneNumber: data.phoneNumber
            },
            path: 'validate-phone-number'
        }

        postProfileCustomers(payload).then(result => {
            if (result?.axiosResponse?.status === 202) {
                setSignature(result?.axiosResponse?.data.signature)
                getVerificationCode(data.phoneNumber);
                setDialog(true);
            } else {
                setSnackbar({ type: 'error', message: result.detail.phoneNumber });
                setOpen(true);
            }
        })
    };

    const handleCloseDialog = () => {
        setDialog(false);
    };

    const getVerificationCode = (phone) => {
        const payload = {
            params: {
                phone_number: phone
            }
        };
        getOtpVerification(payload).then(result => {
            setSeconds(60);
            if (result?.axiosResponse?.status === 200) {
                setPhoneNumber(phone)
                setSnackbar({ type: 'success', message: result.message });
                setOpen(true);
            } else {
                setSnackbar({ type: 'error', message: result.message });
                setOpen(true);
            };
        });
    };

    const onSubmitVerification = () => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                signature: signature,
                phoneNumber: phoneNumber
            },
            path: 'change-phone-number'
        };
        patchProfileCustomers(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const data = response?.axiosResponse?.data;
                setCustomer(data);
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    body: {
                        otpCode: verificationCode,
                        phoneNumber: phoneNumber
                    }
                }
                postOtpVerification(payload).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const payloadCustomer = {
                            headers: {
                                'Authorization': access,
                                'Cache-Control': 'no-cache'
                            }
                        };
                        getProfileCustomers(payloadCustomer).then(profiles => {
                            if (profiles?.axiosResponse?.status === 200) {
                                const dataProfile = profiles?.axiosResponse?.data;
                                let db = new Localbase('db');
                                db.collection('customer').get().then(customer => {
                                    if (customer?.length > 0) {
                                        db.collection('customer').delete();
                                        db.collection('customer').add(dataProfile);
                                    }
                                    else{
                                        db.collection('customer').add(dataProfile);
                                    };
                                });
                                setSnackbar({type: 'success', message: t('label.success')});
                                setOpen(true);
                                setSuccessDialog(true);
                            };
                        });
                    }
                    else {
                        setSnackbar({ type: 'error', message: result.message });
                        setOpen(true);
                    };
                });
            }
            else if (response?.axiosResponse?.status === 401) {
                history.push('/login');
            }
            else {
                history.push('/404');
            };
        });
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialog(false);
        setDialog(false);
        setFormPhoneNumber(false);
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <ProfileDetailOrganism
                    tabMenu={tabMenu}
                    handleChangeMenu={handleChangeMenu}
                    customer={customer}
                    gender={gender}
                    handleChangeGender={handleChangeGender}
                    formName={formName}
                    handleShowFormName={handleShowFormName}
                    handleChangeName={handleChangeName}
                    formDate={formDate}
                    handleShowFormDate={handleShowFormDate}
                    dateBirth={dateBirth}
                    setDateBirth={setDateBirth}
                    handleDateChange={handleDateChange}
                    formPassword={formPassword}
                    handleChangePassword={handleChangePassword}
                    handleShowFormPassword={handleShowFormPassword}
                    handleSettingPassword={handleSettingPassword}
                    handleShowFormPhoneNumber={handleShowFormPhoneNumber}
                    formPhoneNumber={formPhoneNumber}
                    handleChangePhoneNumber={handleChangePhoneNumber}
                    errors={errors}
                    handleOpen={openDialog}
                    handleClose={handleCloseDialog}
                    getVerificationCode={getVerificationCode}
                    setVerificationCode={setVerificationCode}
                    verificationSubmit={onSubmitVerification}
                    setSeconds={setSeconds}
                    seconds={seconds}
                    phoneNumber={phoneNumber}
                />
                <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
                <BackDropLoading open={backDrop} />
                <DialogMolecule handleOpen={openSuccessDialog} handleClose={handleCloseSuccessDialog}
                                content={t('message.verifiedAccount')} title={t('message.verificationSuccess')}
                                buttonName={t('form.continue')} />
            </MenuDashboard>
        </Suspense>
    );
};

export default ProfileEdit;