import {React, Suspense, Grid, Skeleton} from 'libraries';

const TradeInSubmissionSkeleton = (props) => {

    const list = (
        <Suspense fallback={null}>
            <div className={'p-16'}>
                <Grid container spacing={2}>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton variant={'rect'} width={'100%'} height={80} />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton variant={'text'} width={'100%'} height={50} />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton variant={'text'} width={'100%'} height={50} />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );

    const detail = (
        <Suspense fallback={null}>
            <div className={'bgc-white border-radius-10px box-shadow-box'}>
                <div className={'p-16'}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'rect'} width={'100%'} height={80} />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'text'} width={'100%'} height={50} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'text'} width={'100%'} height={50} />
                        </Grid>
                    </Grid>
                    <div className={'border-bottom-2px'}>
                        <Grid container spacing={2}>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <Skeleton variant={'text'} width={'100%'} height={40} />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Skeleton variant={'text'} width={'100%'} height={40} />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Skeleton variant={'text'} width={'100%'} height={40} />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Skeleton variant={'text'} width={'100%'} height={40} />
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container spacing={2} direction="row" justifycontent="center" alignItems="center">
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'rect'} width={'100%'} height={80} />
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'rect'} width={'100%'} height={80} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Suspense>
    );

    switch (props.type) {
        case 'list':
            return list;
        case 'detail':
            return detail;
        default:
            return list;
    };
};

export default TradeInSubmissionSkeleton;