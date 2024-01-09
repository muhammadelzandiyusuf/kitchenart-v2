import {React, Grid} from 'libraries';

const ProductDetailInfoPromo = (props) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className={'mb-20'}>
                    <div className={'fs-14 fw-b c-black text-transf-cap'}>{props.label}</div>
                        {props.lineItems?.length > 0 &&
                            props.lineItems.map((product, index) => {
                            const length = props.lineItems?.length - 1;
                            return (
                                <span key={index} className={'fs-14 tx-c'}>
                                    {product.product?.name} {product.product?.code} {length > index ? ' + ' : ''}
                                </span>
                            )
                        })
                    }
                </div>
            </Grid>
        </Grid>
    );
};

export default ProductDetailInfoPromo;