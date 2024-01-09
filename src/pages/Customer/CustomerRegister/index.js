import {React, Suspense, useState, useForm, useTranslation, useHistory} from "libraries";
import {registerCustomer, newsletter, getOtpVerification, postOtpVerification, loginCustomer} from "services";
import { setErrorValidation } from "utils";

const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const RegisterOrganism = React.lazy(() => import('components/organisms/RegisterOrganism'));
const DialogMolecule = React.lazy(() => import('components/molecules/DialogMolecule'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const CustomerRegister = React.memo( () => {
    const t = useTranslation();
    const history = useHistory();

    const [meta] = useState({
        title: 'KitchenArt - Register'
    });
    const [open, setOpen] = useState(false);
    const [openDialog, setDialog] = useState(false);
    const [openSuccessDialog, setSuccessDialog] = useState(false);
    const [openCorrectionDialog, setCorrectionDialog] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [backDrop, setBackDrop] = useState(false);
    const [signature, setSignature] = useState('');

    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: 'Buat akun berhasil'
    });

    const [validation] = useState({
        detail: {
            name: [null],
            email: [null],
            phoneNumber: [null],
            birthDate: [null],
            password: [null],
            passwordConfirm: [null]
        }
    });

    const { errors, setError } = useForm();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCloseDialog = () => {
        setDialog(false);
    };

    const handleCloseSuccessDialog = () => {
        customer.signature = signature;
        setSuccessDialog(false);
        setDialog(false);
        setBackDrop(true);
        const payload = { body: customer };
        registerCustomer(payload).then(result => {
            if (result.message) {
                setBackDrop(false);
                setSnackbar({ type: 'error', message: result.message });
                setOpen(true);
            } else {
                newsletter(payload);
                const payloadLogin = {
                    body: {
                        email: customer.email,
                        password: customer.password
                    }
                }
                loginCustomer(payloadLogin).then(response => {
                    setBackDrop(false);
                    if (response.message) {
                        setSnackbar({ type: 'error', message: response.message });
                        setOpen(true);
                    } else {
                        history.push('/');
                    }
                });
            }
        });
    };

    const handleCorrectionDialog = () => {
        setCorrectionDialog(false);
        setBackDrop(true);
        const payload = {
            body: customer,
            path: 'validate'
        }
        registerCustomer(payload).then(result => {
            setErrorValidation(validation, false, setError);
            if (result?.axiosResponse?.status === 202) {
                setBackDrop(false);
                const data = result?.axiosResponse?.data;
                setSignature(data.signature);

                getVerificationCode(customer.phoneNumber);
                setDialog(true);
            } else {
                setBackDrop(false);
                setErrorValidation(result, true, setError);
                setSnackbar({ type: 'error', message: result.message });
                setOpen(true);
            }
        })
    }

    const handleCloseCorrectionDialog = () => {
        setCorrectionDialog(false);
    };

    const onSubmit = data => {
        setCustomer(data)
        setCorrectionDialog(true);
    };

    const getVerificationCode = (phone) => {
        const payload = {
            params: {
                phone_number: phone
            }
        }
        getOtpVerification(payload).then(result => {
            setSeconds(60);
            if (result?.axiosResponse?.status === 200) {
                setPhoneNumber(phone)
                setSnackbar({ type: 'success', message: result.message });
                setOpen(true);
            } else {
                setSnackbar({ type: 'error', message: result.message });
                setOpen(true);
            }
        })
    }

    const onSubmitVerification = () => {
        const payload = {
            body: {
                otpCode: verificationCode,
                phoneNumber: phoneNumber
            }
        }
        postOtpVerification(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                setSuccessDialog(true);
            } else {
                setSnackbar({ type: 'error', message: result.message });
                setOpen(true);
            }
        })
    }

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <RegisterOrganism
                registerSubmit={onSubmit}
                error={errors}
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
            <DialogMolecule handleOpen={openCorrectionDialog} handleCloseSecond={handleCloseCorrectionDialog}
                            content={t('message.correctionEmail')} title={customer?.email}
                            buttonName={t('label.trueCorrection')} handleClose={handleCorrectionDialog}
                            secondButton={true} secondButtonName={t('label.change')} />
            <DialogMolecule handleOpen={openSuccessDialog} handleClose={handleCloseSuccessDialog}
                            content={t('message.verifiedAccount')} title={t('message.verificationSuccess')}
                            buttonName={t('form.continue')} />
            <BackDropLoading open={backDrop} />
        </Suspense>
    );
});

export default CustomerRegister;