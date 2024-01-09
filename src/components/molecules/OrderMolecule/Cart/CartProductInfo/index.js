import {NumberFormat, React, Suspense, Grid} from 'libraries';

const CartProductInfo = (props) => {

    let brand = null;
    if (props.structure === 'package') {
        brand = props.brand
    }
    else {
        brand = props.brand?.name
    };

    return (
        <Suspense fallback={null}>
            {brand !== null &&
                <div className={'fs-18 mb-8 fw-400'}>{brand}</div>
            }
            <div className={'text__color__black-hover pointer'} onClick={props.handleToProductDetail}>
                <div className={'fs-18 mb-8 fw-400'}>{props.name}</div>
                {props.code !== null &&
                    <div className={'fs-18 mb-8 fw-400'}>{props.code}</div>
                }
            </div>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className={'mb-8 fs-15 tc-p fw-b'}>
                        Save: <NumberFormat value={props.savePrice.toFixed(0)} displayType={'text'}
                                            thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                        <span> (<NumberFormat value={props.discount.toFixed(0)} displayType={'text'}
                                              thousandSeparator={true} decimalScale={0} />%)</span>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className={'mb-8 fs-18 fw-b'}>
                        <NumberFormat value={props.netPrice.toFixed(0)} displayType={'text'}
                                      thousandSeparator={true} prefix={'Rp'} decimalScale={0} />
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default CartProductInfo;