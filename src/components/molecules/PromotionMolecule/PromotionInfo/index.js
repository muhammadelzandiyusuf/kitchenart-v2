import {
    React,
    Suspense,
    Grid,
    FontAwesomeIcon,
    faClock,
    faMoneyCheckAlt,
    NumberFormat,
    useTranslation,
    faTicketAlt,
    CopyToClipboard,
    faCopy
} from 'libraries';
import {convertDate} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const PromotionInfo = (props) => {

    const t = useTranslation();
    const validFrom = convertDate(props.promotion?.validFrom, 'DD MMMM');
    const validTo = convertDate(props.promotion?.validTo, 'DD MMMM');

    return (
        <Suspense fallback={null}>
            <div className={'promotion__detail promotion__info p-24'}>
                <div className={'ta-c fs-18 mb-24'}>Promo Info</div>
                <div className={'mb-24'}>
                    {props.path === 'gift-voucher' ? (
                        <div className={'fs-18 tx-c'}>{props.promotion?.name}</div>
                    ):(
                        <Grid container spacing={0}>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <FontAwesomeIcon icon={faClock} className={'tx-c fs-20'} />
                            </Grid>
                            <Grid item xs={11} sm={11} md={11} lg={11}>
                                <div className={'tx-c fs-18'}>Periode {validFrom} - {validTo}</div>
                            </Grid>
                        </Grid>
                    )}
                </div>
                {props.path === 'coupon' &&
                    <div className={'mb-24'}>
                        <Grid container spacing={0}>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <FontAwesomeIcon icon={faTicketAlt} className={'tx-c fs-20'} />
                            </Grid>
                            <Grid item xs={11} sm={11} md={11} lg={11}>
                                <div className={'tx-c fs-18'}>{t('label.promoCode')}</div>
                                <div className={'tx-c fs-18'}>
                                    <div className={'tc-p text-transf-up fw-b'}>
                                        {props.promotion?.code}
                                        <CopyToClipboard text={props.promotion?.code} onCopy={props.handleCopyCode}>
                                            <span className={'ml-16'}>
                                                <FontAwesomeIcon icon={faCopy} className={'fs-18 tx-c pointer'} />
                                            </span>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }
                <div className={'mb-64'}>
                    <Grid container spacing={0}>
                        <Grid item xs={1} sm={1} md={1} lg={1}>
                            <FontAwesomeIcon icon={faMoneyCheckAlt} className={'tx-c fs-20'} />
                        </Grid>
                        <Grid item xs={11} sm={11} md={11} lg={11}>
                            <div className={'tx-c fs-18'}>{t('label.minimumPurchase')}</div>
                            <div className={'tx-c fs-18'}>
                                <NumberFormat value={props.promotion?.minimumOrderAmount} displayType={'text'} thousandSeparator={true}
                                              prefix={'Rp'} decimalScale={0} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={'mt-24'}>
                <ButtonAtom
                    variant="outlined" type="button" name={`${t('label.use')} ${props.path === 'voucher' || props.path === 'gift-voucher' ? t('label.vouchers') : t('label.coupons')}`}
                    styleView="bgc-red fs-18 tc-white w-100 product__action__button text-transf-cap border-radius-none border-none pt-10 pb-10"
                    clicked={props.handleUsePromotion}
                />
            </div>
        </Suspense>
    );
};

export default PromotionInfo;