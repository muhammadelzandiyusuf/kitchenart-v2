 import {React, Suspense, VisibilityOutlined, NumberFormat, useTranslation} from 'libraries';

const IconButtonAtom = React.lazy(() => import('components/atoms/IconButtonAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));

const ProductItem = (props) => {

    const t = useTranslation();
    const save = props.normalPrice - props.price;
    const discount = Math.ceil((save / props.normalPrice) * 100);
    const installment = props.price / 12;

    return (
        <Suspense fallback={null}>
            <div className={`product ${props.index % 2 !== 0 ? 'product__ml-8' : ''}`}>
                <div className="product__header">
                    <img src={props.image} className="product__header__image xy-center ps-rv" alt={props.alt} onClick={() => props.handleUrl(props.href)} />
                    {props.view &&
                        <IconButtonAtom type="icon-button-material" clicked={() => props.handleQuickView(props.href)} styleIconButton="ps-ab tx-c top-right product__view">
                            <VisibilityOutlined />
                        </IconButtonAtom>
                    }
                </div>
                <div onClick={() => props.handleUrl(props.href)}>
                    <div className="product__info">
                        {props.promo &&
                            <div className="tx-c fs-20 fw-b">{props.promoName}</div>
                        }
                        {props.brand !== null &&
                            <div className="tx-c fs-18 fw-b">{props.brand}</div>
                        }
                        <div className="tx-c product__name">{props.name}</div>
                        {props.code !== null &&
                            <div className="tx-c product__name">{props.code}</div>
                        }
                    </div>
                    <div className="ps-rv product__box__price">
                        {discount > 0 &&
                            <div className="product__normal__price tx-c ln-tr">
                                <NumberFormat value={props.normalPrice} displayType={'text'} thousandSeparator={true}
                                              prefix={'Rp'} decimalScale={0} />
                            </div>
                        }
                        <div className="product__net__price tc-b fw-b">
                            {props.param !== 'deal_zone' &&
                                <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true}
                                              prefix={'Rp'} decimalScale={0} />
                            }
                            {props.param === 'deal_zone' && props.dateEventActive === 0 &&
                                <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true}
                                          prefix={'Rp'} decimalScale={0} />
                            }
                            {props.param === 'deal_zone' && props.dateEventActive === 1 &&
                                <b>Rp????</b>
                            }
                            {props.param === 'deal_zone' && props.dateEventActive === 2 &&
                                <div className={'tx-c'}>
                                    <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true}
                                                  prefix={'Rp'} decimalScale={0} />
                                </div>
                            }
                        </div>
                        {props.param === 'deal_zone' && props.dateEventActive === 2 &&
                            <div className="product__normal__price tx-c fw-b">
                                Was <NumberFormat value={save} prefix={'Rp'} displayType={'text'} thousandSeparator={true}
                                                  decimalScale={0}/> <span>off </span>
                                <NumberFormat value={discount} displayType={'text'} thousandSeparator={true}
                                              decimalScale={0}/>%
                            </div>
                        }
                        {props.discountView && discount > 0 &&
                            <IconButtonAtom type="icon-button-material" styleIconButton="bgc-gold tc-white fs-8 right-center ps-ab product__discount">
                                <NumberFormat value={discount} displayType={'text'} thousandSeparator={true} decimalScale={0} />%
                            </IconButtonAtom>
                        }
                    </div>
                </div>
                {!props.detail &&
                    <div className="label__discount__shipping">
                        <label>{t('label.discountShipping')}</label>
                    </div>
                }
                {props.hasWholesale && !props.detail &&
                    <div className="label__wholesale">
                        <label>{t('label.wholesale')}</label>
                    </div>
                }
                <div className="product__action">
                    <div className="product__action__btn">
                        <div className="product__action__btn--action w-15">
                            {props.param !== 'deal_zone' && !props.detail &&
                                <CheckBoxAtom
                                    type="icon"
                                    name="wishlist"
                                    id="wishlist"
                                    styleCheckbox={'fs-14'}
                                    checked={props.isWishlist}
                                    handleChangeCheckbox={() => props.isWishlist ? props.handleDeleteWishlist(props.href) : props.handlePostWishlist(props.fullHref)}
                                />
                            }
                            {props.param === 'deal_zone' && props.dateEventActive !== 2 &&
                                <CheckBoxAtom
                                    type="icon"
                                    name="wishlist"
                                    id="wishlist"
                                    styleCheckbox={'fs-14'}
                                    checked={props.isWishlist}
                                    handleChangeCheckbox={() => props.isWishlist ? props.handleDeleteWishlist(props.href) : props.handlePostWishlist(props.fullHref)}
                                />
                            }
                        </div>
                        <div className="product__action__btn--action">
                            {props.compare &&
                                <CheckBoxAtom label={t('label.compare')} name="comapre" id="compare" color="default"
                                              styleCheckbox={'fs-14'} value={props.href}
                                              handleChangeCheckbox={props.handleChangeCompare}
                                              disabled={props.compares.includes(props.href) ? false : props.disabled}
                                              checked={props.compares.includes(props.href) ? true : false}
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className="product__action">
                    {props.limitedStock &&
                        <div className={'fs-15 tx-c fw-400 mb-10'}>
                            {t('message.limitedStock', {params: props.stock})}
                        </div>
                    }
                    {props.param !== 'deal_zone' && props.isInstallment &&
                        <div className="product__action__installment mb-10" onClick={() => props.handleUrl(props.href)}>
                            <NumberFormat value={installment.toFixed(0)} displayType={'text'}
                                          thousandSeparator={true} prefix={'Rp'} decimalScale={0} /> x 12 {t('label.month')}
                        </div>
                    }
                    {props.param === 'deal_zone' && props.dateEventActive === 0 && props.isInstallment &&
                        <div className="product__action__installment mb-10" onClick={() => props.handleUrl(props.href)}>
                            <NumberFormat value={installment.toFixed(0)} displayType={'text'}
                                          thousandSeparator={true} prefix={'Rp'} decimalScale={0} /> x 12 {t('label.month')}
                        </div>
                    }
                    {props.param === 'deal_zone' && props.dateEventActive === 1 && props.isInstallment &&
                        <div className="product__action__installment mb-10" onClick={() => props.handleUrl(props.href)}>
                            <b>Rp????</b>
                        </div>
                    }
                    {props.param === 'deal_zone' && props.dateEventActive === 2 && props.isInstallment &&
                        <div className={'tx-c product__action__installment mb-10'} onClick={() => props.handleUrl(props.href)}>
                            <NumberFormat value={installment.toFixed(0)} displayType={'text'}
                                          thousandSeparator={true} prefix={'Rp'} decimalScale={0} /> x 12 {t('label.month')}
                        </div>
                    }
                    {props.cart &&
                        <ButtonAtom variant="outlined" type="button" name={t('label.addToCart')}
                                    styleView="bgc-red tc-white w-100 product__action__button text-transf-cap border-none border-radius-none"
                                    clicked={props.handleAddToCart}
                        />
                    }

                    {!props.cart && props.dateEventActive === 1 &&
                        <ButtonAtom variant="outlined" type="button" name={t('label.addToCart')}
                                    styleView="bgc-disabled tc-white w-100 product__action__button text-transf-cap border-none border-radius-none"
                    />
                    }
                    {!props.cart && props.dateEventActive === 2 &&
                        <ButtonAtom variant="outlined" type="button" name={t('label.addToCart')}
                                styleView="bgc-disabled tc-white w-100 product__action__button text-transf-cap border-none border-radius-none"
                    />
                    }
                </div>
            </div>
        </Suspense>
    );
};

export default React.memo(ProductItem);