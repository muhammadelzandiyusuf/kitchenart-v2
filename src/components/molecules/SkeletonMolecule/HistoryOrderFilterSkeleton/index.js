import {React, Suspense, Grid, Skeleton} from 'libraries';

const HistoryOrderFilterSkeleton = () => {

    return (
        <Suspense fallback={null}>
            <div className={'mb-32'}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Skeleton variant={'text'} width={'100%'} height={60} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Skeleton variant={'text'} width={'100%'} height={60} />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default HistoryOrderFilterSkeleton;