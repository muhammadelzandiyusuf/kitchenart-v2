import {React, Grid, useTranslation, NumberFormat} from 'libraries';

const ProductDetailPrice = (props) => {

    const t = useTranslation();
    const { price, netPrice } = props;

    let save = 0;
    let discount = 0;
    if (price > netPrice) {
        save = price - netPrice;
        discount = Math.ceil((save / price) * 100);
    };

    return (
        <div className="product__detail__info">
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={6} sm={props.detail === true ? 6 : 4} md={props.detail === true ? 6 : 3} lg={props.detail === true ? 6 : 6}>
                    <div className="fs-14 tc-r">
                        {t('label.sale')}: <span className="fs-22 fw-b">
                        <NumberFormat value={netPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp'}
                                      decimalScale={0} />
                    </span>
                    </div>
                </Grid>
                <Grid item xs={6} sm={props.detail === true ? 6 : 8} md={props.detail === true ? 6 : 9} lg={props.detail === true ? 6 : 6}>
                    {discount > 0 &&
                        <>
                           <span className="fs-22 tx-c ln-tr">
                                <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp'}
                                          decimalScale={0} />
                            </span>
                            <div className="fs-14 tc-g">
                                Save: <NumberFormat value={save} displayType={'text'} thousandSeparator={true} prefix={'Rp'}
                                                    decimalScale={0} />
                                <span className="ml-5">(<NumberFormat value={discount} displayType={'text'} thousandSeparator={true}
                                                                      decimalScale={0} />%)</span>
                            </div>
                        </>
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductDetailPrice;