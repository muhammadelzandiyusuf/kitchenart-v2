import {Grid, React, Skeleton, Suspense} from "libraries";

const TrackingOrderSkeleton = () => {
    return(
        <Suspense fallback={null}>
            <div className={"fs-18 fw-b p-16"}>
                <Skeleton variant={'text'} width={100} height={40} />
            </div>
            <div className={"fs-16 ml-32"}>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={2} lg={2}>
                        <Skeleton variant={'text'} width={100} height={40} />
                    </Grid>
                    <Grid item xs={6} sm={10} lg={10}>
                        <Skeleton variant={'text'} width={100} height={40} />
                    </Grid>
                    <Grid item xs={6} sm={2} lg={2}>
                        <Skeleton variant={'text'} width={100} height={40} />
                    </Grid>
                    <Grid item xs={6} sm={10} lg={10}>
                        <div className={"mb-10"}>
                            <Skeleton variant={'text'} width={100} height={40} />
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={2} lg={2}>
                        <Skeleton variant={'text'} width={100} height={40} />
                    </Grid>
                    <Grid item xs={6} sm={10} lg={10}>
                        <Skeleton variant={'text'} width={100} height={40} />
                    </Grid>
                    <Grid item xs={10} sm={10} lg={10}>
                        <div className={"mb-32"}>
                            <Skeleton variant={'text'} width={100} height={40} />
                            <Skeleton variant={'text'} width={100} height={40} />
                            <Skeleton variant={'text'} width={'100'} height={80} />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Skeleton variant={'text'} width={200} height={40} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Skeleton variant={'text'} width={200} height={40} />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    )
}

export default TrackingOrderSkeleton;