import {EmptyProduct, NumberFormat, React, Suspense, useTranslation} from 'libraries';

const IconButtonAtom = React.lazy(() => import('components/atoms/IconButtonAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));

const DashboardProductItem = (props) => {

    const t = useTranslation();
    const save = props.normalPrice - props.price;
    const discount = Math.ceil((save / props.normalPrice) * 100);

    return (
        <Suspense fallback={null}>
            <div className={'dashboard__product pointer'}>
                <div className={'p-16 h-245 box-sizing-border ovf-h'}
                     onClick={props.hanndleProductToDetail}>
                    <img src={props.image !== null ? props.image : EmptyProduct} className={'w-100'} alt={'product-item'} />
                </div>
                <div className={'pr-16 pl-16 pb-16 h-83'} onClick={props.hanndleProductToDetail}>
                    <div className={'fs-16 fw-b'}>{props.brand}</div>
                    <div className={'fs-16'}>{props.name}</div>
                    <div className={'fs-16'}>{props.code}</div>
                </div>
                {props.normalPrice !== undefined &&
                    <div className={'pr-16 pl-16 pb-16'} >
                        <div className="ps-rv product__box__price" onClick={props.hanndleProductToDetail}>
                            {discount > 0 &&
                                <div className="product__normal__price tx-c ln-tr fs-18">
                                    <NumberFormat value={props.normalPrice} displayType={'text'} thousandSeparator={true}
                                                  prefix={'Rp'} decimalScale={0} />
                                </div>
                            }
                            <div className="product__net__price c-black fw-b fs-20">
                                <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true}
                                              prefix={'Rp'} decimalScale={0} />
                            </div>
                            {discount > 0 &&
                                <IconButtonAtom type="icon-button-material" styleIconButton="bgc-red tc-white fs-12 right-center ps-ab product__discount">
                                    <NumberFormat value={discount} displayType={'text'} thousandSeparator={true} decimalScale={0} />%
                                </IconButtonAtom>
                            }
                        </div>
                        <div className={'mt-16'}>
                            <CheckBoxAtom
                                type="icon"
                                name="wishlist"
                                id="wishlist"
                                styleCheckbox={'fs-14'}
                                handleChangeCheckbox={() => props.isWishlist ? props.handleDeleteWishlist(props.slug) : props.handlePostWishlist(props.href)}
                                checked={props.isWishlist}
                            />
                            <ButtonAtom variant="outlined" type="button" name={t('label.addToCart')}
                                        styleView="tc-p w-100 product__action__button text-transf-cap border-color-primary border-radius-none mt-8"
                                        clicked={props.handleAddToCart}
                            />
                        </div>
                    </div>
                }
            </div>
        </Suspense>
    );
};

export default DashboardProductItem;