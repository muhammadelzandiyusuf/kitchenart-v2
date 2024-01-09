import {React, Suspense, Grid, useTranslation} from 'libraries';

const CommissionMolecule = React.lazy(() => import('components/molecules/DashboardMolecule/Commission/CommissionMolecule'));
const CommissionHistory = React.lazy(() => import('components/molecules/DashboardMolecule/Commission/CommissionHistory'));

const CommissionOrganism = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'border-color-primary bgc-pink p-24 fs-18 box-sizing-border mb-32'}>
                        <div className={'fw-400'}>{t('message.helloKitchenartVisitors')},</div>
                        {t('message.kitchenartIsNotResponsible')}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'bgc-white border-radius-10px box-shadow-box mb-32'}>
                        <CommissionMolecule
                            commission={props.commission}
                            handleWithdraw={props.handleWithdraw}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'bgc-white border-radius-10px box-shadow-box'}>
                        <CommissionHistory
                            filterCommissions={props.filterCommissions}
                            filterType={props.filterType}
                            handleFilterType={props.handleFilterType}
                            filterPeriod={props.filterPeriod}
                            handleFilterPeriod={props.handleFilterPeriod}
                            histories={props.histories}
                            limit={props.limit}
                            handleSeeMore={props.handleSeeMore}
                        />
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default CommissionOrganism;