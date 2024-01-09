import {Grid, React, Suspense} from "libraries";

const ProductCompareMolecule = React.lazy(() => import('components/molecules/ProductMolecule/ProductCompareMolecule'));
const ProductCompareDetail = React.lazy(() => import('components/molecules/ProductMolecule/ProductCompareDetail'));
const ProductCompareDetailSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductCompareDetailSkeleton'));

const ProductCompareOrganism = (props) => {
    const column = 12 / props.products?.length;

    return(
        <Suspense fallback={null}>
            <Grid container spacing={1} className="product__compare">
                <Grid item lg={12}>
                    <ProductCompareMolecule
                        countItem={props.products?.length}
                        handleResetCompare={props.handleResetCompare}
                        handleOtherItem={props.handleOtherItem}
                        loading={props.loading}
                    />
                </Grid>
                {props.loading &&
                    <ProductCompareDetailSkeleton />
                }
                {props.products?.length > 0 && !props.loading &&
                    props.products.map((item, index) => {
                    return(
                        <Grid item xs={6} sm={6} md={6} lg={column} key={index} className="mt-30">
                            <ProductCompareDetail
                                item={item}
                                index={index}
                                handleUrl={props.handleUrl}
                                handleDeleteCompare={props.handleDeleteCompare}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Suspense>
    )

}

export default React.memo(ProductCompareOrganism);