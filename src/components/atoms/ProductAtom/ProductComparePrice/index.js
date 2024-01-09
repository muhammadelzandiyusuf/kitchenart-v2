import {Grid, NumberFormat, React, Suspense} from "libraries";

const ProductComparePrice = (props) => {
    return(
        <Suspense fallback={null}>
            <Grid item lg={12}>
                <div className={'mb-10'}>
                    <span className="fs-22 tx-c ln-tr">
                        <NumberFormat value={props.price?.basePrice} displayType={'text'} thousandSeparator={true}
                                      prefix={'Rp'} />
                    </span>
                </div>
                <div className={'mb-10'}>
                    <span className="fs-22 fw-b product__compare__price">
                        <NumberFormat value={props.price?.netPrice} displayType={'text'} thousandSeparator={true}
                                      prefix={'Rp'} />
                    </span>
                </div>
            </Grid>
        </Suspense>
    )
}

export default ProductComparePrice;