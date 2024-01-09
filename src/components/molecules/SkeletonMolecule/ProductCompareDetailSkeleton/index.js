import {React, Suspense, Grid, Skeleton} from 'libraries';

const ProductCompareDetailSkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'mt-40 w-100'}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={4} lg={3}>
                        <Skeleton variant="rect" width={'100%'} height={250} />
                        <Skeleton variant="text" width={'40%'} height={40} />
                        <Skeleton variant="text" width={'80%'} height={40} />
                        <Skeleton variant="text" width={'50%'} height={40} />
                        <Skeleton variant="text" width={'100%'} height={70} />
                        <Skeleton variant="text" width={'100%'} height={70} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={3}>
                        <Skeleton variant="rect" width={'100%'} height={250} />
                        <Skeleton variant="text" width={'40%'} height={40} />
                        <Skeleton variant="text" width={'80%'} height={40} />
                        <Skeleton variant="text" width={'50%'} height={40} />
                        <Skeleton variant="text" width={'100%'} height={70} />
                        <Skeleton variant="text" width={'100%'} height={70} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={3}>
                        <Skeleton variant="rect" width={'100%'} height={250} />
                        <Skeleton variant="text" width={'40%'} height={40} />
                        <Skeleton variant="text" width={'80%'} height={40} />
                        <Skeleton variant="text" width={'50%'} height={40} />
                        <Skeleton variant="text" width={'100%'} height={70} />
                        <Skeleton variant="text" width={'100%'} height={70} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={3}>
                        <Skeleton variant="rect" width={'100%'} height={250} />
                        <Skeleton variant="text" width={'40%'} height={40} />
                        <Skeleton variant="text" width={'80%'} height={40} />
                        <Skeleton variant="text" width={'50%'} height={40} />
                        <Skeleton variant="text" width={'100%'} height={70} />
                        <Skeleton variant="text" width={'100%'} height={70} />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
}

export default ProductCompareDetailSkeleton;