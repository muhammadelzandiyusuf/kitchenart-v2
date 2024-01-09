import {React, Suspense, Skeleton, Grid} from 'libraries';

const CartShoppingSummarySkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'cart__summary p-16'}>
                <Skeleton variant="text" width={'50%'} height={40} />
                <Grid container spacing={0}>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <Skeleton variant="text" width={'90%'} height={40} />
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <Skeleton variant="text" width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <Skeleton variant="text" width={'90%'} height={40} />
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <Skeleton variant="text" width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={'border-bottom mt-16'}></div>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <Skeleton variant="text" width={'50%'} height={40} />
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <Skeleton variant="text" width={'100%'} height={40} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton variant="text" width={'100%'} height={80} />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default CartShoppingSummarySkeleton;