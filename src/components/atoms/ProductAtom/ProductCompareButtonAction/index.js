import {Button, Grid, React, Suspense, useTranslation} from "libraries";

const ProductCompareButtonAction = () => {
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className={'mb-10'}>
                    <Button variant="outlined" className={'product__compare__button product__compare__button--cart'}>
                        {t('label.addToCart')}
                    </Button>
                </div>
                <div className={'mb-10'}>
                    <Button variant="outlined" className={'product__compare__button product__compare__button--wishlist'}>
                        {t('label.addToWishlist')}
                    </Button>
                </div>
            </Grid>
        </Suspense>
    )
}

export default ProductCompareButtonAction;