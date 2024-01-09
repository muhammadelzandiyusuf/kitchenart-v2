import {React, Suspense, Grid, Skeleton} from 'libraries';

const HistoryOrderMenuSkeleton = (props) => {

    const menuThree = (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div className={'ta-c p-24'}>
                        <Skeleton variant={'rect'} width={'100%'} height={100} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div className={'ta-c p-24'}>
                        <Skeleton variant={'rect'} width={'100%'} height={100} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div className={'ta-c p-24'}>
                        <Skeleton variant={'rect'} width={'100%'} height={100} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );

    const menuFour = (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <div className={'ta-c p-24'}>
                        <Skeleton variant={'rect'} width={'100%'} height={100} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <div className={'ta-c p-24'}>
                        <Skeleton variant={'rect'} width={'100%'} height={100} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <div className={'ta-c p-24'}>
                        <Skeleton variant={'rect'} width={'100%'} height={100} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </div>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                    <div className={'ta-c p-24'}>
                        <Skeleton variant={'rect'} width={'100%'} height={100} />
                        <Skeleton variant={'text'} width={'100%'} height={40} />
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );

    switch (props.column) {
        case 'three':
            return menuThree;
        case 'four':
            return menuFour;
        default:
            return menuThree;
    };
};

export default HistoryOrderMenuSkeleton;