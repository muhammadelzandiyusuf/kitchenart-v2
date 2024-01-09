import {React, Grid, Suspense, useTranslation, FontAwesomeIcon, faRetweet, faAward} from 'libraries';
import {getIdentityFromHref} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));

const ProductDetailAction = (props) => {
    const t = useTranslation();
    let slug = null;

    if (props.href !== null && props.href !== '' && props.href !== undefined) {
        slug = getIdentityFromHref(props.href);
    };
    return (
        <Suspense fallback={null}>
            <div className={`product__detail__info ${props.detail === true ? 'border-bottom' : ''}`}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CheckBoxAtom
                            type="icon"
                            label={t('label.addWishlist')}
                            name="wishlist"
                            id="wishlist"
                            styleCheckbox={'fs-14 mr-8 tx-c'}
                            checked={props.isWishlist}
                            handleChangeCheckbox={() => props.isWishlist ? props.handleDeleteWishlist(slug) : props.handlePostWishlist(props.href)}
                        />
                        {props.detail === true && props.tradein === true &&
                            <ButtonAtom
                                type={'button-start-icon'}
                                icon={<FontAwesomeIcon icon={faRetweet} color="#D13135" />}
                                name={t('label.trade_in')}
                                styleView="text-transf-cap fs-14 mr-8 tx-c"
                            />
                        }
                        {props.detail === true &&
                            <ButtonAtom
                                type={'button-start-icon'}
                                icon={<FontAwesomeIcon icon={faAward} color="#D13135" />}
                                name={`${t('label.warranty')} ${t('label.and')} ${t('label.installation')}`}
                                styleView="text-transf-cap fs-14 mr-8 tx-c"
                            />
                        }
                    </Grid>
                    {props.detail === false &&
                        <Grid item xs={12} sm={12} md={12} lg={12} className="border-bottom">
                            <ButtonAtom
                                type={'button-start-icon'}
                                name={t('label.itemSelection')}
                                styleView={`text-transf-cap fs-14 mr-8 tx-c ${props.action === "item_selection" ? 'button__action--active' : ''}`}
                                clicked={() => props.handleAction('item_selection')}
                            />
                            <ButtonAtom
                                type={'button-start-icon'}
                                name={t('label.summary')}
                                styleView={`text-transf-cap fs-14 mr-8 tx-c ${props.action === "summary" ? 'button__action--active' : ''}`}
                                clicked={() => props.handleAction('summary')}
                            />
                        </Grid>
                    }
                </Grid>
            </div>
        </Suspense>
    );
};

export default ProductDetailAction;