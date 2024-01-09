import {Grid, React, Suspense, useTranslation, FontAwesomeIcon, faLongArrowAltRight, Button} from 'libraries';

const TradeInQuote = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'tradein__contact'}>
                <div className={'border-cicle mt-30 mb-10'}>
                    <div className={'bgc-black fs-22 tc-white p-16'}>Trade in Quote</div>
                    <div className={'p-32'}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                <div className={'pt-10 pb-10 fs-20 tx-c border-bottom'}>
                                    {t('form.brandProductName')}
                                </div>
                                <div className={'pt-10 pb-10 fs-17 tx-c'}>
                                    {props.productExchange}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                <div className={'pt-10 pb-10 fs-20 tx-c border-bottom ta-c'}>
                                    {t('form.condition')}
                                </div>
                                <div className={'pt-10 pb-10 fs-17 tx-c ta-c'}>
                                    {props.labelCondition}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                <div className={'pt-10 pb-10 fs-20 tx-c border-bottom'}>
                                    {t('form.description')}
                                </div>
                                <div className={'pt-10 pb-10 fs-17 tx-c'}>
                                    {props.description}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                <div className={'pt-10 pb-10 fs-20 tx-c border-bottom'}>
                                    {t('form.tradeWhith')}
                                </div>
                                <div className={'pt-10 pb-10 fs-17 tx-c'}>
                                    {props.productName}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={'mt-30'}>
                                    <Grid container spacing={0} alignContent={'center'} alignItems={'center'}>
                                        <Grid item xs={4} sm={4} md={4} lg={1}>
                                            <img src={props.media} className={'w-100'} alt={'tradeimage'} />
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={1}>
                                            <div className={'ps-rv ds-b ta-c'}>
                                                <FontAwesomeIcon icon={faLongArrowAltRight} className={'fs-3rem'} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={1}>
                                            <img src={props.productImage} className={'w-100'} alt={'tradeimage'} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className={'ta-r'}>
                                                <Button className={'btn__primary--text'}
                                                        onClick={props.handleDeleteTradeQuote}
                                                >
                                                    {t('form.deleteItem')}
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </Suspense>
    )
};

export default TradeInQuote;