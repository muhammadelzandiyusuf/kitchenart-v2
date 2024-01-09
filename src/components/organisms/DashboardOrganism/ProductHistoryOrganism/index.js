import {React, Suspense, Grid, useHistory, useTranslation} from 'libraries';
import {getHostUrl, getIdentityFromHref} from "utils";

const DashboardProductItem = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardProductItem'));
const ProductHistoryFilter = React.lazy(() => import('components/molecules/DashboardMolecule/ProductHistoryFilter'));
const ProductCart = React.lazy(() => import('components/molecules/ProductMolecule/ProductCart'));
const ProductItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductItemSkeleton'));
const LoadMoreAtom = React.lazy(() => import('components/atoms/LoadMoreAtom'));

const ProductHistoryOrganism = (props) => {

    const history = useHistory();
    const t = useTranslation();

    const hanndleProductToDetail = (slug, structure) => {
        if (structure === 'stand_alone') {
            history.push(`/product/${slug}`);
        }
        else {
            history.push(`/product/package-deals/${slug}`);
        };
    };

    return (
        <Suspense fallback={null}>
            <div className={'mb-24'}>
                <ProductHistoryFilter
                    loading={props.loading}
                    handleFilter={props.handleFilter}
                    date={props.date}
                />
            </div>
            <div className={'box-shadow-box bgc-white border-radius-10px p-16'}>
                {props.loading ? (
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={4} lg={4}>
                            <ProductItemSkeleton />
                        </Grid>
                    </Grid>
                ):(
                    <Grid container spacing={2}>
                        {props.products?.length > 0 &&
                        props.productHistory.slice(0, props.limit).map((item, index) => {
                            const slug = getIdentityFromHref(item?.href);
                            const product = props.products.find(result => getIdentityFromHref(result?.href) === slug);
                            return (
                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                    <DashboardProductItem
                                        image={getHostUrl(product?.image)}
                                        brand={product?.brand?.name}
                                        name={product?.name}
                                        code={product?.code}
                                        slug={slug}
                                        href={product?.href}
                                        normalPrice={product?.price}
                                        price={product?.netPrice}
                                        isWishlist={product?.isWishlist}
                                        structure={product?.structure}
                                        hanndleProductToDetail={() => hanndleProductToDetail(slug, product?.structure)}
                                        handleAddToCart={() => props.handleAddToCart(product)}
                                        handlePostWishlist={props.handlePostWishlist}
                                        handleDeleteWishlist={props.handleDeleteWishlist}
                                    />
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                )}
                {props.message &&
                    <div className={'ta-c fs-24 tx-c p-24'}>
                        {t('message.thereIsNoProduct')}
                    </div>
                }
            </div>
            {props.products?.length > 6 && props.limit <= props.products?.length &&
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <LoadMoreAtom
                            syleLoadMore={'ta-c mt-24 mb-24'}
                            handleLoadMore={props.handleLoadMore}
                        />
                    </Grid>
                </Grid>
            }
            <ProductCart
                open={props.openCart}
                handleCloseCart={props.handleCloseCart}
                productAddCart={props.productAddCart}
                handleUrl={props.handleUrl}
                handleToCart={props.handleToCart}
            />
        </Suspense>
    );
};

export default ProductHistoryOrganism;