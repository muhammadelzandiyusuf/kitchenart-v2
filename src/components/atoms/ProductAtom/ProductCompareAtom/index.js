import {Grid, React, Suspense, useTranslation} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const ProductCompareAtom = (props) => {
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            {props.itemCount > 1 &&
            <div className="compare__box">
                <div className="compare">
                    <Grid container spacing={0}>
                        <Grid item lg={2}></Grid>
                        <Grid item xs={6} sm={6} md={6} lg={4} className="compare__text">
                            {t('label.youHave')} {props.itemCount} {t('label.outOf')} 4 {t('label.productToCompare')}
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                            <ButtonAtom type="button-text" name="Compare" clicked={props.handleCompare}
                                        styleView="product__detail__button product__detail__button--cart" />
                        </Grid>
                    </Grid>
                </div>
            </div>
            }
        </Suspense>
    )
};

export default ProductCompareAtom;