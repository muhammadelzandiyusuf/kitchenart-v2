import {React, Suspense, Grid, Skeleton} from 'libraries';

const ProductImageSlideSkeletonHorizontal = () => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={21}>
                    <Skeleton type={'rect'} width={'100%'} height={300} />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Skeleton type={'rect'} width={'100%'} height={100} />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Skeleton type={'rect'} width={'100%'} height={100} />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <Skeleton type={'rect'} width={'100%'} height={100} />
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default ProductImageSlideSkeletonHorizontal;