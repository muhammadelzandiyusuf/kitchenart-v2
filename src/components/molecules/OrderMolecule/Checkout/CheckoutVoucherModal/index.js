import {
    Close, IconButton, React, Suspense, useState, DialogTitle, useTranslation, faTicketAlt, useTheme, useMediaQuery,
    Dialog, DialogContent, Grid, NumberFormat
} from 'libraries';
import {getIdentityFromHref} from "utils";

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));
const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CheckoutVoucherModal = (props) => {

    const {openVoucher, promo, listPromo, handleChooseVoucher, vouchers, handleCancelVoucher, handleToDetailVoucher,
        handleAddVoucher, notValidVoucher, buttonLoading} = props;

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [fullWidth] = useState(true);
    const [maxWidth] = useState('sm');

    let useVouchers = [];
    if (vouchers?.length > 0) {
        vouchers.forEach(item => {
            if (item.promo === promo) {
                useVouchers.push(item);
            };
        });
    };

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openVoucher}
                onClose={() => handleCancelVoucher(promo)}
                aria-labelledby="voucher-get-promo"
            >
                <DialogTitle>
                    <div className={'ta-r'}>
                        <IconButton aria-label="close" onClick={() => handleCancelVoucher(promo)}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className={'ta-c fw-b fs-22'}>
                        <IconAtom icon={faTicketAlt} styleIcon={'mr-4 tc-p'} />
                        {promo === 'discount' &&
                            t('label.voucherDiscount')
                        }
                        {promo === 'cashback' &&
                            t('label.cashback')
                        }
                        {promo === 'shipping' &&
                            t('label.voucherShipping')
                        }
                        {promo === 'gift' &&
                            t('label.giftVoucher')
                        }
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={'content__checkout__voucher mb-32'}>
                        {listPromo?.length > 0 &&
                            listPromo.map((item, index) => {
                                const href = getIdentityFromHref(item.href);
                                const checkedVoucher = useVouchers.find((item) => item.href === href);
                                let notValid = null;
                                if (promo === 'discount'){
                                    if (notValidVoucher?.length > 0) {
                                        notValid = notValidVoucher.find(error => error.href === item.href);
                                    };
                                }
                                else{
                                    notValid = notValidVoucher;
                                };
                                return (
                                    <Grid container spacing={0} key={index} className={'mb-24'}>
                                        <Grid item xs={2} sm={2} md={1} lg={1}>
                                            <CheckBoxAtom
                                                type={'form'}
                                                id={`${href}`}
                                                name={`${href}`}
                                                handleChangeCheckbox={(event) => handleChooseVoucher(event, href, promo,
                                                    item.discountType, item.amount, item.name)}
                                                checked={checkedVoucher !== undefined ? true : false}
                                                value={item.href}
                                            />
                                        </Grid>
                                        <Grid item xs={10} sm={10} md={11} lg={11}>
                                            <div className={'fs-20 fw-400'}>
                                                {item.name}
                                                <NumberFormat
                                                    value={item.amount.toFixed(0)}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={`${item.discountType === 'amount_off' ? 'Rp' : '' }`}
                                                    decimalScale={0}
                                                    className={'ml-4'}
                                                />
                                                {item.discountType === 'percentage' ? '%' : ''}
                                            </div>
                                            <div className={'fs-20 p-m-0'} dangerouslySetInnerHTML={{__html: item.description}}></div>
                                            {notValid !== null && notValid !== undefined && notValid.href === item.href &&
                                                <div className={'fs-16 mt-8 bgc-buttery-white tc-p p-16'}>{notValid.message}</div>
                                            }
                                            <div className={'fs-18 mt-8 tc-gold fw-400 pointer'}
                                                 onClick={() => handleToDetailVoucher(href)}>
                                                {t('label.seeVoucherDetails')}
                                            </div>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </div>
                    {useVouchers?.length > 0 &&
                        <div className={'p-24'}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={5} lg={5}>
                                    <div className={'fs-18 fw-400 mb-16'}>{useVouchers?.length} {t('label.usedVoucher')}</div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={7} lg={7}>
                                    <div className={'right-to-left'}>
                                        <ButtonAtom
                                            type={'button-text'}
                                            name={t('label.cancel')}
                                            styleView={'w-40 text-transf-cap tx-c fw-b w-40 border-color-primary mr-8'}
                                            clicked={() => handleCancelVoucher(promo)}
                                        />
                                        {buttonLoading ? (
                                            <ButtonAtom
                                                type={'button-loading'}
                                                styleView={'w-40 text-transf-cap w-40 fw-b tc-white bgc-primary mr-24'}
                                                styleImage={'w-25'}
                                            />
                                        ):(
                                            <ButtonAtom
                                                type={'button-text'}
                                                name={t('form.add')}
                                                styleView={'w-40 text-transf-cap w-40 fw-b tc-white bgc-primary mr-24'}
                                                clicked={() => handleAddVoucher(promo)}
                                            />
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    }
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default CheckoutVoucherModal;