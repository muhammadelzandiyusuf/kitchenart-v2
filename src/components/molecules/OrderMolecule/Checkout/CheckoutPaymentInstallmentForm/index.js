import {
    React,
    Suspense,
    useMediaQuery,
    useState,
    useTheme,
    useTranslation,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid, NumberFormat, IconButton, KeyboardBackspace
} from 'libraries';

const CheckoutCreditCardForm = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutCreditCardForm'));

const CheckoutPaymentInstallmentForm = (props) => {

    const {openPaymentInstallmentForm, handleClosePaymentInstallmentForm, handleOpenBillingDetail,
        handlePay, buttonLoading, installmentBank, installmentTenor} = props;

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
                open={openPaymentInstallmentForm}
                onClose={handleClosePaymentInstallmentForm}
                aria-labelledby="billing-details"
            >
                <DialogTitle>
                    <div className={'ps-ab'}>
                        <IconButton aria-label="close" onClick={handleClosePaymentInstallmentForm}>
                            <KeyboardBackspace fontSize={'default'} />
                        </IconButton>
                    </div>
                    <div className={'ta-c fw-b fs-22'}>
                        {t('label.choosePayment')}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={'mt-32 border-bottom-2px pb-16 mb-8'}>
                        <Grid container spacing={0}>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div className={'text-transf-up fs-18 fw-b'}>{installmentBank?.name}</div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div className={'ta-r fs-18'}>
                                    {installmentTenor?.tenor}x@{installmentTenor?.bankInterest}% <span className={'ml-16'}>
                                        {installmentTenor &&
                                            <NumberFormat value={installmentTenor?.installmentAmount.toFixed(0)}
                                                          displayType={'text'} thousandSeparator={true} prefix={'Rp'}
                                                          decimalScale={0} />
                                        }
                                    </span> / {t('label.month')}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={'fs-18 pointer mt-32 mb-16'} onClick={handleOpenBillingDetail}>
                                    {t('label.billingDetails')}
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'mb-16 bgc-buttery-white p-16 fs-18'}>
                        {t('message.kitchenartDoesStoreData')}
                    </div>
                    <CheckoutCreditCardForm
                        handleSubmitForm={handlePay}
                        buttonLoading={buttonLoading}
                    />
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default CheckoutPaymentInstallmentForm;