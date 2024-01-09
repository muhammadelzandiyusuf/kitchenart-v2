import {React, Suspense, Grid, NumberFormat, useTranslation, Skeleton} from "libraries";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const TransactionDetail = (props) => {

    const { handleCompletePayment, historyOrder, loading } = props;
    const t = useTranslation()

    return(
        <Suspense fallback={null}>
            <div className={'fs-18 fw-b tx-c p-16 border-bottom-2px'}>
                {loading ?
                    <Skeleton variant={'text'} width={'30%'} height={40}/>
                    :
                    t('label.transactionDetail')
                }
            </div>
            <div className={'p-16 fs-16 tx-c'}>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40}/>
                            :
                            `${t('label.totalPriceOrder')} :
                            (${historyOrder.lineItems?.length} ${t('label.item')})`
                        }
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'100%'} height={40}/>
                            :
                            <div className={'ta-r mb-16'}>
                                <NumberFormat value={historyOrder.total?.lineItems?.subtotal}
                                              displayType={'text'}
                                              thousandSeparator={true}
                                              prefix={'Rp '}
                                              decimalScale={0}
                                />
                            </div>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40} />
                            :
                            t('label.totalDiscountItems')
                        }
                    </Grid>
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'100%'} height={40}/>
                            :
                            <div className={'ta-r mb-16'}>
                                <NumberFormat value={historyOrder.total?.lineItems?.discount}
                                              displayType={'text'}
                                              thousandSeparator={true}
                                              prefix={'-Rp '}
                                              decimalScale={0}
                                />
                            </div>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40} />
                            :
                            <div className={'fw-b'}>Subtotal</div>
                        }
                    </Grid>
                    <Grid item xs={6} sm={5} lg={3}>
                            {loading ?
                                <Skeleton variant={'text'} width={'100%'} height={40}/>
                                :
                                <div className={'fw-b ta-r mb-16'}>
                                    <NumberFormat value={historyOrder.total?.subtotal}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  prefix={'Rp '}
                                                  decimalScale={0}
                                    />
                                </div>
                            }
                    </Grid>
                </Grid>
                {historyOrder.vouchers?.length > 0 &&
                    historyOrder.vouchers?.map((voucher, index) => {
                        return(
                            <Grid container spacing={0} key={index}>
                                {voucher.voucherType === "discount" &&
                                <>
                                    <Grid item xs={5} sm={5} lg={3}>
                                        {loading ?
                                            <Skeleton variant={'text'} width={'80%'} height={40} />
                                            :
                                            voucher.voucherName
                                        }
                                    </Grid>
                                    <Grid item xs={5} sm={5} lg={3}>
                                        {loading ?
                                            <Skeleton variant={'text'} width={'100%'} height={40}/>
                                            :
                                            <div className={'ta-r mb-16'}>
                                                <NumberFormat value={voucher.amount}
                                                              displayType={'text'}
                                                              thousandSeparator={true}
                                                              prefix={'-Rp '}
                                                              decimalScale={0}
                                                />
                                            </div>
                                        }
                                    </Grid>
                                    <Grid item xs={2} sm={2} lg={6}></Grid>
                                </>
                                }
                            </Grid>
                        )
                    })
                }
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40} />
                            :
                            t('label.shippingFee')
                        }
                    </Grid>
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'100%'} height={40}/>
                            :
                            <div className={'ta-r mb-16'}>
                                <NumberFormat value={historyOrder.total?.shippingRate?.price}
                                              displayType={'text'}
                                              thousandSeparator={true}
                                              prefix={'Rp '}
                                              decimalScale={0}
                                />
                            </div>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    {historyOrder.total?.shippingRate?.insuranceFee > 0 &&
                        <>
                            <Grid item xs={6} sm={5} lg={3}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'80%'} height={40} />
                                    :
                                    t('label.insurance')
                                }
                            </Grid>
                            <Grid item xs={6} sm={5} lg={3}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'100%'} height={40}/>
                                    :
                                    <div className={'ta-r mb-16'}>
                                        <NumberFormat value={historyOrder.total?.shippingRate?.insuranceFee}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      prefix={'Rp '}
                                                      decimalScale={0}
                                        />
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={12} sm={2} lg={6}> </Grid>
                        </>
                    }
                    {historyOrder.total?.shippingRate?.discount > 0 &&
                        <>
                            <Grid item xs={6} sm={5} lg={3}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'80%'} height={40} />
                                    :
                                    t('label.discountShipping')
                                }
                            </Grid>
                            <Grid item xs={6} sm={5} lg={3}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'100%'} height={40}/>
                                    :
                                    <div className={'ta-r mb-16'}>
                                        <NumberFormat value={historyOrder.total?.shippingRate?.discount}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      prefix={'-Rp '}
                                                      decimalScale={0}
                                        />
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={12} sm={2} lg={6}> </Grid>
                        </>
                    }
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40} />
                            :
                            t('label.paymentMethod')
                        }
                    </Grid>
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                            :
                            <div className={'ta-r mb-16'}>
                                {historyOrder.payment?.paymentMethod?.type}
                            </div>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40}/>
                            :
                            <div className={'fw-b'}>
                                TOTAL
                            </div>
                        }
                    </Grid>
                    <Grid item xs={6} sm={5} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'100%'} height={40}/>
                            :
                            <div className={'fw-b ta-r mb-16'}>
                                <NumberFormat value={historyOrder.total?.grandTotal}
                                              displayType={'text'}
                                              thousandSeparator={true}
                                              prefix={'Rp '}
                                              decimalScale={0}
                                />
                            </div>
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    {historyOrder.status === 'unpaid' &&
                        <>
                            <Grid item xs={6} sm={6} lg={3}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'80%'} height={40}/>
                                    :
                                    <div className={'fw-b'}>Status</div>
                                }
                            </Grid>
                            <Grid item xs={6} sm={6} lg={3}>
                                    {loading ?
                                        <Skeleton variant={'text'} width={'80%'} height={40} />
                                        :
                                        <div className={'fw-b ta-r mb-16'}>{t('label.waitingPayment')}</div>
                                    }
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'80%'} height={40}/>
                                    :
                                    <div className={'ta-c mb-16'}>
                                        <ButtonAtom variant="contained" color="secondary"
                                                    styleView={'btn__primary text-transf-cap'}
                                                    name={t('label.completePayment')}
                                                    clicked={() => handleCompletePayment(historyOrder?.orderNumber)} />
                                    </div>
                                }
                            </Grid>
                        </>
                    }
                    {historyOrder.vouchers?.length > 0 &&
                        historyOrder.vouchers?.map((voucher, index) => {
                            return(
                                <Grid container spacing={0} key={index}>
                                    {voucher.voucherType === "cashback" &&
                                    <>
                                        <Grid item xs={5} sm={5} lg={3}>
                                            {loading ?
                                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                                                :
                                                'Cashback'
                                            }
                                        </Grid>
                                        <Grid item xs={5} sm={5} lg={3}>
                                            {loading ?
                                                <Skeleton variant={'text'} width={'100%'} height={40}/>
                                                :
                                                <div className={'ta-r mb-16'}>
                                                    <NumberFormat value={voucher.amount}
                                                                  displayType={'text'}
                                                                  thousandSeparator={true}
                                                                  prefix={'Rp '}
                                                                  decimalScale={0}
                                                    />
                                                </div>
                                            }
                                        </Grid>
                                        <Grid item xs={2} sm={2} lg={6}></Grid>
                                    </>
                                    }
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </Suspense>
    )
}

export default TransactionDetail;