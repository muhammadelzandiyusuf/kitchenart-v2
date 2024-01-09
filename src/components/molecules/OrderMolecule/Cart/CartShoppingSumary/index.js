import {React, Suspense, Grid, NumberFormat, useTranslation} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CartShoppingSumary = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'cart__summary p-16'}>
                <div className={'fs-20 fw-b mb-16'}>{t('label.shoppingSummary')}</div>
                <Grid container spacing={0}>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div className={'fs-20 mt-16'}>{t('label.totalPrice')}</div>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <div className={'fs-20 mt-16 ta-r'}>
                            <NumberFormat value={props.cart?.subtotal.toFixed(0)} displayType={'text'}
                                      thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                        </div>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div className={'fs-20 mt-16'}>{t('label.totalDiscount')}</div>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <div className={'fs-20 mt-16 ta-r'}>
                            -<NumberFormat value={props.cart?.discount.toFixed(0)} displayType={'text'}
                                          thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={'w-100 border-bottom mt-16'}></div>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div className={'fs-20 mt-16 fw-b'}>Subtotal</div>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <div className={'fs-20 mt-16 fw-b ta-r'}>
                            <NumberFormat value={props.cart?.grandTotal.toFixed(0)} displayType={'text'}
                                          thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={'mt-24'}>
                            <ButtonAtom
                                type={'button-text'}
                                name={`Checkout (${props.cart?.quantity})`}
                                styleView={'btn__primary text-transf-cap border-none border-radius-10px fs-20 fw-b pt-8 pb-8 w-100'}
                                clicked={props.handleToCheckout}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default CartShoppingSumary;