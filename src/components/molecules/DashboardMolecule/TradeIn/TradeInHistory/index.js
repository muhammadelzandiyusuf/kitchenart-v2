import {React, Suspense, Grid, FileEmpty, Badge, FileAccepted, FileRejected} from 'libraries';

const TradeInHistory = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'p-32'}>
                <Grid container spacing={0}>
                    {props.types?.length > 0 &&
                        props.types.map((item, index) => (
                            <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                                <div
                                    className={`ta-c pointer p-24 ${props.status === item.value ? 'bgc-pink' : ''}`}
                                    onClick={() => props.handleChangeHistory(item.value)}
                                >
                                    {item.value === 'pending' &&
                                        <Badge color="secondary" badgeContent={props.countStatus.pending}
                                               invisible={props.countStatus.pending > 0 ? false : true}>
                                            <img src={FileEmpty} className={'h-60'} alt={'fileimage'} />
                                        </Badge>
                                    }
                                    {item.value === 'approve' &&
                                        <Badge color="secondary" badgeContent={props.countStatus.approve}
                                               invisible={props.countStatus.approve > 0 ? false : true}>
                                            <img src={FileAccepted} className={'h-60'} alt={'fileimage'} />
                                        </Badge>
                                    }
                                    {item.value === 'decline' &&
                                        <Badge color="secondary" badgeContent={props.countStatus.decline}
                                               invisible={props.countStatus.decline > 0 ? false : true}>
                                            <img src={FileRejected} className={'h-60'} alt={'fileimage'} />
                                        </Badge>
                                    }
                                    <div className={'fs-16 mt-16'}>
                                        {item.displayName}
                                    </div>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </Suspense>
    );
};

export default TradeInHistory;