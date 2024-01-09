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
    IconButton, Close, Grid, EmptyProduct
} from 'libraries';
import {getHostUrl} from "utils";

const CheckoutPaymentMethod = (props) => {

    const {openPaymentMethod, handleClosePaymentMethod, payments, handleOpenPaymentVirtualAccount,
        handleOpenPaymentCreditCard, handleOpenPaymentInstallment} = props;

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [fullWidth] = useState(true);
    const [maxWidth] = useState('sm');

    let paymentVirtualAccount = [];
    let creditCard = [];
    let installment = [];
    if (payments?.length > 0) {
        payments.forEach(item => {
            if (item.paymentType === 'bank_transfer') {
                paymentVirtualAccount.push(item);
            }
            else if (item.paymentType === 'credit_card') {
                creditCard.push(item);
            }
            else if (item.paymentType === 'installment') {
                installment.push(item);
            };
        });
    };

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openPaymentMethod}
                onClose={handleClosePaymentMethod}
                aria-labelledby="billing-details"
            >
                <DialogTitle>
                    <div className={'ps-ab top-right'}>
                        <IconButton aria-label="close" onClick={handleClosePaymentMethod}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className={'ta-c fw-b fs-22'}>
                        {t('label.choosePaymentMethod')}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={'content__checkout__voucher'}>
                        {paymentVirtualAccount?.length > 0 &&
                            <div className={'mb-32 border-bottom'}>
                                <div className={'fs-18 fw-400 mb-16'}>{paymentVirtualAccount[0]?.labelPaymentType}</div>
                                {paymentVirtualAccount[0]?.paymentMethods.map((item, index) => {
                                    const image = getHostUrl(item.icon);
                                    return (
                                        <Grid
                                            container
                                            spacing={0}
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                            className={'pointer mb-16'}
                                            key={index}
                                            onClick={() => handleOpenPaymentVirtualAccount(item)}
                                        >
                                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                                <img src={image !== null ? image : EmptyProduct} className={'w-100'}
                                                     alt={'icon-bank'} />
                                            </Grid>
                                            <Grid item xs={9} sm={9} md={9} lg={9}>
                                                <div className={'fs-18 ml-24 tx-c'}>{item?.name}</div>
                                            </Grid>
                                        </Grid>
                                    )
                            })}
                            </div>
                        }
                        {creditCard?.length > 0 &&
                            <div className={'mb-32 border-bottom pb-32'}>
                                <div className={'fs-18 fw-400 mb-16'}>{creditCard[0]?.labelPaymentType}</div>
                                <div
                                    className={'fs-18 tc-p pointer'}
                                    onClick={() => handleOpenPaymentCreditCard(creditCard[0]?.paymentMethods[0]?.href)}>
                                    {t('label.insertCard')}
                                </div>
                            </div>
                        }
                        {installment?.length > 0 &&
                            <div className={'mb-32 pb-32 border-bottom'}>
                                <div className={'fs-18 fw-400 mb-16'}>{installment[0]?.labelPaymentType}</div>
                                <div
                                    className={'fs-18 tc-p pointer'}
                                    onClick={handleOpenPaymentInstallment}
                                >
                                    {t('label.chooseBank')}
                                </div>
                            </div>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </Suspense>
    );

};

export default CheckoutPaymentMethod;