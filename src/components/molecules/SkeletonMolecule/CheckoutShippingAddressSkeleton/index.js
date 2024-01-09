import {React, Suspense, Grid, Skeleton} from 'libraries';

const CheckoutShippingAddressSkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0} direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Skeleton variant="text" width={'30%'} height={40} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Skeleton variant="text" width={'40%'} height={40} />
                    <Skeleton variant="text" width={'30%'} height={40} />
                    <Skeleton variant="text" width={'100%'} height={40} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Skeleton variant="rect" width={'40%'} height={50} className={'mb-24'} />
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default CheckoutShippingAddressSkeleton;