import {React, Suspense, Grid, useHistory, useForm, Skeleton} from 'libraries';
import {getHostUrl, getIdentityFromHref} from "utils";

const DashboardProductItem = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardProductItem'));
const ProductCart = React.lazy(() => import('components/molecules/ProductMolecule/ProductCart'));
const ProductItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductItemSkeleton'));
const SearchAtom = React.lazy(() => import('components/atoms/SearchAtom'));
const LoadMoreAtom = React.lazy(() => import('components/atoms/LoadMoreAtom'));

const WishlistOrganism = (props) => {

    const history = useHistory();
    const {register, handleSubmit} = useForm();

    const hanndleProductToDetail = (slug, code) => {
        if (code !== null) {
            history.push(`/product/${slug}`);
        }
        else {
            history.push(`/product/package-deals/${slug}`);
        };
    };

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className={'mb-24'}>
                        {props.loading ? (
                            <Skeleton variant={'text'} width={'100%'} height={70} />
                        ):(
                            <SearchAtom
                                type={'product'}
                                register={register}
                                handleSubmit={handleSubmit}
                                handleSearch={props.handleSearch}
                                styleSearch={'w-100'}
                            />
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'box-shadow-box bgc-white border-radius-10px p-16'}>
                        {props.loading ? (
                            <Grid container spacing={2}>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <ProductItemSkeleton />
                                </Grid>
                            </Grid>
                        ):(
                            <Grid container spacing={2}>
                                {props.products?.length > 0 &&
                                props.products.slice(0, props.limit).map((item, index) => {
                                    const slug = getIdentityFromHref(item.product?.href);
                                    const image = getHostUrl(item.product?.image)
                                    return (
                                        <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                                            <DashboardProductItem
                                                image={image}
                                                brand={item.product?.brand?.name}
                                                name={item.product?.name}
                                                code={item.product?.code}
                                                slug={slug}
                                                href={item.product?.href}
                                                normalPrice={item.product?.price}
                                                price={item.product?.netPrice}
                                                isWishlist={true}
                                                structure={'stand_alone'}
                                                hanndleProductToDetail={() => hanndleProductToDetail(slug, item.product?.code)}
                                                handleAddToCart={() => props.handleAddToCart(item.product)}
                                                handleDeleteWishlist={props.handleDeleteWishlist}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}
                    </div>
                    <ProductCart
                        open={props.openCart}
                        handleCloseCart={props.handleCloseCart}
                        productAddCart={props.productAddCart}
                        handleUrl={props.handleUrl}
                        handleToCart={props.handleToCart}
                    />
                </Grid>
                {props.products?.length > 6 && props.limit <= props.products?.length &&
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <LoadMoreAtom
                            syleLoadMore={'ta-c mt-24 mb-24'}
                            handleLoadMore={props.handleLoadMore}
                        />
                    </Grid>
                }
            </Grid>
        </Suspense>
    );
};

export default WishlistOrganism;