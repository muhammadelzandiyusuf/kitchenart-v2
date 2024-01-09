import {Grid, OrderCompleted, PaymentAccepted, React, Suspense, WaitingPayment} from "libraries";

const HistoryOrderMenu = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/HistoryOrderMenu'));
const HistoryOrderFilter = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/HistoryOrderFilter'));
const HistoryOrderList = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/HistoryOrderList'));
const HistoryOrderMenuSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderMenuSkeleton'));
const HistoryOrderFilterSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderFilterSkeleton'));
const HistoryOrderListSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderListSkeleton'));

const HistoryOrder = (props) => {
    const { handleDetail, status, handleStatus, handleCompletePayment, handleFilter, day, historyOrders, totalUnpaid,
        totalPaid, totalComplete, totalCancel, search, handleSearch, loading, optionStatus } = props;

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'box-shadow-box border-radius-10px p-32 bgc-white mb-32'}>
                        {loading ? (
                            <HistoryOrderMenuSkeleton column={'four'} />
                        ):(
                            <HistoryOrderMenu
                                ImgWaitingPayment={WaitingPayment}
                                ImgPaymentAccepted={PaymentAccepted}
                                ImgOrderCompleted={OrderCompleted}
                                status={status}
                                handleStatus={handleStatus}
                                totalUnpaid={totalUnpaid}
                                totalPaid={totalPaid}
                                totalComplete={totalComplete}
                                totalCancel={totalCancel}
                            />
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {loading ? (
                        <HistoryOrderFilterSkeleton />
                    ):(
                        <HistoryOrderFilter handleFilter={handleFilter} day={day} search={search} handleSearch={handleSearch} />
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {loading ? (
                        <HistoryOrderListSkeleton />
                    ):(
                        <HistoryOrderList
                            handleDetail={handleDetail}
                            handleCompletePayment={handleCompletePayment}
                            historyOrders={historyOrders}
                            optionStatus={optionStatus}
                        />
                    )}
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default HistoryOrder;