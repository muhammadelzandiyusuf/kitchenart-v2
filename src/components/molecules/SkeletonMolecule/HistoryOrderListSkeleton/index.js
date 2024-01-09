import {React, Suspense, Grid, Skeleton} from 'libraries';

const HistoryOrderListSkeleton = () => {

    return (
        <Suspense fallback={null}>
            <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                <div className={'border-bottom-2px p-16'}>
                    <Grid container spacing={2}>
                        <Grid item xs={5} sm={3} md={3} lg={3}>
                            <Skeleton variant={'text'} width={'100'} height={40} />
                        </Grid>
                        <Grid item xs={7} sm={5} md={4} lg={4}>
                            <Skeleton variant={'text'} width={'100'} height={40} />
                        </Grid>
                        <Grid item xs={4} sm={2} md={2} lg={2}>
                            <Skeleton variant={'text'} width={'100'} height={40} />
                        </Grid>
                        <Grid item xs={8} sm={3} md={3} lg={3}>
                            <Skeleton variant={'text'} width={'100'} height={40} />
                        </Grid>
                    </Grid>
                </div>
                <div className={'p-16'}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'rect'} width={'100'} height={100} />
                        </Grid>
                        <Grid item xs={4} sm={4} md={3} lg={3}>
                            <Skeleton variant={'text'} width={'50'} height={40} />
                            <Skeleton variant={'text'} width={'100'} height={40} />
                            <Skeleton variant={'text'} width={'100'} height={40} />
                        </Grid>
                        <Grid item xs={3} sm={3} md={2} lg={2}>
                            <Skeleton variant={'text'} width={'100'} height={40} />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <Skeleton variant={'text'} width={'100'} height={40} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} lg={2}>
                            <Skeleton variant={'text'} width={'100'} height={40} />
                            <Skeleton variant={'text'} width={'70'} height={40} />
                        </Grid>
                    </Grid>
                </div>
                <div className={'p-16'}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Skeleton variant={'rect'} width={'20'} height={40} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Suspense>
    );
};

export default HistoryOrderListSkeleton;