import {React, Suspense, Grid, useTranslation, EmptyProduct, NumberFormat} from 'libraries';
import {convertDate, getHostUrl} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const TradeInSubmission = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            {props.tradein?.length > 0 &&
                props.tradein.map((item, index) => {
                    const image = getHostUrl(item?.productTarget.image);
                    const created = convertDate(item?.created, 'DD-MM-yyy h:m:s');
                    const confirmationDate = convertDate(item?.discount?.validTo, 'DD-MM-yyy');
                    let priceDiscount = 0;
                    if (item.confirmation === 'approve') {
                        priceDiscount = item.productTarget?.netPrice - item?.discount?.amount;
                    };
                    return (
                        <div key={index}>
                            <div className={'p-16 bgc-f2'}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3} sm={3} md={3} lg={3}>
                                        <div className={'fs-16 tx-c'}>
                                            {created}
                                        </div>
                                    </Grid>
                                    <Grid item xs={5} sm={5} md={5} lg={5}>
                                        <div className={'fs-16 tx-c ta-c'}>
                                            {t('label.tradeInOrderNumber')} : {item.requestId}
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        {props.status === 'approve' &&
                                            <div className={'fs-16 tx-c ta-r'}>
                                                {t('label.promoEnds')} : {confirmationDate}
                                            </div>
                                        }
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={'bgc-white p-16 fs-16'}>
                                <Grid
                                    container
                                    direction="row"
                                    justifycontent="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <img
                                            src={image !== null ? image : EmptyProduct}
                                            className={'w-100'}
                                            alt={'imageproduct'}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} lg={3}>
                                        <div className={'ml-16'}>
                                            <div className={'fw-400'}>{item.productTarget?.brand?.name}</div>
                                            {item.productTarget?.name} {item.productTarget?.code}
                                        </div>
                                    </Grid>
                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                        <div className={'ta-c'}>x1</div>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        {props.status === 'approve' &&
                                            <div className={'ta-c tx-c mb-8 ln-tr'}>
                                                <NumberFormat value={item.productTarget?.price}
                                                              displayType={'text'} thousandSeparator={true}
                                                              prefix={'Rp'} decimalScale={0} />
                                            </div>
                                        }
                                        <div className={'ta-c'}>
                                            <NumberFormat value={item.confirmation === 'approve' ? priceDiscount : item.productTarget?.netPrice}
                                                          displayType={'text'} thousandSeparator={true}
                                                          prefix={'Rp'} decimalScale={0} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        <div className={'ta-c'}>
                                            <span className={'pointer tc-p'} onClick={() => props.handleToTradeInDetail(item.requestId)}>
                                                Detail Trade In
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                        {props.status !== 'decline' ? (
                                            <div className={'ta-r'}>
                                                <ButtonAtom variant="outlined" type="button" name={t('label.addToCart')}
                                                            styleView={`w-100 product__action__button text-transf-cap border-none border-radius-10px ${props.status === 'approve' ? 'btn__primary' : 'btn__disabled'}`}
                                                            clicked={() => props.handleAddToCart(item.productTarget)}
                                                            disabled={props.status === 'approve' ? false : true}
                                                />
                                            </div>
                                        ):(
                                            <div className={'ta-c'}>
                                                {t('label.rejected')}
                                            </div>
                                        )}
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    )
                })
            }
        </Suspense>
    );
};

export default TradeInSubmission;