import {React, Suspense, Grid} from 'libraries';

const ReferralProgramBanner = React.lazy(() => import('components/molecules/DashboardMolecule/ReferralProgram/ReferralProgramBanner'));
const ReferralProgramRules = React.lazy(() => import('components/molecules/DashboardMolecule/ReferralProgram/ReferralProgramRules'));
const ReferralProgramTerms = React.lazy(() => import('components/molecules/DashboardMolecule/ReferralProgram/ReferralProgramTerms'));

const ReferralProgramOrganism = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'box-shadow-box bgc-white p-32 border-radius-10px mb-32'}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ReferralProgramBanner />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ReferralProgramRules />
                    </Grid>
                </Grid>
            </div>
            <div className={'box-shadow-box bgc-white p-24 border-radius-10px'}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ReferralProgramTerms termCondition={props.termCondition} />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default ReferralProgramOrganism;