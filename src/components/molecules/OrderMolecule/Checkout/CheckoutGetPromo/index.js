import {React, Suspense, useTranslation, Grid, faTicketAlt, faChevronRight, NumberFormat, useForm} from 'libraries';

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));
const TextFieldAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CheckoutGetPromo = (props) => {

    const { handleCodePromo, handleGetPromoVoucher, vouchers, casbackPrice, activeCoupon } = props;
    const t = useTranslation();
    const {register, handleSubmit} = useForm();

    const useVoucherDiscount = [];
    const useVoucherCashback = [];
    const useVoucherShipping = [];
    const useVoucherGift = [];

    if (vouchers?.length > 0) {
        vouchers.forEach(item => {
            if (item.promo === 'discount') {
                useVoucherDiscount.push(item);
            }
            else if (item.promo === 'cashback') {
                useVoucherCashback.push(item);
            }
            else if (item.promo === 'shipping') {
                useVoucherShipping.push(item);
            }
            else if (item.promo === 'gift') {
                useVoucherGift.push(item);
            }
        });
    };

    return (
        <Suspense fallback={null}>
            <div className={'box-shadow-type-one p-24'}>
                <div className={'fs-20 fw-b mb-24'}>{t('label.getMorePromo')}</div>
                <Grid container spacing={0} className={'pointer mb-16'} onClick={() => handleGetPromoVoucher('discount')}>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <IconAtom icon={faTicketAlt} styleIcon={'tc-p fs-26 mt-4'} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('label.voucherDiscount')}</div>
                        {useVoucherDiscount.length > 0 &&
                            <div className={'fs-18 tx-c'}>{useVoucherDiscount.length} {t('label.usedVoucher')}</div>
                        }
                    </Grid>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <div className={'ta-r'}>
                            <IconAtom icon={faChevronRight} styleIcon={'fs-20 tx-c mt-4'} />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={'pointer mb-16'} onClick={() => handleGetPromoVoucher('cashback')}>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <IconAtom icon={faTicketAlt} styleIcon={'tc-p fs-26 mt-4'} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('label.cashback')}</div>
                        {useVoucherCashback.length > 0 &&
                            <div className={'fs-18 tx-c'}>
                                {t('label.cashback')} :
                                <NumberFormat
                                    value={casbackPrice.amount.toFixed(0)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={`${casbackPrice.discountType === 'amount_off' ? 'Rp' : '' }`}
                                    decimalScale={0}
                                    className={'ml-4'}
                                />
                                {casbackPrice.discountType !== 'amount_off' && '%'}
                            </div>
                        }
                    </Grid>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <div className={'ta-r'}>
                            <IconAtom icon={faChevronRight} styleIcon={'fs-20 tx-c mt-4'} />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={'pointer mb-16'} onClick={() => handleGetPromoVoucher('shipping')}>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <IconAtom icon={faTicketAlt} styleIcon={'tc-p fs-26 mt-4'} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('label.voucherShipping')}</div>
                        {useVoucherShipping.length > 0 &&
                            <div className={'fs-18 tx-c'}>{useVoucherShipping.length} {t('label.usedVoucher')}</div>
                        }
                    </Grid>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <div className={'ta-r'}>
                            <IconAtom icon={faChevronRight} styleIcon={'fs-20 tx-c mt-4'} />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={'pointer mb-16'} onClick={() => handleGetPromoVoucher('gift')}>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <IconAtom icon={faTicketAlt} styleIcon={'tc-p fs-26 mt-4'} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('label.giftVoucher')}</div>
                        {useVoucherGift.length > 0 &&
                            <div className={'fs-18 tx-c'}>{useVoucherGift.length} {t('label.usedVoucher')}</div>
                        }
                    </Grid>
                    <Grid item xs={2} sm={2} md={1} lg={1}>
                        <div className={'ta-r'}>
                            <IconAtom icon={faChevronRight} styleIcon={'fs-20 tx-c mt-4'} />
                        </div>
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit(handleCodePromo)}>
                    <Grid container spacing={0} className={'mb-16'}>
                        <Grid item xs={9} sm={9} md={9} lg={9}>
                            <TextFieldAtom
                                typeForm={'text-field'}
                                id={'codePromo'}
                                name={'codePromo'}
                                reg={register}
                                variant={'outlined'}
                                placeholder={t('label.enterPromoCode')}
                                size={'small'}
                                styleText={'tx-c border-radius-10px'}
                            />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <div className={'ta-r'}>
                                <ButtonAtom
                                    type={'button-text'}
                                    typeButton={'submit'}
                                    styleView={'text-transf-cap btn-add w-80 border-radius-10px'}
                                    name={t('form.add')}
                                />
                            </div>
                        </Grid>
                        {activeCoupon !== null &&
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={'fs-16 mt-8 bgc-buttery-white tc-p p-16'}>{activeCoupon}</div>
                            </Grid>
                        }
                    </Grid>
                </form>
            </div>
        </Suspense>
    );
};

export default CheckoutGetPromo;