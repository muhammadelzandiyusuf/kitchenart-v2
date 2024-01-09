import {Breadcrumbs, Grid, Link, NavigateNext, React, Suspense, Typography, useTranslation} from "libraries";

const TrackingOrderMolecule = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/TrackingOrder'));
const TrackingOrderSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/TrackingOrderSkeleton'));

const TrackingOrder = (props) => {
    const { loading, handleCopyTrackingNumber, trackingOrder } = props;
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Breadcrumbs className="mb-10" aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
                    <Link className="breadcrumbs__link fs-18" to={"dashboard"}>
                        Dashboard
                    </Link>
                    <Link className="breadcrumbs__link fs-18" to={"/profile/history-order/list"}>
                        {t('label.historyOrder')}
                    </Link>
                    <Link className="breadcrumbs__link fs-18" to={`/profile/history-order/${trackingOrder.package?.orderNumber}`}>
                        {t('label.transactionDetail')}
                    </Link>
                    <Typography className="breadcrumbs__last fs-18">{t('label.trackingOrder')}</Typography>
                </Breadcrumbs>
                {loading ? (
                    <Grid item xs={12} sm={12} lg={12}>
                        <div className={"box-shadow-box border-radius-10px bgc-white mb-32"}>
                            <TrackingOrderSkeleton />
                        </div>
                    </Grid>
                ) : (
                    <div className={"box-shadow-box border-radius-10px bgc-white mb-32"}>
                        <TrackingOrderMolecule
                            handleCopyTrackingNumber={handleCopyTrackingNumber}
                            trackingOrder={trackingOrder}
                        />
                    </div>
                )}
            </Grid>
        </Suspense>
    )
}

export default TrackingOrder;