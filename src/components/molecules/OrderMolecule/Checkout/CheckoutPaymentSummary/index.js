import {
    Close,
    DialogTitle,
    IconButton,
    React,
    Suspense,
    useMediaQuery,
    useState,
    useTheme,
    useTranslation,
    Dialog,
    DialogContent,
    Grid,
    EmptyProduct, NumberFormat
} from 'libraries';
import {getHostUrl} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CheckoutPaymentSummary = (props) => {

    const {openPayment, handleClosePayment, payments, grandTotal, handleOpenBillingDetail, handleOpenPaymentMethod,
        handleOpenPaymentVirtualAccount, handleOpenPaymentCreditCard, handleOpenPaymentInstallment, buttonLoading,
        handlePay} = props;

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [fullWidth] = useState(true);
    const [maxWidth] = useState('sm');

    let payment = null;
    let paymentTypes = null;
    let image = null;
    if (payments?.length > 0) {
        paymentTypes = payments[0];
        payment = payments[0].paymentMethods[0];
        image = getHostUrl(payment?.icon);
    };

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openPayment}
                onClose={handleClosePayment}
                aria-labelledby="modal-payment-summary"
            >
                <DialogTitle>
                    <div className={'ps-ab top-right'}>
                        <IconButton aria-label="close" onClick={handleClosePayment}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className={'ta-c fw-b fs-22'}>
                        {t('label.choosePayment')}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <div className={'fs-18 fw-400'}>
                                {t('label.paymentMethod')}
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <div className={'fs-18 fw-400 ta-r pointer'} onClick={handleOpenPaymentMethod}>
                                {t('label.seeMore')}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {paymentTypes?.paymentType === 'bank_transfer' &&  payment !== null &&
                                <div className={'border-bottom mt-32 pb-32'}>
                                    <Grid
                                        container
                                        spacing={0}
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        className={'pointer'}
                                        onClick={() => handleOpenPaymentVirtualAccount(payment)}
                                    >
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <img src={image !== null ? image : EmptyProduct} className={'w-100'} alt={'icon-bank'} />
                                        </Grid>
                                        <Grid item xs={9} sm={9} md={9} lg={9}>
                                            <div className={'fs-18 ml-24 tx-c'}>{payment?.name}</div>
                                        </Grid>
                                    </Grid>
                                </div>
                            }
                            {paymentTypes?.paymentType === 'credit_card' &&
                                <div className={'border-bottom mt-32 pb-32'}>
                                    <div className={'fs-18 fw-400 mb-16'}>{paymentTypes?.labelPaymentType}</div>
                                    <div
                                        className={'fs-18 tc-p pointer'}
                                        onClick={() => handleOpenPaymentCreditCard(paymentTypes?.paymentMethods[0]?.href)}>
                                        {t('label.insertCard')}
                                    </div>
                                </div>
                            }
                            {paymentTypes?.paymentType === 'installment' &&  payment !== null &&
                                <div className={'border-bottom mt-32 pb-32'}>
                                    <div className={'fs-18 fw-400 mb-16'}>{paymentTypes?.labelPaymentType}</div>
                                    <div
                                        className={'fs-18 tc-p pointer'}
                                        onClick={handleOpenPaymentInstallment}
                                    >
                                        {t('label.chooseBank')}
                                    </div>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'mt-32 fs-18 mb-100 pointer tx-c'} onClick={handleOpenBillingDetail}>
                                {t('label.billingDetails')}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'mb-32'}>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    className={'pointer'}
                                >
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <div className={'text-transf-up fs-16 fw-b'}>total</div>
                                        <div className={'fs-20 fw-b'}>
                                            {grandTotal !== undefined  &&
                                                <NumberFormat value={grandTotal.toFixed(0)} displayType={'text'}
                                                              thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        {paymentTypes?.paymentType === 'bank_transfer' &&  payment !== null &&
                                            <div className={'ta-r'}>
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
                                            </div>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default CheckoutPaymentSummary;