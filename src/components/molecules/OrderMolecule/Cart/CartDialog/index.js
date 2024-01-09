import {React, Suspense, useState, Dialog, useTranslation, DialogTitle} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CartDialog = (props) => {

    const t = useTranslation();
    const [fullWidth] = useState(true);
    const [maxWidth] = useState('md');

    return (
        <Suspense fallback={null}>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.openDialog}
                onClose={props.handleCloseDialog}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">
                    <div className={'ds-f p-32'}>
                        <div className={'w-50 fs-18'}>{t('message.deleteSelectProduct')}?</div>
                        <div className={'w-50 ta-r'}>
                            <ButtonAtom
                                type={'button-text'}
                                name={t('label.cancel')}
                                styleView={'text-transf-cap tx-c fw-b w-40 border-color-primary mr-8'}
                                clicked={props.handleCloseDialog}
                            />
                            <ButtonAtom
                                type={'button-text'}
                                name={t('label.delete')}
                                styleView={'text-transf-cap w-40 fw-b tc-white bgc-primary mr-24'}
                                clicked={props.handleDeleteCarts}
                            />
                        </div>
                    </div>
                </DialogTitle>
            </Dialog>
        </Suspense>
    );
};

export default CartDialog;