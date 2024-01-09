import {Breadcrumbs, Grid, Link, NavigateNext, React, Suspense, Typography, useTranslation} from "libraries";

const OrderDetail = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/OrderDetail'));
const TransactionDetail = React.lazy(() => import('components/molecules/DashboardMolecule/TransactionDetail'));
const DeliveryDetail = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/DeliveryDetail'));
const OrderCommplaint = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/OrderComplaint'));
const FormCancelOrder = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/FormCancelOrder'));
const FormCancelSuccess = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/FormCancelSuccess'));
const ProductBreadcrumbsSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductBreadcrumbsSkeleton'));
const HistoryOrderListSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderListSkeleton'));

const HistoryOrderDetail = (props) => {

    const { handleTrackingOrder, handleCompletePayment, historyOrder, loading, handleProductReview,
        handleCloseOrderComplaint, handleShowOrderComplaint, openOrderComplaint, handleUploadImage, photoComplaint,
        handleSubmitComplaint, buttonLoading, href, formCancelOrder, handleShowFormCancelOrder, handleSubmitFormCancel,
        condition, handleChangeCondition, handleShowFormCancelOrderSuccess, formCancelOrderSuccess, optionStatus,
        handleBuyAgain} = props;
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                {loading ? (
                    <ProductBreadcrumbsSkeleton />
                ):(
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />} className={'mb-24'}>
                        <Link className="breadcrumbs__link fs-18" to={"dashboard"}>
                            Dashboard
                        </Link>
                        <Link className="breadcrumbs__link fs-18" to={"/profile/history-order"}>
                            {t('label.historyOrder')}
                        </Link>
                        <Typography className="breadcrumbs__last fs-18">{t('label.transactionDetail')}</Typography>
                    </Breadcrumbs>
                )}
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                        {loading ? (
                            <HistoryOrderListSkeleton />
                        ):(
                            <OrderDetail
                                handleTrackingOrder={handleTrackingOrder}
                                historyOrder={historyOrder}
                                handleProductReview={handleProductReview}
                                handleShowOrderComplaint={handleShowOrderComplaint}
                                handleShowFormCancelOrder={handleShowFormCancelOrder}
                                optionStatus={optionStatus}
                                handleBuyAgain={handleBuyAgain}
                            />
                        )}
                        <OrderCommplaint
                            openOrderComplaint={openOrderComplaint}
                            handleCloseOrderComplaint={handleCloseOrderComplaint}
                            handleUploadImage={handleUploadImage}
                            photoComplaint={photoComplaint}
                            handleSubmitComplaint={handleSubmitComplaint}
                            buttonLoading={buttonLoading}
                            href={href}
                        />
                        <FormCancelOrder
                            formCancelOrder={formCancelOrder}
                            handleShowFormCancelOrder={handleShowFormCancelOrder}
                            handleSubmitFormCancel={handleSubmitFormCancel}
                            handleChangeCondition={handleChangeCondition}
                            condition={condition}
                            buttonLoading={buttonLoading}
                        />
                        <FormCancelSuccess
                            formCancelOrderSuccess={formCancelOrderSuccess}
                            handleShowFormCancelOrderSuccess={handleShowFormCancelOrderSuccess}
                        />
                    </div>
                </Grid>
                {historyOrder.status === 'unpaid' ? (
                    <Grid item xs={12} sm={12} lg={12}>
                        <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} lg={12}>
                                    <TransactionDetail
                                        handleCompletePayment={handleCompletePayment}
                                        historyOrder={historyOrder}
                                        loading={loading} />
                                    <DeliveryDetail historyOrder={historyOrder} loading={loading} />
                                    <div className={'ta-r fs-16 p-16 tx-c'}>
                                        <a href={`${process.env.REACT_APP_API_URL}core/order/${historyOrder.orderNumber}/invoice/`}
                                           target={'_blank'}
                                           rel="noreferrer"
                                           className={'td-u pointer mr-16 tx-c'}>Download Invoice</a>
                                        <a href="https://wa.me/6282211995022"
                                           target={'_blank'}
                                           rel="noreferrer"
                                           className={'td-u pointer tx-c'}>{t('label.contactUs')}</a>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                ) : (
                    <Grid item xs={12} sm={12} lg={12}>
                        <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} lg={12}>
                                    <DeliveryDetail historyOrder={historyOrder} loading={loading} />
                                    <TransactionDetail historyOrder={historyOrder} loading={loading} />
                                    <div className={'ta-r fs-16 p-16 tx-c'}>
                                        <a href={`${process.env.REACT_APP_API_URL}core/order/${historyOrder.orderNumber}/invoice/`}
                                           target={'_blank'}
                                           rel="noreferrer"
                                           className={'td-u pointer mr-16 tx-c'}>Download Invoice</a>
                                        <a href="https://wa.me/6282211995022"
                                           target={'_blank'}
                                           rel="noreferrer"
                                           className={'td-u pointer tx-c'}>{t('label.contactUs')}</a>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                )}
            </Grid>
        </Suspense>
    )
}

export default HistoryOrderDetail;