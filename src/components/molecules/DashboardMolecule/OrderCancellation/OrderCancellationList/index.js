import {Grid, React, Skeleton, Suspense, useTranslation} from "libraries";
import {convertDate} from "utils";

const OrderCancellationList = (props) => {
    const { loading, orderCancellations, handleDetail, statusOption } = props;

    const t = useTranslation();
    const statusType = statusOption?.actions?.POST?.status?.choices;

    return(
        <Suspense fallback={null}>
            {loading ? (
                <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                    <div className={'mb-32 p-48 bgc-white'}>
                        <Grid container spacing={0}>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'mb-32 p-48 bgc-white'}>
                        <Grid container spacing={0}>
                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            ) : (
                orderCancellations.length > 0 ? (
                    orderCancellations.map((orderCancellation, index) => {
                        const created = convertDate(orderCancellation?.created, 'DD MMM yyyy kk:mm:ss');
                        let type = null;
                        if (statusType?.length > 0) {
                            type = statusType.find(item => item.value === orderCancellation?.status);
                        }
                        return(
                            <div className={'box-shadow-box border-radius-10px bgc-white mb-32'} key={index}>
                                <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                            {created}
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={8} lg={8}>
                                            {t('label.cancelOrderId')} : {orderCancellation.cancelRequestId}
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={'p-16 fs-16 tx-c'}>
                                    <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                                        <Grid item xs={8} sm={8} md={8} lg={8}>
                                            {t('label.orderNumber')} : {orderCancellation.order.orderNumber}
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4} className={"ta-c"}>
                                            {type?.displayName}
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={'p-16 fs-16 tx-c'}>
                                    <Grid container spacing={2} direction="row" justifycontent="center" alignItems="center">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className={'td-u pointer ta-r'}
                                                 onClick={() => handleDetail(orderCancellation.cancelRequestId)}>
                                                {t('label.seeDetail')}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className={'mb-32 p-48 bgc-white'}>
                        <div className={'fs-24 ta-c tx-c fw-400'}>{t('label.noCancelled')}</div>
                    </div>
                )
            )}
        </Suspense>
    )
}

export default OrderCancellationList;