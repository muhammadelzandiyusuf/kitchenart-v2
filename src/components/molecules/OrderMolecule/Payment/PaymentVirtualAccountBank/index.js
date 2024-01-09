import {React, Suspense, Grid, EmptyProduct, useTranslation, NumberFormat, CopyToClipboard} from 'libraries';
import {getHostUrl} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const PaymentVirtualAccountBank = (props) => {

    const {payments, handleCopyVirtualAccountNumber, handleViewPayments} = props;
    const t = useTranslation();

    const image = getHostUrl(payments?.payment?.icon);
    const paymentMethod = payments?.payment?.paymentMethod;
    const virtualAccountNumber = payments?.payment?.vaNumber;
    const orderNumber = payments?.orderNumber;
    const total = payments?.total;

    return (
        <Suspense fallback={null}>
            <div className={'mt-32 mb-16 border-bottom'}>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <img src={image !== null ? image : EmptyProduct} className={'w-100'} alt={'icon-bank'} />
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={9}>
                        <div className={'fs-22 ml-24 fw-400'}>{paymentMethod}</div>
                    </Grid>
                </Grid>
                {payments?.payment?.tenor &&
                    <div className={'mt-16'}>
                        <Grid container spacing={0}>
                            <Grid item xs={6} sm={6} md={9} lg={9}>
                                <div className={'fs-20'}>Tenor</div>
                                <div className={'fs-24 fw-400'}>{payments?.payment?.tenor}x</div>
                            </Grid>
                        </Grid>
                    </div>
                }
                <div className={'mt-16'}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={6} md={9} lg={9}>
                            <div className={'fs-20'}>{t('label.orderNumber')}</div>
                            <div className={'fs-24 fw-400'}>{orderNumber}</div>
                        </Grid>
                    </Grid>
                </div>
                {payments?.payment?.billCode &&
                    <div className={'mt-16'}>
                        <Grid container spacing={0}>
                            <Grid item xs={6} sm={6} md={9} lg={9}>
                                <div className={'fs-20'}>{t('label.billCode')}</div>
                                <div className={'fs-24 fw-400'}>{payments?.payment?.billCode}</div>
                            </Grid>
                        </Grid>
                    </div>
                }
                {payments?.payment?.vaNumber &&
                    <div className={'mt-16'}>
                        <Grid container spacing={0}>
                            <Grid item xs={6} sm={6} md={9} lg={9}>
                                <div className={'fs-20'}>{t('label.virtualAccountNumber')}</div>
                                <div className={'fs-24 fw-400'}>{virtualAccountNumber}</div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <div className={'fs-24 tc-p fw-400 ta-c pointer'}>
                                    <CopyToClipboard text={virtualAccountNumber}
                                                     onCopy={handleCopyVirtualAccountNumber}>
                                        <span>{t('label.copy')}</span>
                                    </CopyToClipboard>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }
                {total !== undefined &&
                    <div className={'mt-16'}>
                        <Grid container spacing={0}>
                            <Grid item xs={6} sm={6} md={9} lg={9}>
                                <div className={'fs-20'}>{t('label.totalPayments')}</div>
                                <div className={'fs-24 fw-400'}>
                                    <NumberFormat value={total.toFixed(0)} displayType={'text'}
                                                  thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }
                <div className={'mt-16 mb-16 ta-r'}>
                    <ButtonAtom
                        type={'button-text'}
                        name={t('label.viewPayments')}
                        styleView={'text-transf-cap tx-c fw-b w-20 border-color-primary mr-8'}
                        clicked={() => handleViewPayments(orderNumber)}
                    />
                </div>
            </div>
        </Suspense>
    );
};

export default PaymentVirtualAccountBank;