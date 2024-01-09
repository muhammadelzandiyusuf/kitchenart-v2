import {React, Suspense, Grid, useTranslation, NumberFormat, EmptyProduct, moment} from "libraries";
import {convertDate} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const TooltipAtom = React.lazy(() => import('components/atoms/TooltipAtom/LightTooltipAtom'));

const OrderDetail = (props) => {
    const { handleTrackingOrder, historyOrder, handleProductReview, handleShowOrderComplaint, handleShowFormCancelOrder,
        optionStatus, handleBuyAgain} = props;

    const t = useTranslation();

    let minutesDiff = 0;
    const lastTime = 12 * 60;
    if (historyOrder?.created) {
        const then = convertDate(historyOrder?.created, 'DD-MM-YYYY hh:mm:ss');
        const now = convertDate(new Date(), 'DD-MM-YYYY hh:mm:ss');

        const startTime = moment(then, 'DD-MM-YYYY hh:mm:ss');
        const endTime = moment(now, 'DD-MM-YYYY hh:mm:ss');

        minutesDiff = endTime.diff(startTime, 'minutes');
    }

    let actionsCancel = null;
    if (historyOrder?.actions?.length > 0) {
        actionsCancel = historyOrder?.actions.find(item => item === 'cancel_order');
    }
    const date = convertDate(historyOrder?.created, 'DD MMM yyyy kk:mm:ss');
    const status = optionStatus.find((item) => item.value === historyOrder.status);

    return(
        <Suspense fallback={null}>
            <div className={'fs-18 fw-b border-bottom-2px p-16 tx-c'}>{t('label.orderDetail')}</div>
            <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                <Grid container spacing={0}>
                    <Grid item xs={5} sm={3} md={3} lg={3}>{date}</Grid>
                    <Grid item xs={7} sm={5} md={4} lg={4}>
                        {t('label.orderNumber')}: {historyOrder.orderNumber}
                    </Grid>
                    <Grid item xs={4} sm={2} md={2} lg={2}>
                        <div className={'ta-c'}>
                            {historyOrder?.payment?.paymentMethod?.type}
                        </div>
                    </Grid>
                    <Grid item xs={8} sm={3} md={3} lg={3}>
                        <div className={'ta-c'}>
                            {status !== undefined ? status?.displayName : ''}
                        </div>
                    </Grid>
                </Grid>
            </div>
            {historyOrder.lineItems?.map((orderItem, index) => {
                const statusItem = optionStatus.find((item) => item.value === orderItem.status);
                return(
                    <div key={index}>
                        <div className={'p-16 fs-16 tx-c'}>
                            <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <img src={orderItem.productImage !== null ? orderItem.productImage : EmptyProduct}
                                         alt={"img"} className={"w-100"} />
                                </Grid>
                                <Grid item xs={4} sm={4} md={3} lg={3}>
                                    <div className={'ml-16'}>
                                        <div className={'fw-400'}>{orderItem.productBrand}</div>
                                        {`
                                            ${orderItem.productName} 
                                            ${orderItem.productCode}
                                        `}
                                        <div>
                                            {orderItem.meta?.services?.length > 0 &&
                                                orderItem.meta?.services.map((service, index) => {
                                                    return(
                                                        <div key={index}>
                                                            <div>+</div>
                                                            <div>
                                                                {`${service.typeLabel} 
                                                                (${service.period} ${t('label.year')})`}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={3} sm={3} md={2} lg={2}>
                                    {`${orderItem.quantity} ${t('label.item')}`}
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    {statusItem !== undefined ? statusItem?.displayName : ''}
                                </Grid>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <div className={'ta-c border-left pt-40 pb-40'}>
                                        Total <br />
                                        <NumberFormat value={orderItem.subtotal}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      prefix={'Rp '}
                                                      decimalScale={0}
                                        />
                                    </div>
                                </Grid>
                                {historyOrder.status === 'completed' && !orderItem.hasReview ? (
                                    <>
                                        <Grid item xs={6} sm={6} md={9} lg={9}>
                                            {orderItem.status === 'received' &&
                                                <div className={'td-u mt-6 ta-r'}>
                                                    <span className={"pointer"}
                                                          onClick={() => handleShowOrderComplaint(orderItem.href)}>
                                                        {t('label.complaint')}
                                                    </span>
                                                    <TooltipAtom title={t('label.complaintNote')} />
                                                </div>
                                            }
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={3} lg={3}>
                                            <div className={'ta-r'}>
                                                <ButtonAtom variant="contained" color="secondary"
                                                            name={t('label.leaveReview')}
                                                            styleView={'btn__primary text-transf-cap'}
                                                            clicked={() => handleProductReview(orderItem.orderItemNumber)}
                                                />
                                            </div>
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        {orderItem.status === 'received' &&
                                            <div className={'td-u mt-6 ta-r'}>
                                                <span className={"pointer"}
                                                      onClick={() => handleShowOrderComplaint(orderItem.href)}>
                                                    {t('label.complaint')}
                                                </span>
                                                <TooltipAtom title={t('label.complaintNote')} />
                                            </div>
                                        }
                                    </Grid>
                                )
                                }
                            </Grid>
                            {orderItem.shipment &&
                                <div className={'ta-r'}>
                                    <ButtonAtom variant="contained" color="secondary"
                                                styleView={'btn__default text-transf-cap'}
                                                name={t('label.trackingOrder')}
                                                clicked={() => handleTrackingOrder(orderItem.shipment.deliveryOrderNumber)} />
                                </div>
                            }
                            {historyOrder.status === 'cancelled' &&
                                <div className={'ta-r'}>
                                    <ButtonAtom variant="contained" color="secondary"
                                                name={t('label.buyAgain')}
                                                styleView={'btn__default text-transf-cap'}
                                                clicked={() => handleBuyAgain(orderItem, orderItem?.meta?.structure)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
            {actionsCancel !== undefined && actionsCancel !== null && minutesDiff < lastTime &&
                <div className={'ta-r p-16'}>
                    <span
                        className={'pointer fs-16 td-u tx-c'}
                        onClick={handleShowFormCancelOrder}
                    >
                        {t('label.cancelOrder')}
                    </span>
                </div>
            }

        </Suspense>
    )
}

export default OrderDetail;