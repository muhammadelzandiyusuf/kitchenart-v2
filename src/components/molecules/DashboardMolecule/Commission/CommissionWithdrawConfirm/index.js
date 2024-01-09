import {
    React,
    Suspense,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    NumberFormat,
    useTranslation
} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CommissionWithdrawConfirm = (props) => {

    const t = useTranslation();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                open={props.openConfirmWithdraw}
                onClose={props.handleCloseConfirm}
                aria-labelledby="commission-withdraw-confirm"
            >
                <DialogTitle id="commission-withdraw-confirm">
                    <div className={'ta-c fs-24 tx-c'}>
                        {t('message.youMakeWithdrawal')}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={'ta-c'}>
                        <div className={'fw-400 fs-31 mb-16 tx-c'}>
                            <NumberFormat value={props.amount} displayType={'text'} thousandSeparator={true}
                                          prefix={'Rp'} decimalScale={0} />
                        </div>
                        <div className={'fw-400 fs-21 mb-16 tx-c'}>
                            {props.bank} {props.accountNumber}
                        </div>
                    </div>
                </DialogContent>
                <div className={'ta-c p-24'}>
                    <ButtonAtom
                        type={'button-text'}
                        typeButton={'button'}
                        styleView={'border-radius-10px fw-b text-transf-cap w-30 mr-8 btn__default'}
                        name={t('label.cancel')}
                        clicked={props.handleCloseConfirm}
                    />
                    {props.buttonLoading ? (
                        <ButtonAtom
                            type={'button-loading'}
                            typeButton={'button'}
                            styleView={'border-radius-10px fw-b btn__primary text-transf-cap w-30'}
                            styleImage={'w-24px'}
                        />
                    ):(
                        <ButtonAtom
                            type={'button-text'}
                            typeButton={'button'}
                            styleView={'border-radius-10px fw-b btn__primary text-transf-cap w-30'}
                            name={t('label.confirm')}
                            clicked={props.handleFinalConfirm}
                        />
                    )}
                </div>
            </Dialog>
        </Suspense>
    );
};

export default CommissionWithdrawConfirm;