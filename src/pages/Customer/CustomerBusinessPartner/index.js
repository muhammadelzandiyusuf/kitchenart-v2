import {faEnvelope, React, Suspense, useForm, useHistory, useState, useTranslation} from "libraries";
import {getOtpVerification, postOtpVerification, registerBusinessPartner} from "services";
import {setErrorValidation} from "utils";

import 'assets/scss/form/form.scss';

const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const DialogMolecule = React.lazy(() => import('components/molecules/DialogMolecule'));
const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const BusinessPartnerOrganism = React.lazy(() => import('components/organisms/BusinessPartnerOrganism'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const CustomerBusinessPartner = React.memo(() => {
    const t = useTranslation();
    const history = useHistory();

    const [meta] = useState({
        title: 'KitchenArt - Register Business Partner'
    });

    const [open, setOpen] = useState(false);
    const [openDialog, setDialog] = useState(false);
    const [businessPartner, setBusinessPartner] = useState(null);
    const [openSuccessDialog, setSuccessDialog] = useState(false);
    const [openCorrectionDialog, setCorrectionDialog] = useState(false);
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
            firstName: [null],
            lastName: [null],
            email: [null],
            birthDate: [null],
            phoneNumber: [null],
            profile: {
                address: [null],
                city: [null],
                companyAddress: [null],
                companyCity: [null],
                companyDistrict: [null],
                companyIndustry: [null],
                companyName: [null],
                companyPhone: [null],
                companyPostalCode: [null],
                companyProvince: [null],
                companySite: [null],
                companySubdistrict: [null],
                district: [null],
                documentIdentityType: [null],
                documentIdentityFile: [null],
                gender: [null],
                identityNumber: [null],
                otherDocumentType: [null],
                otherDocumentFile: [null],
                position: [null],
                postalCode: [null],
                province: [null],
                registrationPurpose: [null],
                subdistrict: [null]
            }
        }
    });

    const { errors, setError } = useForm();
    const [content, setContent] = useState({});

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
        setSuccessDialog(false);
        setDialog(false);
        history.push('/');
    };

    const handleCorrectionDialog = () => {
        setCorrectionDialog(false);
        setBackDrop(true);
        const payload = {
            body: businessPartner,
            path: 'validate'
        }
        registerBusinessPartner(payload).then(result => {
            setErrorValidation(validation, false, setError);
            if (result?.axiosResponse?.status === 202) {
                setBackDrop(false);
                const data = result?.axiosResponse?.data;
                setSignature(data.signature);

                getVerificationCode(businessPartner.phoneNumber);
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
        setBusinessPartner(data);
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
                setBackDrop(true);
                businessPartner.signature = signature;
                const payloadBusinessPartner = {
                    body: businessPartner,
                    path: 'register'
                };
                registerBusinessPartner(payloadBusinessPartner).then(result => {
                    if (result.message) {
                        setBackDrop(false);
                        setDialog(false);
                        setSnackbar({ type: 'error', message: result.message });
                        setOpen(true);
                    } else {
                        setBackDrop(false);
                        setContent({
                            data: `<b>${t('message.congratulations')}</b> <br> ${t('message.verifiedData')}`
                        });
                        setSuccessDialog(true);
                    }
                });
            } else {
                setSnackbar({ type: 'error', message: result.message });
                setOpen(true);
            }
        })
    }

    return(
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <BusinessPartnerOrganism
                businessPartnerSubmit={onSubmit}
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
            <DialogMolecule
                handleOpen={openCorrectionDialog}
                handleCloseSecond={handleCloseCorrectionDialog}
                content={t('message.correctionEmail')}
                title={businessPartner?.email}
                buttonName={t('label.trueCorrection')}
                handleClose={handleCorrectionDialog}
                secondButton={true}
                secondButtonName={t('label.change')} />
            <BackDropLoading open={backDrop} />
            <DialogMolecule
                handleOpen={openSuccessDialog}
                handleClose={handleCloseSuccessDialog}
                content={content.data}
                icon={faEnvelope}
                styleIcon="fs-3rem"
                buttonName="OK" />
        </Suspense>
    );
});

export default CustomerBusinessPartner;