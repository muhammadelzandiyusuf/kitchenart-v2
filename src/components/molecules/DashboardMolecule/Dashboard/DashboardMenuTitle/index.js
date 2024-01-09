import {React, Suspense, Grid, useTranslation, IconKitchenart} from 'libraries';

const DashboardMenuTitle = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0} direction={'row'} alignItems={'center'} justify={'center'}>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                    <img src={IconKitchenart} className={'w-100'} alt={'icon'} />
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                    <div className={'ml-8 fs-24 fw-400'}>{props.name}</div>
                    <div className={'ml-8 fs-20'}>{t('label.member')} Kitchenart</div>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default DashboardMenuTitle;