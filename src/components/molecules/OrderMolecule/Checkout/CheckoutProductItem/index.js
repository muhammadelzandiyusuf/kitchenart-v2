import {React, Suspense, Grid, useTranslation, NumberFormat, EmptyProduct} from 'libraries';

const CheckoutProductItem = (props) => {

    const { products } = props;
    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            {products?.length > 0 &&
                products.map((item, index) => {
                    let servicesContract = [];
                    let servicesWarranty = [];
                    if (item.properties?.services?.length > 0) {
                        item.properties?.services.forEach(service => {
                           const properties = item.availableServices.find(available => available.href === service.href);
                           if (properties !== undefined) {
                               if (properties.type === 'contract_service') {
                                   servicesContract.push(properties);
                               }
                               else{
                                   servicesWarranty.push(properties);
                               };
                           };
                        });
                    };
                    return (
                        <div className={'mb-24'} key={index}>
                            <Grid container spacing={2}>
                                <Grid item xs={3} sm={3} md={2} lg={2}>
                                    <img src={item.product?.image !== null ? item.product?.image : EmptyProduct}
                                         className={'w-100'} alt={'product-item'} />
                                </Grid>
                                <Grid item xs={9} sm={9} md={10} lg={10}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className={'fs-20 fw-400'}>{item.product?.brand?.name}</div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8} lg={8}>
                                            <div className={'fs-20 fw-400'}>{item.product?.name} {item.product?.code}</div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <div className={'fs-20'}>{item.quantity} {t('label.item')}</div>
                                        </Grid>
                                        {servicesWarranty?.length > 0 &&
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <div className={'fs-20'}>
                                                    {servicesWarranty[0].period} {t('label.year')} {t('label.extendedWarranty')}
                                                </div>
                                            </Grid>
                                        }
                                        {servicesContract?.length > 0 &&
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <div className={'fs-20'}>
                                                    {servicesContract[0].period} {t('label.year')} {t('label.contractService')}
                                                </div>
                                            </Grid>
                                        }
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className={'fs-20 fw-b mt-24 mb-16'}>
                                                <NumberFormat value={item.total?.subtotal.toFixed(0)} displayType={'text'}
                                                              thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                                            </div>
                                            {!item.isValid &&
                                                <div className={`bgc-buttery-white p-16 fs-14 border-radius-5px`}>
                                                    {item.message}
                                                </div>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )
                })
            }
        </Suspense>
    );
};

export default CheckoutProductItem;