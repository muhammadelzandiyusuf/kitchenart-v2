import {React, Suspense, Skeleton, Grid} from 'libraries';

const PromotionDetailInfoSkeleton = () => {

    return (
        <Suspense fallback={null}>
            <div className={'promotion__detail promotion__info p-24'}>
                <div className={'mb-24'}>
                    <Skeleton variant={'text'} width={'30%'} height={30} className={'ps-rv x-center'} />
                </div>
                <div className={'mb-24'}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'circle'} width={30} height={30} />
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={10}>
                            <Skeleton variant={'text'} width={'100%'} height={30} />
                        </Grid>
                    </Grid>
                </div>
                <div className={'mb-24'}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'circle'} width={30} height={30} />
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={10}>
                            <Skeleton variant={'text'} width={'100%'} height={30} />
                        </Grid>
                    </Grid>
                </div>
                <div className={'mb-24'}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <Skeleton variant={'circle'} width={30} height={30} />
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={10}>
                            <Skeleton variant={'text'} width={'100%'} height={30} />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={'mt-24'}>
                <Skeleton variant={'rect'} width={'100%'} height={60} />
            </div>
        </Suspense>
    );
};

export default PromotionDetailInfoSkeleton;