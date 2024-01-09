import {
    React,
    Suspense,
    useMediaQuery,
    useState,
    useTheme,
    useTranslation,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid, EmptyProduct, NumberFormat
} from 'libraries';
import {getHostUrl} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CheckoutPaymentVirtualAccount = (props) => {

    const {openPaymentVirtualAccount, handleClosePaymentVirtualAccount, grandTotal, handleOpenBillingDetail,
        virtualAccount, handlePay, buttonLoading} = props;

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [fullWidth] = useState(true);
    const [maxWidth] = useState('sm');

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openPaymentVirtualAccount}
                onClose={handleClosePaymentVirtualAccount}
                aria-labelledby="billing-details"
            >
                <DialogTitle>
                    <div className={'ta-c fw-b fs-22'}>
                        {t('label.choosePayment')}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={'mt-32 border-bottom-2px pb-16 mb-32'}>
                        <Grid container spacing={0}>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div className={'text-transf-up fs-18 fw-b'}>total</div>
                                <div className={'fs-20 fw-b'}>
                                    {grandTotal !== undefined  &&
                                        <NumberFormat value={grandTotal.toFixed(0)} displayType={'text'}
                                                  thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div className={'fs-18 pointer ta-r'} onClick={handleOpenBillingDetail}>
                                    {t('label.billingDetails')}
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'mb-32'}>
                        <Grid
                            container
                            spacing={0}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <img src={virtualAccount?.icon !== null ? getHostUrl(virtualAccount?.icon) : EmptyProduct}
                                     className={'w-100'} alt={'icon-bank'} />
                            </Grid>
                            <Grid item xs={9} sm={9} md={9} lg={9}>
                                <div className={'fs-18 ml-24 tx-c'}>{virtualAccount?.name}</div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'bgc-buttery-white p-16 fs-18 mb-100'}>
                        {t('message.virtualAccountPayment', {params: virtualAccount?.name})}
                    </div>
                    <div className={'mb-32'}>
                        <Grid
                            container
                            spacing={0}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                {buttonLoading ? (
                                    <ButtonAtom
                                        type={'button-loading'}
                                        styleView={'btn__primary border-none border-radius-10px w-100'}
                                        styleImage={'w-11'}
                                    />
                                ):(
                                    <ButtonAtom
                                        type={'button-text'}
                                        name={t('label.pay')}
                                        styleView={'btn__primary text-transf-cap border-none border-radius-10px fs-16 fw-b w-100'}
                                        clicked={handlePay}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default CheckoutPaymentVirtualAccount;