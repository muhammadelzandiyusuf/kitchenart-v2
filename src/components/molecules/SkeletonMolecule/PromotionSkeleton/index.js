import {React, Suspense, Skeleton, Grid} from 'libraries';

const PromotionSkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'border-cicle--greySlate'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton variant="rect" width={'100%'} height={250} />
                    </Grid>
                    <div className={'p-16 w-100'}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Skeleton variant="text" width={'100%'} height={40} />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Skeleton variant={'circle'} width={40} height={40} />
                            </Grid>
                            <Grid item xs={10} sm={10} md={10} lg={10}>
                                <Skeleton variant="text" width={'100%'} height={40} />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Skeleton variant={'circle'} width={40} height={40} />
                            </Grid>
                            <Grid item xs={10} sm={10} md={10} lg={10}>
                                <Skeleton variant="text" width={'100%'} height={40} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Skeleton variant="text" width={'50%'} height={40} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Skeleton variant="text" width={'100%'} height={80} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </div>
        </Suspense>
    );
};

export default PromotionSkeleton;