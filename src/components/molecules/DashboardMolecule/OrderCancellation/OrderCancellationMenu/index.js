import {Badge, Grid, React, Skeleton, Suspense, useTranslation} from "libraries";

const OrderCancellationMenu = (props) => {
    const { loading, CancelApprove, CancelProcess, CancelReject, totalApprove, handleStatus, status, totalDecline,
        totalPending } = props;
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            {loading ? (
                <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                    <div className={'p-24 bgc-white'}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'mb-32 bgc-white'}>
                        <Grid container spacing={0}>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <div className={'ta-c p-24'}>
                                    <Skeleton variant={'rect'} width={'100%'} height={100}/>
                                    <Skeleton variant={'text'} width={'100%'} height={40}/>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <div className={'ta-c p-24'}>
                                    <Skeleton variant={'rect'} width={'100%'} height={100}/>
                                    <Skeleton variant={'text'} width={'100%'} height={40}/>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <div className={'ta-c p-24'}>
                                    <Skeleton variant={'rect'} width={'100%'} height={100}/>
                                    <Skeleton variant={'text'} width={'100%'} height={40}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            ) : (
                <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                    <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                {t('label.cancellationHistory')}
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'menu pt-16 fs-16 tx-c'}>
                        <Grid container spacing={5}>
                            <Grid item xs={4} sm={4} md={4} lg={4} onClick={() => handleStatus('pending')}>
                                <div className={`ta-c menu-list pointer ${status === 'pending' && 'bgc-pink'}`}>
                                    <Badge color="secondary" badgeContent={totalPending}
                                           invisible={totalPending > 0 ? false : true}>
                                        <img src={CancelProcess} className="h-60" alt="cancel-processed" />
                                    </Badge>
                                    <div className={'fs-16 tx-c mt-16'}>
                                        {t('label.cancelProcessed')}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} onClick={() => handleStatus('approved')}>
                                <div className={`ta-c menu-list pointer ${status === 'approved' && 'bgc-pink'}`}>
                                    <Badge color="secondary" badgeContent={totalApprove}
                                           invisible={totalApprove > 0 ? false : true}>
                                        <img src={CancelApprove} className="h-60" alt="cancel-approve" />
                                    </Badge>
                                    <div className={'fs-16 tx-c mt-16'}>
                                        {t('label.cancelApproved')}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}  onClick={() => handleStatus('decline')}>
                                <div className={`ta-c menu-list pointer ${status === 'decline' && 'bgc-pink'}`}>
                                    <Badge color="secondary" badgeContent={totalDecline}
                                           invisible={totalDecline > 0 ? false : true}>
                                        <img src={CancelReject} className="h-60" alt="cancel-rejected" />
                                    </Badge>
                                    <div className={'fs-16 tx-c mt-16'}>
                                        {t('label.cancelRejected')}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )}
        </Suspense>
    )
}

export default OrderCancellationMenu;