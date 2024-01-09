import {React, Suspense, Grid, useTranslation, Skeleton} from 'libraries';

const VoucherCouponBanner = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'bgc-white p-24'}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <div className={'tc-p fs-60 lsp-2 fw-b ta-c'}>
                            {props.loading ? (
                                <Skeleton variant={'text'} width={'70%'} height={80} className={'ps-rv x-center mb-16'} />
                            ):(
                                t('label.vouchers')
                            )}
                        </div>
                        <div className={'fs-53 lsp-2 fw-b ta-c'}>
                            {props.loading ? (
                                <Skeleton variant={'text'} width={'70%'} height={80} className={'ps-rv x-center'} />
                            ):(
                                `& ${t('label.coupons')}`
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        {props.loading ? (
                            <>
                                <Skeleton variant={'text'} width={'100%'} height={40} />
                                <Skeleton variant={'text'} width={'100%'} height={40} />
                                <Skeleton variant={'text'} width={'100%'} height={40} />
                            </>
                        ):(
                            <div className={'fs-20 tx-c'}>
                                {t('message.getDiscountVoucher')}
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default VoucherCouponBanner;