import {Grid, React, Suspense, useTranslation, Badge} from "libraries";

const HistoryOrderMenu = (props) => {
    const { ImgWaitingPayment, ImgPaymentAccepted, ImgOrderCompleted, status, handleStatus, totalUnpaid, totalPaid,
        totalComplete, totalCancel } = props;

    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={3} sm={3} lg={3} onClick={() => handleStatus("unpaid")}
                      className={`pointer ${status === "unpaid" && "bgc-pink"}`}>
                    <div className={'ta-c p-24'}>
                        <Badge color="secondary" badgeContent={totalUnpaid} invisible={totalUnpaid > 0 ? false : true}>
                            <img src={ImgWaitingPayment} className="h-60" alt="waiting-payment" />
                        </Badge>
                        <div className={'fs-16 fw-400 tx-c mt-16'}>{t('label.waitingPayment')}</div>
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} lg={3} onClick={() => handleStatus("paid")}
                      className={`pointer ${status === "paid" && "bgc-pink"}`}>
                    <div className={'ta-c p-24'}>
                        <Badge color="secondary" badgeContent={totalPaid} invisible={totalPaid > 0 ? false : true}>
                            <img src={ImgPaymentAccepted} className="h-60" alt="payment-accepted" />
                        </Badge>
                        <div className={'fs-16 fw-400 tx-c mt-16'}>{t('label.paymentAccepted')}</div>
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} lg={3} onClick={() => handleStatus("completed")}
                      className={`pointer ${status === "completed" && "bgc-pink"}`}>
                    <div className={'ta-c p-24'}>
                        <Badge color="secondary" badgeContent={totalComplete} invisible={totalComplete > 0 ? false : true}>
                            <img src={ImgOrderCompleted} className="h-60" alt="order-completed" />
                        </Badge>
                        <div className={'fs-16 fw-400 tx-c mt-16'}>{t('label.orderCompleted')}</div>
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} lg={3} onClick={() => handleStatus("cancelled")}
                      className={`pointer ${status === "cancelled" && "bgc-pink"}`}>
                    <div className={'ta-c p-24'}>
                        <Badge color="secondary" badgeContent={totalCancel} invisible={totalCancel > 0 ? false : true}>
                            <img src={ImgPaymentAccepted} className="h-60" alt="order-cancelled" />
                        </Badge>
                        <div className={'fs-16 fw-400 tx-c mt-16'}>{t('label.orderCanceled')}</div>
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default HistoryOrderMenu;