import {React, Suspense, Skeleton} from 'libraries';

const VoucherCouponType = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'mb-24 mt-24'}>
                {props.loading &&
                    <>
                        <div className={`ds-ib p-32 w-12 ds-b bgc-white`}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </div>
                        <div className={`ds-ib p-32 w-12 ds-b bgc-white`}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </div>
                        <div className={`ds-ib p-32 w-12 ds-b bgc-white`}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </div>
                        <div className={`ds-ib p-32 w-12 ds-b bgc-white`}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </div>
                        <div className={`ds-ib p-32 w-12 ds-b bgc-white`}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </div>
                    </>
                }

                {props.voucherTypes?.length > 0 && !props.loading &&
                    props.voucherTypes.map((item, index) => {
                        return (
                            <div
                                onClick={() => props.handleChangeVoucher(item.type)}
                                className={`ds-ib fs-16 fw-b pl-32 pr-32 ta-c w-12 ds-b pointer
                                ${props.active === item.type ? 'bgc-white tc-p' : ''}
                                ${item.type !== 'coupon' && item.type !== 'gift_voucher' ? 'pt-32 pb-32' : 'pt-53 pb-32'}`}
                                key={index}>
                                <div className={''}>
                                    {item.name} {item.type !== 'coupon' && item.type !== 'gift_voucher' ? 'Vouchers' : ''}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Suspense>
    );
};

export default VoucherCouponType;