import {Grid, React, Suspense} from "libraries";

const ProductCompareName = (props) => {
    return(
        <Suspense fallback={null}>
            <Grid item lg={12} className="mb-20 product__compare__detail--name">
                <div className="fs-20">{props.brand?.name}</div>
                <div className="fs-14">{props.name}</div>
                <div className="fs-14">{props.code}</div>
            </Grid>
        </Suspense>
    )
}

export default ProductCompareName;