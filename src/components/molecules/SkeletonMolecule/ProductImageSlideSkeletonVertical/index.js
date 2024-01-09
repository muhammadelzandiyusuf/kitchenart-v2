import {React, Suspense, Grid, Skeleton} from 'libraries';

const ProductImageSlideSkeletonVertical = () => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <Skeleton type={'rect'} width={'95%'} height={100} />
                    <Skeleton type={'rect'} width={'95%'} height={100} />
                    <Skeleton type={'rect'} width={'95%'} height={100} />
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                    <Skeleton type={'rect'} width={'100%'} height={700} className={'ps-rv'} style={{top: '-153px'}} />
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default ProductImageSlideSkeletonVertical;