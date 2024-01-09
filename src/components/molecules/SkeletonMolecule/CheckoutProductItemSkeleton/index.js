import {React, Suspense, Grid, Skeleton} from 'libraries';

const CheckoutProductItemSkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Skeleton variant="text" width={'20%'} height={40} />
                </Grid>
                <Grid item xs={3} sm={3} md={2} lg={2}>
                    <Skeleton variant="rect" width={'90%'} height={100} />
                </Grid>
                <Grid item xs={9} sm={9} md={10} lg={10}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Skeleton variant="text" width={'30%'} height={40} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Skeleton variant="text" width={'90%'} height={40} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Skeleton variant="text" width={'80%'} height={40} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Skeleton variant="text" width={'50%'} height={40} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Skeleton variant="text" width={'50%'} height={40} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Skeleton variant="text" width={'30%'} height={40} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default CheckoutProductItemSkeleton;