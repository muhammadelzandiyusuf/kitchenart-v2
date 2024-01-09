import {React, Suspense, Grid, Skeleton} from 'libraries';

const CheckoutPromoSkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'box-shadow-type-one p-24'}>
                <Grid container spacing={0} direction="row"
                      justify="center"
                      alignItems="center">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton variant="text" width={'40%'} height={40} />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                        <Skeleton variant="rect" width={'80%'} height={25} />
                    </Grid>
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Skeleton variant="text" width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                        <Skeleton variant="rect" width={'80%'} height={25} />
                    </Grid>
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Skeleton variant="text" width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                        <Skeleton variant="rect" width={'80%'} height={25} />
                    </Grid>
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Skeleton variant="text" width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                        <Skeleton variant="rect" width={'80%'} height={25} />
                    </Grid>
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Skeleton variant="text" width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={9}>
                        <Skeleton variant="rect" width={'95%'} height={30} />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <Skeleton variant="rect" width={'100%'} height={30} />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default CheckoutPromoSkeleton;