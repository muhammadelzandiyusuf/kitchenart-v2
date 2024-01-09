import {Grid, React, Suspense, Skeleton} from 'libraries';

const CartItemSkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'mb-32 border-bottom-mobile'}>
                <Grid container spacing={0}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <div className={'pr-16 pl-16'}>
                            <Skeleton variant={'rect'} width={'100%'} height={150} />
                        </div>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={9}>
                        <Skeleton variant={'text'} width={'30%'} height={40} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                        <Skeleton variant={'text'} width={'30%'} height={40} />
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Skeleton variant={'text'} width={'95%'} height={40} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Skeleton variant={'text'} width={'100%'} height={40} />
                            </Grid>
                        </Grid>
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Skeleton variant={'text'} width={'95%'} height={40} />
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={4}>
                                <Skeleton variant={'text'} width={'95%'} height={40} />
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={4}>
                                <Skeleton variant={'text'} width={'95%'} height={40} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default CartItemSkeleton;