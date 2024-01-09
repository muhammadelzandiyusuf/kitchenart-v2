import {
    React,
    Suspense,
    useMediaQuery,
    useState,
    useTheme,
    useTranslation,
    Dialog,
    IconButton,
    KeyboardBackspace, DialogTitle, DialogContent, Accordion, AccordionSummary, FormControlLabel, ExpandMore, Checkbox,
    AccordionDetails, Grid, EmptyProduct, NumberFormat
} from 'libraries';
import {getHostUrl} from 'utils';

const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CheckoutPaymentInstallment = (props) => {

    const {openPaymentInstallment, handleClosePaymentInstallment, payments, handleConfirmInstallmentBank,
        handleConfirmInstallmentTenor, installmentBank, installmentTenor, handleConfirmInstallment} = props;

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [fullWidth] = useState(true);
    const [maxWidth] = useState('sm');

    const installments = [];
    if (payments?.length > 0) {
        const payment = payments.find(item => item.paymentType === 'installment');
        installments.push(payment);
    };

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openPaymentInstallment}
                onClose={handleClosePaymentInstallment}
                aria-labelledby="billing-details"
            >
                <DialogTitle>
                    <div className={'ps-ab'}>
                        <IconButton aria-label="close" onClick={handleClosePaymentInstallment}>
                            <KeyboardBackspace fontSize={'default'} />
                        </IconButton>
                    </div>
                    <div className={'ta-c fw-b fs-22'}>
                        {t('label.installment')}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={'content__checkout__voucher mb-64'}>
                        {installments?.length > 0 &&
                            installments[0]?.paymentMethods.map((item, index) => {
                                return (
                                    <div key={index} className={'border-bottom-2px'}>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMore />}
                                                aria-label="Expand"
                                                aria-controls={`additional-actions${index}-content`}
                                                id={`additional-actions${index}-header`}
                                            >
                                                <Grid container
                                                      spacing={0}
                                                      direction="row"
                                                      justify="center"
                                                      alignItems="center">
                                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                                        <FormControlLabel
                                                            aria-label="Acknowledge"
                                                            control={<Checkbox />}
                                                            onClick={(event) => handleConfirmInstallmentBank(event, item.href, index, item?.name)}
                                                            checked={installmentBank?.index === index ? true : false}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                                        <img src={item.icon !== null ? getHostUrl(item.icon) : EmptyProduct} className={'w-100'}
                                                             alt={'icon-bank'} />
                                                    </Grid>
                                                    <Grid item xs={8} sm={8} md={8} lg={8}>
                                                        <div className={'fs-18 ml-24'}>{item?.name}</div>
                                                    </Grid>
                                                </Grid>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className={'ml-40 w-100'}>
                                                    {item.installments?.length > 0 &&
                                                        item.installments.map((installment, key) => {
                                                            return (
                                                                <Grid container spacing={0} key={key}>
                                                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                        <CheckBoxAtom
                                                                            type={'form'}
                                                                            id={`${item.code}`}
                                                                            name={`${item.code}`}
                                                                            label={`${installment.tenor}x@${installment.bankInterest}%`}
                                                                            styleCheckbox={'fs-18'}
                                                                            handleChangeCheckbox={(event) => handleConfirmInstallmentTenor(event, installment)}
                                                                            checked={installmentTenor?.tenor === installment.tenor && installmentBank?.href === item.href ? true : false}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                                                        <div className={'ta-r fs-18'}>
                                                                            <NumberFormat
                                                                                value={installment.installmentAmount.toFixed(0)}
                                                                                displayType={'text'}
                                                                                thousandSeparator={true}
                                                                                prefix={'Rp'}
                                                                                decimalScale={0}
                                                                            /> / {t('label.month')}
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={'mb-32 w-100'}>
                        <Grid
                            container
                            spacing={0}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <ButtonAtom
                                    type={'button-text'}
                                    name={t('label.confirm')}
                                    styleView={`${installmentTenor ? 'btn__primary' : 'btn__disabled'} text-transf-cap border-none border-radius-10px fs-16 fw-b w-100`}
                                    disabled={installmentTenor ? false : true}
                                    clicked={handleConfirmInstallment}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default CheckoutPaymentInstallment;