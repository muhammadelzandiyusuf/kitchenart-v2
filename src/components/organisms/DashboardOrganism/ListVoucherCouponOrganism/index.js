import {React, Suspense, Grid, useTranslation} from 'libraries';
import {convertDate, getHostUrl, getIdentityFromHref} from "utils";

const VoucherCouponBanner = React.lazy(() => import('components/molecules/DashboardMolecule/Voucher/VoucherCouponBanner'));
const VoucherCouponType = React.lazy(() => import('components/molecules/DashboardMolecule/Voucher/VoucherCouponType'));
const PromotionItem = React.lazy(() => import('components/molecules/PromotionMolecule/PromotionItem'));
const LoadMoreAtom = React.lazy(() => import('components/atoms/LoadMoreAtom'));
const PromotionSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/PromotionSkeleton'));

const ListVoucherCouponOrganism = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <VoucherCouponBanner loading={props.loading} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <VoucherCouponType
                        voucherTypes={props.voucherTypes}
                        active={props.active}
                        handleChangeVoucher={props.handleChangeVoucher}
                        loading={props.loading}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'bgc-white border-radius-10px box-shadow-box p-24'}>
                        {props.loading ? (
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={4} lg={4}>
                                    <PromotionSkeleton />
                                </Grid>
                            </Grid>
                        ):(
                            <Grid container spacing={2}>
                                {props.vouchers?.length > 0 &&
                                    props.vouchers.slice(0, props.limit).map((promotion, index) => {
                                    const href = getIdentityFromHref(promotion?.href);
                                    const thumbnail = getHostUrl(promotion?.thumbnail);
                                    const validFrom = convertDate(promotion?.validFrom, 'DD MMMM');
                                    const validTo = convertDate(promotion?.validTo, 'DD MMMM');
                                    return (
                                        <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                            <PromotionItem
                                                href={href}
                                                description={promotion?.description}
                                                minimumOrderAmount={promotion?.minimumOrderAmount}
                                                validFrom={validFrom}
                                                validTo={validTo}
                                                thumbnail={thumbnail}
                                                active={props.active}
                                                code={promotion?.code}
                                                name={promotion?.name}
                                                handleMoreDetail={() => props.handleMoreDetail(href, props.active)}
                                            />
                                        </Grid>
                                    );
                                })
                                }
                                {props.vouchers?.length === 0 &&
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className={'p-32 fs-27 tx-c ta-c'}>
                                            {t('message.youDontHaveVoucher')}
                                        </div>
                                    </Grid>
                                }
                                {props.vouchers?.length > 6 && props.limit <= props.vouchers?.length &&
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <LoadMoreAtom
                                            syleLoadMore={'ta-c mt-24 mb-24'}
                                            handleLoadMore={props.handleLoadMore}
                                        />
                                    </Grid>
                                }
                            </Grid>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default ListVoucherCouponOrganism;