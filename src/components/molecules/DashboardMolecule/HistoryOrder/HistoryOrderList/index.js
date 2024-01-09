import {EmptyProduct, Grid, NumberFormat, React, Suspense, useTranslation} from "libraries";
import {convertDate} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const HistoryOrderList = (props) => {
    const { handleDetail, handleCompletePayment, historyOrders, optionStatus } = props;

    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            {historyOrders?.length > 0 ? (
                historyOrders.map((historyOrder, index) => {
                    const date = convertDate(historyOrder?.created, 'DD MMM yyyy kk:mm:ss');
                    const imageProduct = historyOrder?.productHighlight?.productImage;
                    const status = optionStatus.find((item) => item.value === historyOrder.status);
                    return(
                        <div key={index} className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                            <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                                <Grid container spacing={0}>
                                    <Grid item xs={5} sm={3} md={3} lg={3}>
                                        {date}
                                    </Grid>
                                    <Grid item xs={7} sm={5} md={4} lg={4}>
                                        {t('label.orderNumber')}: {historyOrder?.orderNumber}
                                    </Grid>
                                    <Grid item xs={4} sm={2} md={2} lg={2}>
                                        <div className={'ta-c'}>
                                            {historyOrder?.payment?.paymentMethod?.type}
                                        </div>
                                    </Grid>
                                    <Grid item xs={8} sm={3} md={3} lg={3}>
                                        <div className={'ta-r'}>
                                            {status !== undefined ? status.displayName : ''}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={'p-16 fs-16 tx-c'}>
                                <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <img src={imageProduct !== null ? imageProduct : EmptyProduct} alt={"img-product"}
                                             className={'w-100'} />
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={3} lg={3}>
                                        <div className={'ml-16'}>
                                            <div className={'fw-400'}>{historyOrder.productHighlight?.productBrand}</div>
                                                {`
                                                    ${historyOrder.productHighlight?.productName}
                                                    ${historyOrder.productHighlight?.productCode}
                                                `}
                                        </div>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2} lg={2}>
                                        {historyOrder.productHighlight?.quantity} item
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} lg={3}>
                                        {status !== undefined ? status.displayName : ''}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} lg={2}>
                                        <div className={'ta-c border-left pt-40 pb-40'}>
                                            Total <br/>
                                            <NumberFormat value={historyOrder.grandTotal}
                                                          displayType={'text'}
                                                          thousandSeparator={true}
                                                          prefix={'Rp '}
                                                          decimalScale={0}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={'p-16 fs-16 tx-c'}>
                                <Grid container spacing={2} direction="row" justifycontent="center" alignItems="center">
                                    <Grid item xs={12} sm={12} md={5} lg={5}>
                                        {(historyOrder.totalItems - 1) !== 0 &&
                                            <div>
                                                {`
                                                    ${t('label.with')}
                                                    ${(historyOrder.totalItems - 1)}
                                                    ${t('label.otherItem')}
                                                `}
                                            </div>
                                        }
                                    </Grid>
                                    {historyOrder.status === 'unpaid' &&
                                        <Grid item xs={6} sm={6} md={4} lg={4} className={"ta-c"}>
                                            <ButtonAtom variant="contained" color="secondary"
                                                        name={t('label.completePayment')}
                                                        styleView={'btn__primary text-transf-cap w-100'}
                                                        clicked={() => handleCompletePayment(historyOrder.orderNumber)}
                                            />
                                        </Grid>
                                    }
                                    {historyOrder.status === 'paid' &&
                                        <Grid item xs={6} sm={6} md={4} lg={4}></Grid>
                                    }
                                    {historyOrder.status === 'completed' &&
                                        <Grid item xs={6} sm={6} md={4} lg={4}></Grid>
                                    }
                                    {historyOrder.status === 'cancelled' &&
                                        <Grid item xs={6} sm={6} md={4} lg={4}></Grid>
                                    }
                                    <Grid item xs={6} sm={6} md={3} lg={3}>
                                        <div className={'td-u pointer ta-r'}
                                              onClick={() => handleDetail(historyOrder.orderNumber)}>
                                            {t('label.seeTransactionDetail')}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div className={'mb-32 p-48'}>
                    <div className={'fs-24 ta-c tx-c fw-400'}>{t('label.noTransaction')}</div>
                </div>
            )}
        </Suspense>
    )
}

export default HistoryOrderList;