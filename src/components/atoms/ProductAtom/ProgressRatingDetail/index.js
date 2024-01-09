import {Grid, React, Suspense, useTranslation} from 'libraries';

const ProgressRatingDetail = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container spacing={2}>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <div className={'fs-14 tx-c'}>{props.stars} {t('label.stars')}</div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <div className={'progress__rating w-100'}>
                        <div className={'progress__rating--primary'} style={{width: `${props.barRating}%`}}></div>
                    </div>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <div className={'fs-14 tx-c'}>{props.reviewCount}</div>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default ProgressRatingDetail;