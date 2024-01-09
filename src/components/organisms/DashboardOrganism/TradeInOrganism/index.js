import {React, Suspense, Grid, useTranslation, Skeleton} from 'libraries';

const TradeInHistory = React.lazy(() => import('components/molecules/DashboardMolecule/TradeIn/TradeInHistory'));
const TradeInSubmission = React.lazy(() => import('components/molecules/DashboardMolecule/TradeIn/TradeInSubmission'));
const TradeInDetail = React.lazy(() => import('components/molecules/DashboardMolecule/TradeIn/TradeInDetail'));
const ProductCart = React.lazy(() => import('components/molecules/ProductMolecule/ProductCart'));
const HistoryOrderMenuSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/HistoryOrderMenuSkeleton'));
const TradeInSubmissionSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/TradeInSubmissionSkeleton'));

const TradeInOrganism = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {props.loading ? (
                        <div className={'mb-32'}>
                            <Skeleton variant={'rect'} width={'100%'} height={100} />
                        </div>
                    ):(
                        <div className={'bgc-pink border-color-primary tx-c p-24 fs-18 box-sizing-border mb-32'}>
                            {t('message.makeTradeInPromo')}
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'bgc-white border-radius-10px box-shadow-box mb-32'}>
                        <div className={'p-16 border-bottom-2px fs-18 fw-400'}>
                            {props.loading ? (
                                <Skeleton variant={'text'} width={'25%'} height={40} />
                            ):(
                                t('label.historyTradeIn')
                            )}
                        </div>
                        {props.loading ? (
                            <HistoryOrderMenuSkeleton column={'three'} />
                        ):(
                            <TradeInHistory
                                status={props.status}
                                types={props.types}
                                handleChangeHistory={props.handleChangeHistory}
                                countStatus={props.countStatus}
                            />
                        )}
                    </div>
                </Grid>
                {props.params?.code === undefined ? (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={'bgc-white border-radius-10px box-shadow-box'}>
                            <div className={'p-16 border-bottom-2px fs-18 fw-400'}>
                                {props.loading ? (
                                    <Skeleton variant={'text'} width={'25%'} height={40} />
                                ):(
                                    t('label.submissionTradeIn')
                                )}
                            </div>
                            {props.loading ? (
                                <TradeInSubmissionSkeleton type={'list'} />
                            ):(
                                <TradeInSubmission
                                    tradein={props.tradein}
                                    status={props.status}
                                    handleAddToCart={props.handleAddToCart}
                                    handleToTradeInDetail={props.handleToTradeInDetail}
                                />
                            )}
                        </div>
                    </Grid>
                ):(
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {props.loading ? (
                            <TradeInSubmissionSkeleton type={'detail'} />
                        ):(
                            <TradeInDetail
                                handleBack={props.handleBack}
                                tradeinDetail={props.tradeinDetail}
                            />
                        )}
                    </Grid>
                )}
            </Grid>
            <ProductCart
                open={props.openCart}
                handleCloseCart={props.handleCloseCart}
                productAddCart={props.productAddCart}
                handleUrl={props.handleUrl}
                handleToCart={props.handleToCart}
            />
        </Suspense>
    );
};

export default TradeInOrganism;