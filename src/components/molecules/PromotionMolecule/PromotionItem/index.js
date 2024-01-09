import {React, Suspense, Grid, FontAwesomeIcon, faClock, faMoneyCheckAlt, NumberFormat, useTranslation, faTicketAlt
} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const PromotionItem = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'border-cicle--greySlate mt-16 mb-16'}>
                <div className={`promotion__image h-192 border-bottom ${props.thumbnail !== null && props.thumbnail !== undefined ? '' : 'bgc-slate-grey'}`}>
                    {props.thumbnail !== null && props.thumbnail !== undefined && props.active !== 'promotion' ?
                        (<img src={props.thumbnail} className={'w-100 ps-ab y-center'} alt={'imagepromotion'} />)
                        :
                        (<div className={'tc-ph ps-ab fs-3rem fw-b text-transf-up lsp-2 xy-center'}>
                            {props.name !== null ? props.name : props.active}
                        </div> )
                    }
                </div>
                <div className={'p-16'}>
                    {props.type === 'package_deal' &&
                        <div className={'mb-16 fs-15 tx-c h-52 p-m0'} dangerouslySetInnerHTML={{__html: props.name}}></div>
                    }
                    {props.type === 'giveaway' &&
                        <div className={'mb-16 fs-15 tx-c h-52 p-m0'} dangerouslySetInnerHTML={{__html: props.name}}></div>
                    }
                    {props.type !== 'package_deal' && props.type !== 'giveaway' &&
                        <div className={'mb-16 fs-15 tx-c h-52 p-m0'} dangerouslySetInnerHTML={{__html: props.description}}></div>
                    }
                    {props.active === 'gift_voucher' &&
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={'mb-16 fs-16 tx-c fw-b'}>
                                    {props.name}
                                </div>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <FontAwesomeIcon
                                    icon={faMoneyCheckAlt}
                                    className={'tx-c fs-20'}
                                />
                            </Grid>
                            <Grid item xs={10} sm={10} md={10} lg={10}>
                                <div className={'tx-c fs-15'}>
                                    {t('label.minimumPurchase')}
                                </div>
                                <div className={'tx-c fs-15'}>
                                    <NumberFormat value={props.minimumOrderAmount} displayType={'text'} thousandSeparator={true}
                                                   prefix={'Rp'} decimalScale={0} />

                                </div>
                            </Grid>
                        </Grid>
                    }
                    {props.active !== 'gift_voucher' &&
                        <div className={'mb-16'}>
                            <Grid container spacing={0}>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    <FontAwesomeIcon icon={faClock} className={'tx-c fs-20'} />
                                </Grid>
                                <Grid item xs={10} sm={10} md={10} lg={10}>
                                    {props.validFrom !== null ? (
                                        <div className={'tx-c fs-15'}>Periode {props.validFrom} - {props.validTo}</div>
                                    ):(
                                        <div className={'tx-c fs-15'}>-</div>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    }
                    {props.active !== 'promotion' && props.active !== 'gift_voucher' &&
                        <Grid container spacing={0}>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <FontAwesomeIcon
                                    icon={props.active !== 'coupon' ? faMoneyCheckAlt : faTicketAlt}
                                    className={'tx-c fs-20'}
                                />
                            </Grid>
                            <Grid item xs={10} sm={10} md={10} lg={10}>
                                <div className={'tx-c fs-15'}>
                                    {props.active !== 'coupon' ? t('label.minimumPurchase') : t('label.promoCode')}
                                </div>
                                <div className={'tx-c fs-15'}>
                                    {props.active !== 'coupon' ?
                                        (<NumberFormat value={props.minimumOrderAmount} displayType={'text'} thousandSeparator={true}
                                                       prefix={'Rp'} decimalScale={0} />):
                                        (<div className={'tc-p text-transf-up fw-b'}>{props.code}</div> )
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    }
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'mt-24'}>
                                <ButtonAtom
                                    variant="outlined" type="button" name={'More Details'}
                                    styleView="pt-10 pb-12 bgc-red tc-white w-100 product__action__button text-transf-cap border-radius-none border-none"
                                    clicked={props.handleMoreDetail}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Suspense>
    );
};

export default PromotionItem;