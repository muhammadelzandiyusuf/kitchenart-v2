import {React, Suspense, useTranslation, Grid} from 'libraries';

const ReferralProgramRules = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'fs-20 fw-400 mt-32 mb-24'}>{t('label.howItWorks')} :</div>
            <div className={'mb-32'}>
                <Grid container spacing={0}>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <div className={'border-number border-radius-50 tc-p fw-b fs-26 ta-c'}>1</div>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <div className={'fs-21 fw-b mb-16'}>{t('label.getTheReferralLink')}</div>
                        <div className={'fs-18'}>{t('label.simpyGoToProduct')}</div>
                    </Grid>
                </Grid>
            </div>
            <div className={'mb-32'}>
                <Grid container spacing={0}>
                    <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <div className={'fs-21 fw-b ta-r pr-16 mb-16'}>{t('label.copyTheReferralLink')}</div>
                        <div className={'fs-18 ta-r pr-16'}>{t('label.youCanCopy')}</div>
                    </Grid>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <div className={'border-number border-radius-50 tc-p fw-b fs-26 ta-c'}>2</div>
                    </Grid>
                </Grid>
            </div>
            <div className={'mb-32'}>
                <Grid container spacing={0}>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <div className={'border-number border-radius-50 tc-p fw-b fs-26 ta-c'}>3</div>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <div className={'fs-21 fw-b mb-16'}>{t('label.getTheReferralLink')}</div>
                        <div className={'fs-18'}>{t('label.shareYourReferral')}</div>
                    </Grid>
                </Grid>
            </div>
            <div className={'mb-32'}>
                <Grid container spacing={0}>
                    <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <div className={'fs-21 fw-b ta-r pr-16 mb-16'}>{t('label.earnCommisions')}</div>
                        <div className={'fs-18 ta-r pr-16'}>{t('label.youDeserveCommission')}</div>
                    </Grid>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <div className={'border-number border-radius-50 tc-p fw-b fs-26 ta-c'}>4</div>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default ReferralProgramRules;