import {Breadcrumbs, Link, NavigateNext, React, Suspense, Typography, useTranslation} from 'libraries';

const CommissionWithdrawBreadcumb = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
                <Link className="breadcrumbs__link fs-18" to={`/profile/commission`}>
                    {t('label.commissions')}
                </Link>
                <Typography className="breadcrumbs__last fs-18">{t('label.commissionWithdraw')}</Typography>
            </Breadcrumbs>
        </Suspense>
    );
};

export default CommissionWithdrawBreadcumb;