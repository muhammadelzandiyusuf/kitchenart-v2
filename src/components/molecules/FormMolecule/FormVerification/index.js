import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    KeyboardBackspace,
    React,
    Suspense,
    useMediaQuery,
    useEffect,
    useState,
    useTheme, useTranslation
} from "libraries";

import 'assets/scss/customer/verification.scss';
import VerificationInput from "react-verification-input";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const FormVerification = (props) => {
    const t = useTranslation();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (props.seconds > 0) {
            setTimeout(() => props.setSeconds(props.seconds - 1), 1000);
        } else {
            props.setSeconds(0);
        }
    }, [props]);

    const handleVerification = (e) => {
        if (e.length === 6) {
            setEnabled(true);
            props.setVerificationCode(e);
        } else {
            setEnabled(false);
        }
    }

    return(
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                open={props.handleOpen}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
                className="ta-c">
                <DialogTitle id="responsive-dialog-title" className="bgc-red mb-32 ta-l">
                    <IconButton aria-label="close" onClick={props.handleClose}>
                        <KeyboardBackspace className={"tc-white"} />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="ta-c">
                    <div className="fs-24 tx-c mb-20"><b>{t('label.confirmationCode')}</b></div>
                    <div className="fs-18 mb-20 tx-c">
                        {t('label.sentConfirmationCode')} <b> {props.phoneNumber} </b>
                        {t('label.whatsappVerification')}<br/>{t('label.enterCodeRegistration')}
                    </div>
                    <VerificationInput
                        validChars={"0-9"}
                        onChange={handleVerification}
                        classNames={
                            {
                                character: "character",
                                characterInactive: "character--inactive",
                                characterSelected: "character--selected"
                            }
                        } />
                    <DialogActions className="ds-b ta-c pb-32">
                        <ButtonAtom
                            variant="contained"
                            name={t('form.confirm')}
                            type="submit"
                            styleView={enabled ? "btn__confirm btn__primary mt-50" : "btn__confirm mt-50"}
                            disabled={!enabled}
                            clicked={props.verificationSubmit}
                        />
                        {props.seconds > 0 ? (
                            <div className="mt-50 tx-c">
                                {t('label.wait')} {props.seconds} {t('label.resendCode')}
                            </div>
                        ) : (
                            <>
                                <div className="mt-50 tx-c">{t("label.haven'tCode")}</div>
                                <div className="mt-20 tx-c pointer"
                                     onClick={() => props.getVerificationCode(props.phoneNumber)}>
                                    <b>{t('label.resendPassword')}</b>
                                </div>
                            </>
                        )}
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Suspense>
    )
}

export default FormVerification;