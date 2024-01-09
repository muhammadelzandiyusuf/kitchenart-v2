import {React, Suspense, Grid, Skeleton} from 'libraries';

const PromotionDetailSkeleton = () => {

    return (
        <Suspense fallback={null}>
            <div className={'mb-32'}>
                <Grid container spacing={2}>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </Grid>
                </Grid>
            </div>
            <div className={'promotion__detail mb-100'}>
                <Skeleton variant={'rect'} width={'100%'} height={400} />
                <div className={'bgc-white p-24'}>
                    <div className={'mb-32'}>
                        <Skeleton variant={'text'} width={'100%'} height={50} />
                    </div>
                    <Skeleton variant={'text'} width={'30%'} height={50} />
                    <Skeleton variant={'text'} width={'100%'} height={50} />
                </div>
            </div>
        </Suspense>
    );
};

export default PromotionDetailSkeleton;