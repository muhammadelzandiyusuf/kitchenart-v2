import {React, Suspense, Breadcrumbs, Link, NavigateNext, Typography, useTranslation} from 'libraries';

const PromotionBreadcrumbs = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Breadcrumbs className="mb-32" aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
                <Link className="breadcrumbs__link fs-14" to={`/promotion`}>
                    {t('label.promotion')}
                </Link>
                <Link className="breadcrumbs__link fs-14" to={`${props.path === 'voucher' ? '/voucher' : '/coupon'}`}>
                    {t('label.vouchers')} & {t('label.coupons')}
                </Link>
                <Typography className="breadcrumbs__last fs-14">Details</Typography>
            </Breadcrumbs>
        </Suspense>
    );
};

export default PromotionBreadcrumbs;