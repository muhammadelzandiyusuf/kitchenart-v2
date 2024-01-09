import {Breadcrumbs, Grid, Link, NavigateNext, React, Suspense, Typography, useTranslation} from "libraries";

const OrderComplaintList = React.lazy(() => import('components/molecules/DashboardMolecule/OrderComplaint/OrderComplaintList'));
const HistoryOrderListSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderListSkeleton'));
const ProductBreadcrumbsSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductBreadcrumbsSkeleton'));

const OrderComplaintOrganism = (props) => {

    const { loading, orderComplaints, handleDetail, optionStatus } = props;
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
                        <Typography className="breadcrumbs__last fs-18">{t('label.orderComplaints')}</Typography>
                    </Breadcrumbs>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {loading ? (
                        <HistoryOrderListSkeleton />
                    ):(
                        <OrderComplaintList
                            loading={loading}
                            orderComplaints={orderComplaints}
                            handleDetail={handleDetail}
                            optionStatus={optionStatus}
                        />
                    )}
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default OrderComplaintOrganism;