import {React, Suspense, useMediaQuery, useTheme, useTranslation, Dialog, DialogTitle, DialogContent} from 'libraries';

const FormCancelSuccess = (props) => {

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={props.formCancelOrderSuccess}
                onClose={props.handleShowFormCancelOrderSuccess}
                aria-labelledby="form-cancel-order"
            >
                <DialogTitle id="form-cancel-order">
                    <div className={'fs-28 ta-c tx-c fw-400'}>{t('message.thankYou')}</div>
                </DialogTitle>
                <DialogContent>
                    <div className={'fs-24 tx-c ta-c pb-32'}>{t('message.yourRequestIsBeingProcessed')}</div>
                    <div className={'ta-c pb-24'}>
                        <ButtonAtom
                            styleView={'btn__primary text-transf-cap fs-18 w-30'}
                            name={t('form.continue')}
                            type={'button-text'}
                            clicked={props.handleShowFormCancelOrderSuccess}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default FormCancelSuccess;