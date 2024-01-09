import {Breadcrumbs, Grid, Link, NavigateNext, React, Suspense, Typography, useTranslation} from "libraries";

const OrderComplaintDetail = React.lazy(() => import('components/molecules/DashboardMolecule/OrderComplaint/OrderComplaintDetail'));
const HistoryOrderListSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderListSkeleton'));
const ProductBreadcrumbsSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductBreadcrumbsSkeleton'));

const OrderComplaintDetailOrganism = (props) => {

    const { loading, orderComplaint, optionStatus } = props;
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                {loading ? (
                    <ProductBreadcrumbsSkeleton />
                ):(
                    <Breadcrumbs className="mb-10" aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
                        <Link className="breadcrumbs__link fs-18" to={"dashboard"}>
                            Dashboard
                        </Link>
                        <Link className="breadcrumbs__link fs-18" to={"/profile/order-complaint"}>
                            {t('label.orderComplaints')}
                        </Link>
                        <Typography className="breadcrumbs__last fs-18">{t('label.complaintDetail')}</Typography>
                    </Breadcrumbs>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {loading ? (
                        <>
                            <HistoryOrderListSkeleton />
                            <HistoryOrderListSkeleton />
                        </>
                    ):(
                        <OrderComplaintDetail
                            loading={loading}
                            orderComplaint={orderComplaint}
                            optionStatus={optionStatus}
                        />
                    )}
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default OrderComplaintDetailOrganism;