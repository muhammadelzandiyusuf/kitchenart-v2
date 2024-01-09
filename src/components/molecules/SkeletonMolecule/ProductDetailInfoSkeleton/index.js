import {React, Suspense, Skeleton, Grid} from 'libraries';

const ProductDetailInfoSkeleton = () => {

    return (
        <Suspense fallback={null}>
            <div className="product__detail__info">
                <Skeleton type={'text'} width={'30%'} height={40} />
                <Skeleton type={'text'} width={'100%'} height={40} />
                <Skeleton type={'text'} width={'35%'} height={40} />
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Skeleton type={'text'} width={'95%'} height={40} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Skeleton type={'text'} width={'95%'} height={40} />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton type={'text'} width={'25%'} height={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton type={'text'} width={'95%'} height={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton type={'text'} width={'95%'} height={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton type={'text'} width={'95%'} height={40} />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Skeleton type={'text'} width={'95%'} height={60} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Skeleton type={'text'} width={'95%'} height={40} />
                        <Skeleton type={'text'} width={'95%'} height={20} />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton type={'text'} width={'25%'} height={40} />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton type={'rect'} width={'95%'} height={40} />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton type={'rect'} width={'95%'} height={40} />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Skeleton type={'rect'} width={'95%'} height={40} />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton type={'text'} width={'25%'} height={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton type={'rect'} width={'95%'} height={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton type={'rect'} width={'95%'} height={40} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Skeleton type={'rect'} width={'95%'} height={40} />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton type={'rect'} width={'65%'} height={70} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton type={'rect'} width={'65%'} height={70} />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton type={'text'} width={'45%'} height={40} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton type={'text'} width={'75%'} height={40} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton type={'text'} width={'45%'} height={40} />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default ProductDetailInfoSkeleton;