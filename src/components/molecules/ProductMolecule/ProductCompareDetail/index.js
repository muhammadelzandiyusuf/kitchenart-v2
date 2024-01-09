import {Close, EmptyProduct, Grid, IconButton, Image, React, Suspense} from "libraries";
import {getHostUrl} from "utils";

const ProductCompareName = React.lazy(() => import('components/atoms/ProductAtom/ProductCompareName'));
const ProductComparePrice = React.lazy(() => import('components/atoms/ProductAtom/ProductComparePrice'));
const ProductCompareButton = React.lazy(() => import('components/atoms/ProductAtom/ProductCompareButtonAction'));
const ProductCompareSpecification = React.lazy(() => import('components/atoms/ProductAtom/ProductCompareSpecification'));
const ProductCompareView = React.lazy(() => import('components/atoms/ProductAtom/ProductCompareView'));

const ProductCompareDetail = (props) => {

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0} className={props.index > 0 ? "product__compare__border" : ""}>
                <Grid item xs={12} sm={12} md={12} lg={12} className="ta-r">
                    <IconButton className="tx-c top-right product__view" color="inherit"
                        onClick={() => props.handleDeleteCompare(props.item?.href, props.index)}>
                        <Close />
                    </IconButton>
                </Grid>
                <Grid container spacing={0} className="product__compare__detail">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Image src={props.item?.images?.length > 0 ? getHostUrl(props.item?.images[0]?.image) : EmptyProduct}
                               className="w-100" alt='primary-product-image'  />
                    </Grid>
                    <ProductCompareName brand={props.item?.brand} name={props.item?.name} code={props.item?.code} />
                    <ProductComparePrice price={props.item?.price} />
                    <ProductCompareButton />
                    {props.item?.specifications?.length > 0 &&
                        props.item?.specifications.map((specification, index) => {
                        return(
                            <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                                <ProductCompareSpecification specification={specification} />
                            </Grid>
                        )
                    })}
                    <ProductCompareView handleUrl={props.handleUrl} href={props.item.href} />
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default ProductCompareDetail;