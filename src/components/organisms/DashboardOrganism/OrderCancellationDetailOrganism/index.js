import {Grid, React, Suspense} from "libraries";

const OrderCancellationBreadcrumb = React.lazy(() =>
    import('components/molecules/DashboardMolecule/OrderCancellation/OrderCancellationBreadcrumb'));
const OrderCancellationDetail = React.lazy(() =>
    import('components/molecules/DashboardMolecule/OrderCancellation/OrderCancellationDetail'));
const OrderCancellationReason = React.lazy(() =>
    import('components/molecules/DashboardMolecule/OrderCancellation/OrderCancellationReason'));

const OrderCancellationDetailOrganism = (props) => {
    const { loading, orderCancellation, orders, statusOption, statusOrderOption } = props;

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <OrderCancellationBreadcrumb />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <OrderCancellationDetail
                        loading={loading}
                        orderCancellation={orderCancellation}
                        orders={orders}
                        statusOption={statusOption}
                        statusOrderOption={statusOrderOption}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <OrderCancellationReason loading={loading} orderCancellation={orderCancellation} />
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default OrderCancellationDetailOrganism;