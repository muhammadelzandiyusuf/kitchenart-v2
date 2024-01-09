import {Grid, React, Skeleton, Suspense, useTranslation} from "libraries";

const OrderCancellationReason = (props) => {
    const { loading, orderCancellation } = props;
    const t = useTranslation();
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
                                    {t('label.cancelDetail')}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={'p-16 fs-16 tx-c'}>
                    <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {t('label.cancelReason')} :
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={"mt-20 mb-32"}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {orderCancellation.reason}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Suspense>
    )
}

export default OrderCancellationReason;