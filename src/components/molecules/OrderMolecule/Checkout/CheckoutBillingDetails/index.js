import {
    React,
    Suspense,
    useMediaQuery,
    useState,
    useTheme,
    useTranslation,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton, Close, Grid, NumberFormat
} from 'libraries';

const CheckoutBillingDetails = (props) => {

    const {openBilingDetail, handleCloseBillingDetail, defaultShippingAddress, summaryShopping, shippingMethods,
        shippingMethodEtd} = props;

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [fullWidth] = useState(true);
    const [maxWidth] = useState('sm');

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openBilingDetail}
                onClose={handleCloseBillingDetail}
                aria-labelledby="billing-details"
            >
                <DialogTitle>
                    <div className={'ta-r'}>
                        <IconButton aria-label="close" onClick={handleCloseBillingDetail}>
                            <Close />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={'content__checkout__voucher'}>
                        {defaultShippingAddress &&
                            <div className={'mb-32'}>
                                <div className={'fs-18 mb-16 fw-b'}>{t('label.shippingAddress')}</div>
                                <div className={'fs-18'}>
                                    {`${defaultShippingAddress.receiptName} (${defaultShippingAddress.label})`}
                                </div>
                                <div className={'fs-18'}>{defaultShippingAddress.phoneNumber}</div>
                                <div className={'fs-18 mb-24'}>
                                    <span>{defaultShippingAddress.address}, {defaultShippingAddress.subDistrict}, </span>
                                    <span>{defaultShippingAddress.district}, {defaultShippingAddress.city}, </span>
                                    <span>{defaultShippingAddress.province}, {defaultShippingAddress.postalCode} </span>
                                </div>
                            </div>
                        }
                        {shippingMethods !== null &&
                            <div className={'mb-64'}>
                                <div className={'fs-18'}>
                                    <span className={'text-transf-up'}>{shippingMethods?.shippingService?.vendorName} - </span>
                                    {shippingMethods?.shippingService?.serviceName} ({shippingMethodEtd?.etdFrom} -
                                    {shippingMethodEtd?.etdTo} {t('label.day')})
                                </div>
                            </div>
                        }
                        <div className={'mb-32 summary__billing__detail'}>
                            <div className={'fs-18 fw-b mb-16'}>{t('label.shoppingSummary')}</div>
                            <Grid container spacing={0}>
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={'fs-18 mt-16'}>{t('label.totalPrice')}</div>
                                </Grid>
                                <Grid item xs={5} sm={5} md={5} lg={5}>
                                    <div className={'fs-18 mt-16 ta-r'}>
                                        <NumberFormat value={summaryShopping.summary?.cart?.subtotal.toFixed(0)}
                                                      displayType={'text'} thousandSeparator={true} prefix={'Rp'}
                                                      decimalScale={0} />
                                    </div>
                                </Grid>
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={'fs-18 mt-16'}>{t('label.totalDiscount')}</div>
                                </Grid>
                                <Grid item xs={5} sm={5} md={5} lg={5}>
                                    <div className={'fs-18 mt-16 ta-r'}>
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
                                            <div className={'fs-18'}>{summaryShopping.summary?.voucherCashback?.name}</div>
                                        </Grid>
                                        <Grid item xs={5} sm={5} md={5} lg={5}>
                                            <div className={'fs-18 ta-r'}>
                                                <NumberFormat value={summaryShopping.summary?.voucherCashback?.amount.toFixed(0)} displayType={'text'}
                                                              thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                }
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={'fs-18 mt-16 fw-400'}>Subtotal</div>
                                </Grid>
                                <Grid item xs={5} sm={5} md={5} lg={5}>
                                    <div className={'fs-18 mt-16 fw-400 ta-r'}>
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
                                                <div className={'fs-18'}>{item.name}</div>
                                            </Grid>
                                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                                <div className={'fs-18 ta-r'}>
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
                                        <div className={'fs-18'}>{summaryShopping.summary?.giftVoucher?.name}</div>
                                    </Grid>
                                    <Grid item xs={5} sm={5} md={5} lg={5}>
                                        <div className={'fs-18 ta-r'}>
                                            -<NumberFormat value={summaryShopping.summary?.giftVoucher?.amount.toFixed(0)} displayType={'text'}
                                                           thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                        </div>
                                    </Grid>
                                </Grid>
                            }
                            {summaryShopping.summary?.coupon !== null &&
                                <Grid container spacing={0}>
                                    <Grid item xs={7} sm={7} md={7} lg={7}>
                                        <div className={'fs-18'}>{summaryShopping.summary?.coupon?.name}</div>
                                    </Grid>
                                    <Grid item xs={5} sm={5} md={5} lg={5}>
                                        <div className={'fs-18 ta-r'}>
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
                                            <div className={'fs-18'}>{t('label.shippingFee')}</div>
                                        </Grid>
                                        <Grid item xs={5} sm={5} md={5} lg={5}>
                                            <div className={'fs-18 ta-r'}>
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
                                                <div className={'fs-18'}>{t('label.shippingInsurance')}</div>
                                            </Grid>
                                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                                <div className={'fs-18 ta-r'}>
                                                    <NumberFormat value={summaryShopping.summary?.shipping?.insuranceFee.toFixed(0)} displayType={'text'}
                                                                  thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    }
                                    <Grid container spacing={0}>
                                        <Grid item xs={7} sm={7} md={7} lg={7}>
                                            <div className={'fs-18 fw-b'}>Total {t('label.shippingFee')}</div>
                                        </Grid>
                                        <Grid item xs={5} sm={5} md={5} lg={5}>
                                            <div className={'fs-18 fw-b ta-r'}>
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
                            </Grid>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default CheckoutBillingDetails;