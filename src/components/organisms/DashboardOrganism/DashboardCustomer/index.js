import {React, Suspense, Grid, useTranslation, WaitingPayment, PaymentAccepted, OrderCompleted, Skeleton} from 'libraries';

const DashboardAnnouncement = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardAnnouncement'));
const DashboardPromo = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardPromo'));
const DashboardBoxProduct = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardBoxProduct'));
const HistoryOrderMenu = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/HistoryOrderMenu'));
const HistoryOrderList = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/HistoryOrderList'));
const HistoryOrderMenuSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderMenuSkeleton'));
const HistoryOrderListSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderListSkeleton'));

const DashboardCustomer = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            {props.loading ? (
                <div className={'border-cicle--greySlate p-24'}>
                    <Skeleton variant={'text'} width={'100%'} height={40} />
                    <Skeleton variant={'text'} width={'100%'} height={40} />
                    <Skeleton variant={'text'} width={'100%'} height={40} />
                    <Skeleton variant={'text'} width={'100%'} height={40} />
                    <Skeleton variant={'text'} width={'100%'} height={40} />
                </div>
            ):(
                <DashboardAnnouncement
                    announcements={props.announcements}
                />
            )}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <DashboardPromo
                        promo={props.countPromo}
                        loading={props.loading}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <div className={'bgc-white border-radius-10px box-shadow-box mt-24'}>
                        <div className={'p-16 border-bottom fs-18 fw-400'}>
                            {props.loading ? (
                                <Skeleton variant={'text'} width={'50%'} height={40} />
                            ):(
                                t('label.historyOrder')
                            )}
                        </div>
                        <div className={'p-16'}>
                            {props.loading ? (
                                <HistoryOrderMenuSkeleton column={'four'} />
                            ):(
                                <HistoryOrderMenu
                                    ImgWaitingPayment={WaitingPayment}
                                    ImgPaymentAccepted={PaymentAccepted}
                                    ImgOrderCompleted={OrderCompleted}
                                    status={props.status}
                                    handleStatus={props.handleStatus}
                                    totalUnpaid={props.totalUnpaid}
                                    totalPaid={props.totalPaid}
                                    totalComplete={props.totalComplete}
                                    totalCancel={props.totalCancel}
                                />
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'bgc-white border-radius-10px box-shadow-box'}>
                        <div className={'p-16 border-bottom fs-18 fw-400'}>
                            <Grid container spacing={0}>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    {props.loading ? (
                                        <Skeleton variant={'text'} width={'50%'} height={40} />
                                    ):(
                                        t('label.historyOrder')
                                    )}
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    {props.loading ? (
                                        <Skeleton variant={'text'} width={'50%'} height={40} className={'fl-r'} />
                                    ):(
                                        <div className={'fw-none ta-r pointer'} onClick={() => props.handleSeeMore('/profile/history-order')}>
                                            {t('label.seeMore')}
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                        {props.loading ? (
                            <HistoryOrderListSkeleton />
                        ):(
                            <HistoryOrderList
                                handleDetail={props.handleDetail}
                                handleCompletePayment={props.handleCompletePayment}
                                historyOrders={props.historyOrders}
                                optionStatus={props.optionStatus}
                            />
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <DashboardBoxProduct
                        products={props.wishlists}
                        productHistory={null}
                        titleName={t('label.wishlist')}
                        handleSeeMore={props.handleSeeMore}
                        href={'wishlist'}
                        loading={props.loading}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <DashboardBoxProduct
                        products={props.products}
                        productHistory={props.productHistory}
                        titleName={t('label.recentlyViewed')}
                        handleSeeMore={props.handleSeeMore}
                        href={'product-history'}
                        loading={props.loading}
                    />
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default DashboardCustomer