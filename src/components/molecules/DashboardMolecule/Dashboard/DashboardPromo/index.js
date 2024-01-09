import {React, Suspense, useTranslation, Skeleton} from 'libraries';

const DashboardPromo = (props) => {

    const t = useTranslation();
    const totalVoucher = props.promo.voucher + props.promo.giftVoucher;

    return (
        <Suspense fallback={null}>
            <div className={'bgc-white border-radius-10px box-shadow-box mt-24'}>
                <div className={'p-16 border-bottom fs-18 fw-400'}>
                    {props.loading ? (
                        <Skeleton variant={'text'} width={'50%'} height={40} />
                    ):(
                        t('label.myPromo')
                    )}
                </div>
                <div className={'p-16 fs-18 pb-48'}>
                    <table className={'w-100'}>
                        {props.loading ? (
                            <tbody>
                                <tr>
                                    <td className={'pb-16'}>
                                        <Skeleton variant={'text'} width={'95%'} height={40} />
                                    </td>
                                    <td className={'pb-16'}>
                                        <Skeleton variant={'text'} width={'100%'} height={40} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className={'pb-16'}>
                                        <Skeleton variant={'text'} width={'95%'} height={40} />
                                    </td>
                                    <td className={'pb-16'}>
                                        <Skeleton variant={'text'} width={'100%'} height={40} />
                                    </td>
                                </tr>
                            </tbody>
                        ):(
                            <tbody>
                                <tr>
                                    <td className={'pb-16'}>{t('label.myVoucher')}</td>
                                    <td className={'pb-16'}>:</td>
                                    <td className={'pb-16'}>{totalVoucher}</td>
                                </tr>
                                <tr>
                                    <td className={'pb-16'}>{t('label.myCoupon')}</td>
                                    <td className={'pb-16'}>:</td>
                                    <td className={'pb-16'}>{props.promo.coupon}</td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </Suspense>
    );
};

export default DashboardPromo;