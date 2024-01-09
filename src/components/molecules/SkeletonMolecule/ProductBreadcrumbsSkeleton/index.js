import {React, Suspense, Grid, Skeleton} from 'libraries';

const ProductBreadcrumbsSkeleton = () => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    <Skeleton type={'text'} width={'95%'} height={40} />
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    <Skeleton type={'text'} width={'95%'} height={40} />
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    <Skeleton type={'text'} width={'95%'} height={40} />
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default ProductBreadcrumbsSkeleton;