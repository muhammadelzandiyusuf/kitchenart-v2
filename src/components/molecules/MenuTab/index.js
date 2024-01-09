import { React, Suspense, Grid } from 'libraries';

const MenuTab = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div className={`${props.active === 'promotion' ? 'bgc-white' : 'bgc-grey'} box__event ps-rv ds-b pointer transition-5s`}
                         onClick={() => props.handleChangePromotion('promotion')}
                    >
                        <div className={`w-100 ps-ab xy-center fw-b font__date ${props.active === 'promotion' ? 'tc-p' : 'c-black'}`}>
                            <div className={'ta-c fs-24'}>Products Discounts</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div className={`${props.active === 'voucher' ? 'bgc-white' : 'bgc-grey'} box__event ps-rv ds-b pointer transition-5s`}
                         onClick={() => props.handleChangePromotion('voucher')}
                    >
                        <div className={`w-100 ps-ab xy-center fw-b font__date ${props.active === 'voucher' ? 'tc-p' : 'c-black'}`}>
                            <div className={'ta-c fs-24'}>Vouchers</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div className={`${props.active === 'coupon' ? 'bgc-white' : 'bgc-grey'} box__event ps-rv ds-b pointer transition-5s`}
                         onClick={() => props.handleChangePromotion('coupon')}
                    >
                        <div className={`w-100 ps-ab xy-center fw-b font__date ${props.active === 'coupon' ? 'tc-p' : 'c-black'}`}>
                            <div className={'ta-c fs-24'}>Coupons</div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default MenuTab;