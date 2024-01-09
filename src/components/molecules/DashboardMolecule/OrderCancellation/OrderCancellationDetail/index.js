import {EmptyProduct, Grid, NumberFormat, React, Skeleton, Suspense, useTranslation} from "libraries";
import {convertDate} from "utils";

const OrderCancellationDetail = (props) => {
    const { loading, orderCancellation, orders, statusOrderOption, statusOption } = props;

    const t = useTranslation();

    const created = convertDate(orderCancellation?.created, 'DD MMM yyyy kk:mm:ss');
    const statusType = statusOption?.actions?.POST?.status?.choices;
    const statusOrderType = statusOrderOption?.actions?.POST?.status?.choices;
    let statusOrderCancel = null;
    if (statusType?.length > 0) {
        statusOrderCancel = statusType.find(item => item.value === orderCancellation?.status);
    }

    return(
        <Suspense fallback={null}>
            <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                <div className={'p-16 fs-16 border-bottom-2px'}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {t('label.orderDetail')}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                    <Grid container spacing={0}>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {created}
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={3} sm={3} md={5} lg={5}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {t('label.cancelOrderId')} : {orderCancellation.cancelRequestId}
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={3} sm={3} md={2} lg={2}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {orders.payment.paymentMethod.type}
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={3} sm={3} md={2} lg={2}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div className={"ta-c"}>
                                    {statusOrderCancel?.displayName}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                {orders.lineItems?.map((orderItem, index) => {
                    const imageProduct = orderItem?.productImage;
                    let statusOrder = null;
                    if (statusOrderType?.length > 0) {
                        statusOrder = statusOrderType.find(item => item.value === orderItem?.status);
                    }

                    return(
                        <div className={'p-16 fs-16 tx-c'} key={index}>
                            <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {loading ? (
                                        <Skeleton variant={'text'} width={'80%'} height={40}/>
                                    ) : (
                                        <img src={imageProduct !== null ? imageProduct : EmptyProduct}
                                             alt={"img-product"} className={'w-100'} />
                                    )}
                                </Grid>
                                <Grid item xs={4} sm={4} md={3} lg={3}>
                                    <div className={'ml-16'}>
                                        {loading ? (
                                            <Skeleton variant={'text'} width={'80%'} height={40}/>
                                        ) : (
                                            <div>
                                                <div className={'fw-400'}>{orderItem?.productBrand}</div>
                                                {`
                                                    ${orderItem?.productName}
                                                    ${orderItem?.productCode}
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
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={3} sm={3} md={2} lg={2}>
                                    {loading ? (
                                        <Skeleton variant={'text'} width={'80%'} height={40}/>
                                    ) : (
                                        <div className={"ta-c"}>
                                            {orderItem?.quantity} item
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={3} sm={3} md={3} lg={3} className={"ta-c"}>
                                    {loading ? (
                                        <Skeleton variant={'text'} width={'80%'} height={40}/>
                                    ) : (
                                        <div>
                                            {statusOrder?.displayName}
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                    {loading ? (
                                        <Skeleton variant={'text'} width={'80%'} height={40}/>
                                    ) : (
                                        <div className={'ta-c border-left pt-40 pb-40'}>
                                            Total <br />
                                            <NumberFormat value={orderItem.price}
                                                          displayType={'text'}
                                                          thousandSeparator={true}
                                                          prefix={'Rp '}
                                                          decimalScale={0}
                                            />
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    )
                })}
                <div className={'p-16 fs-16 tx-c'}>
                    <Grid container spacing={2} direction="row" justifycontent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'td-u ta-r'}>
                                {loading ? (
                                    <Skeleton variant={'text'} width={'80%'} height={40}/>
                                ) : (
                                    <span className={"pointer"}>{t('label.contactUs')}</span>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Suspense>
    )
}

export default OrderCancellationDetail;