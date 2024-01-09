import {React, Suspense, Grid, useTranslation, faChevronLeft, EmptyProduct, NumberFormat, faLongArrowAltRight} from 'libraries';
import {convertDate, getHostUrl} from "utils";

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const TradeInDetail = (props) => {

    const t = useTranslation();
    const created = convertDate(props.tradeinDetail?.created, 'DD-MM-yyy h:m:s');
    const confirmationDate = convertDate(props.tradeinDetail?.discount?.validTo, 'DD-MM-yyy');
    const image = getHostUrl(props.tradeinDetail?.productTarget?.image);
    let imageProduct = null;
    if (props.tradeinDetail?.media?.length > 0) {
        imageProduct = getHostUrl(props.tradeinDetail?.media[0]?.image);
    };
    let priceDiscount = 0;
    if (props.tradeinDetail?.confirmation === 'approve') {
        priceDiscount = props.tradeinDetail?.productTarget?.netPrice - props.tradeinDetail?.discount?.amount;
    };

    return (
        <Suspense fallback={null}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className={'pt-16 pb-16'}>
                    <span className={'fs-18 pointer'} onClick={props.handleBack}>
                        <IconAtom icon={faChevronLeft} styleIcon={'mr-8'} /> {t('label.back')}
                    </span>
                </div>
                <div className={'bgc-white border-radius-10px box-shadow-box'}>
                    <div className={'p-16 border-bottom-2px fs-18 fw-400'}>
                        Detail Trade In
                    </div>
                    <div className={'p-16 bgc-f2'}>
                        <Grid container spacing={0}>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <div className={'fs-16 tx-c'}>
                                    {created}
                                </div>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <div className={'fs-16 tx-c ta-c'}>
                                    {t('label.tradeInOrderNumber')} : {props.tradeinDetail?.requestId}
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                {props.tradeinDetail?.confirmation === 'approve' &&
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
                                    <div className={'fw-400'}>{props.tradeinDetail?.productTarget?.brand?.name}</div>
                                    {props.tradeinDetail?.productTarget?.name} {props.tradeinDetail?.productTarget?.code}
                                </div>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <div className={'ta-c'}>x1</div>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                {props.tradeinDetail?.confirmation === 'approve' &&
                                    <div className={'ta-c tx-c mb-8 ln-tr'}>
                                        <NumberFormat value={props.tradeinDetail.productTarget?.price}
                                                      displayType={'text'} thousandSeparator={true}
                                                      prefix={'Rp'} decimalScale={0} />
                                    </div>
                                }
                                <div className={'ta-c'}>
                                    <NumberFormat value={props.tradeinDetail?.confirmation === 'approve' ? priceDiscount : props.tradeinDetail.productTarget?.netPrice}
                                                  displayType={'text'} thousandSeparator={true}
                                                  prefix={'Rp'} decimalScale={0} />
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                {props.tradeinDetail?.confirmation === 'decline' &&
                                    <div className={'ta-c'}>
                                        {t('label.rejected')}
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'bgc-white p-16 fs-16 fw-b border-bottom-2px'}>
                        <Grid container spacing={2}>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                {t('form.brandProductName')}
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                {t('form.condition')}
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                {t('form.description')}
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                {t('form.tradeWhith')}
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'bgc-white p-16 fs-16'}>
                        <Grid container spacing={2} direction="row" justifycontent="center" alignItems="center">
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <img
                                    src={imageProduct !== null ? imageProduct : EmptyProduct}
                                    className={'w-100'}
                                    alt={'imageproduct'}
                                />
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <div className={'ta-c'}>
                                    <IconAtom icon={faLongArrowAltRight} styleIcon={'fs-24'} />
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <img
                                    src={image !== null ? image : EmptyProduct}
                                    className={'w-100'}
                                    alt={'imageproduct'}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <div className={'text-transf-cap'}>
                                    {props.tradeinDetail?.condition?.replace('_', ' ')}
                                </div>
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <div className={'text-transf-cap'}>
                                    {props.tradeinDetail?.description}
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                {props.tradeinDetail?.productTarget?.name} {props.tradeinDetail?.productTarget?.code}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
        </Suspense>
    );
};

export default TradeInDetail;