import {Grid, NumberFormat, React, Suspense, useTranslation} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CheckoutShoppingSummary = (props) => {

    const { summaryShopping, handleOpenPayment } = props;
    const t = useTranslation();

    const subTotal = summaryShopping.summary?.cart?.serviceTotal + summaryShopping.summary?.cart?.subtotal;

    return (
        <Suspense fallback={null}>
            <div className={'box-shadow-type-two p-24'}>
                <div className={'fs-20 fw-b mb-16'}>{t('label.shoppingSummary')}</div>
                <Grid container spacing={0}>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div className={'fs-20 mt-16'}>{t('label.totalPrice')}</div>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <div className={'fs-20 mt-16 ta-r'}>
                            <NumberFormat value={subTotal.toFixed(0)} displayType={'text'}
                                          thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                        </div>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div className={'fs-20 mt-16'}>{t('label.totalDiscount')}</div>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <div className={'fs-20 mt-16 ta-r'}>
                            -<NumberFormat value={summaryShopping.summary?.cart?.discount.toFixed(0)} displayType={'text'}
                                           thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={'w-100 border-bottom mt-16'}></div>
                    </Grid>
                    {summaryShopping.summary?.voucherCashback !== null &&
                        <Grid container spacing={0} className={'bgc-buttery-white p-16'}>
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                                <div className={'fs-20'}>{summaryShopping.summary?.voucherCashback?.name}</div>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <div className={'fs-20 ta-r'}>
                                    <NumberFormat value={summaryShopping.summary?.voucherCashback?.amount.toFixed(0)} displayType={'text'}
                                                   thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                </div>
                            </Grid>
                        </Grid>
                    }
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div className={'fs-20 mt-16 fw-400'}>Subtotal</div>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <div className={'fs-20 mt-16 fw-400 ta-r'}>
                            <NumberFormat value={summaryShopping.summary?.cart?.grandTotal.toFixed(0)} displayType={'text'}
                                          thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                        </div>
                    </Grid>
                </Grid>
                {summaryShopping.summary?.voucherDiscounts?.length > 0 &&
                    summaryShopping.summary?.voucherDiscounts.map((item, index) => {
                        return (
                            <Grid container spacing={0} key={index}>
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={'fs-20'}>{item.name}</div>
                                </Grid>
                                <Grid item xs={5} sm={5} md={5} lg={5}>
                                    <div className={'fs-20 ta-r'}>
                                        -<NumberFormat value={item.amount.toFixed(0)} displayType={'text'}
                                                       thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                    </div>
                                </Grid>
                            </Grid>
                        )
                    })
                }
                {summaryShopping.summary?.giftVoucher !== null &&
                    <Grid container spacing={0}>
                        <Grid item xs={7} sm={7} md={7} lg={7}>
                            <div className={'fs-20'}>{summaryShopping.summary?.giftVoucher?.name}</div>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5} lg={5}>
                            <div className={'fs-20 ta-r'}>
                                -<NumberFormat value={summaryShopping.summary?.giftVoucher?.amount.toFixed(0)} displayType={'text'}
                                               thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                            </div>
                        </Grid>
                    </Grid>
                }
                {summaryShopping.summary?.coupon !== null &&
                    <Grid container spacing={0}>
                        <Grid item xs={7} sm={7} md={7} lg={7}>
                            <div className={'fs-20'}>{summaryShopping.summary?.coupon?.name}</div>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5} lg={5}>
                            <div className={'fs-20 ta-r'}>
                                -<NumberFormat value={summaryShopping.summary?.coupon?.amount.toFixed(0)} displayType={'text'}
                                               thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                            </div>
                        </Grid>
                    </Grid>
                }
                {summaryShopping.summary?.shipping?.price !== 0 &&
                    <div className={'mt-32 mb-16'}>
                        <Grid container spacing={0}>
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                                <div className={'fs-20'}>{t('label.shippingFee')}</div>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <div className={'fs-20 ta-r'}>
                                    <NumberFormat value={summaryShopping.summary?.shipping?.price.toFixed(0)} displayType={'text'}
                                                  thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                </div>
                            </Grid>
                        </Grid>
                        {summaryShopping.summary?.shipping?.discount !== 0 &&
                            <Grid container spacing={0}>
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={'fs-20'}>{t('label.discountShipping')}</div>
                                </Grid>
                                <Grid item xs={5} sm={5} md={5} lg={5}>
                                    <div className={'fs-20 ta-r'}>
                                        -<NumberFormat value={summaryShopping.summary?.shipping?.discount.toFixed(0)} displayType={'text'}
                                                       thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                    </div>
                                </Grid>
                            </Grid>
                        }
                        {summaryShopping.summary?.shipping?.insuranceFee !== 0 &&
                            <Grid container spacing={0}>
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={'fs-20'}>{t('label.shippingInsurance')}</div>
                                </Grid>
                                    <Grid item xs={5} sm={5} md={5} lg={5}>
                                        <div className={'fs-20 ta-r'}>
                                        <NumberFormat value={summaryShopping.summary?.shipping?.insuranceFee.toFixed(0)} displayType={'text'}
                                        thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                        </div>
                                    </Grid>
                            </Grid>
                        }
                        <Grid container spacing={0}>
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                                <div className={'fs-20 fw-400'}>Total {t('label.shippingFee')}</div>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <div className={'fs-20 fw-400 ta-r'}>
                                    <NumberFormat value={summaryShopping.summary?.shipping?.grandTotal.toFixed(0)} displayType={'text'}
                                                  thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }
                <Grid container spacing={0}>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div className={'fs-20 mt-16 fw-b'}>TOTAL</div>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        <div className={'fs-20 mt-16 fw-b ta-r'}>
                            <NumberFormat value={summaryShopping.summary?.grandTotal.toFixed(0)} displayType={'text'}
                                          thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={'mt-24'}>
                            <ButtonAtom
                                type={'button-text'}
                                name={t('label.choosePayment')}
                                styleView={'btn__primary text-transf-cap border-none border-radius-10px fs-20 fw-b pt-8 pb-8 w-100'}
                                clicked={handleOpenPayment}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default CheckoutShoppingSummary;