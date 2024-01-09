import {Grid, React, Suspense} from "libraries";

const OrderCancellationInfo = React.lazy(() =>
    import('components/molecules/DashboardMolecule/OrderCancellation/OrderCancellationInfo'));
const OrderCancellationMenu = React.lazy(() =>
    import('components/molecules/DashboardMolecule/OrderCancellation/OrderCancellationMenu'));
const OrderCancellationFilter = React.lazy(() =>
    import('components/molecules/DashboardMolecule/OrderCancellation/OrderCancellationFilter'));
const OrderCancellationList = React.lazy(() =>
    import('components/molecules/DashboardMolecule/OrderCancellation/OrderCancellationList'));

const OrderCancellationOrganism = (props) => {
    const { loading, orderCancellations, handleDetail, handleStatus, status, CancelApprove, CancelReject,
        CancelProcess, totalApprove, totalDecline, totalPending, handleSearch, statusOption } = props;

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <OrderCancellationInfo />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <OrderCancellationMenu
                        loading={loading}
                        handleStatus={handleStatus}
                        status={status}
                        CancelApprove={CancelApprove}
                        CancelProcess={CancelProcess}
                        CancelReject={CancelReject}
                        totalPending={totalPending}
                        totalApprove={totalApprove}
                        totalDecline={totalDecline}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <OrderCancellationFilter loading={loading} handleSearch={handleSearch} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <OrderCancellationList
                        loading={loading}
                        orderCancellations={orderCancellations}
                        handleDetail={handleDetail}
                        statusOption={statusOption}
                    />
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default OrderCancellationOrganism;