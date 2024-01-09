import {React, Suspense, Grid, Skeleton} from 'libraries';

const CheckoutShippingInsuranceSkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Skeleton variant="text" width={'90%'} height={40} />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Skeleton variant="text" width={'100%'} height={40} />
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default CheckoutShippingInsuranceSkeleton;