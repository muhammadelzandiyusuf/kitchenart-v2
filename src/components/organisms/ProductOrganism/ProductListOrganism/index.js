import {React, Suspense, Grid, Hidden, withWidth, PropTypes, useSelector, EmptyProduct} from 'libraries';
import {productsSelector} from 'modules';
import {findItemInObject, getIdentityFromHref, getHostUrl} from "utils";

const ProductResult = React.lazy(() => import('components/molecules/ProductMolecule/ProductResult'));
const TreeCategory = React.lazy(() => import('components/molecules/ProductMolecule/TreeCategory'));
const ProductItem = React.lazy(() => import('components/molecules/ProductMolecule/ProductItem'));
const MenuFilter = React.lazy(() => import('components/molecules/MenuFilterMolecule'));
const Pagination = React.lazy(() => import('components/atoms/PaginationAtom'));
const MobileFilterProduct = React.lazy(() => import('components/molecules/MobileFilterProduct'));
const ProductItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductItemSkeleton'));
const ProductQuickView = React.lazy(() => import('components/molecules/ProductMolecule/ProductQuickView'));
const Compare = React.lazy(() => import('components/atoms/ProductAtom/ProductCompareAtom'));
const ProductCart = React.lazy(() => import('components/molecules/ProductMolecule/ProductCart'));

const ProductListOrganism = (props) => {

    let productList = { data: [], meta: {filtering: [], ordering: [], paginating: { links: [], totalResults: 0, pageSize: 0 }} };
    productList = useSelector(productsSelector);

    let paginationFirst = { disabled: true, value: 1, href: '' };
    let paginationPrev = { disabled: true, value: 1, href: '' };
    let paginationNext = { disabled: true, value: 2, href: '' };
    let paginationLast = { disabled: true, value: productList?.meta?.paginating?.pageSize, href: '' };

    if (productList?.data?.length > 0) {
        if (productList?.meta?.paginating?.links?.length > 0) {
            const pageLinksFirst = findItemInObject(productList?.meta?.paginating?.links, 'rel', 'first');
            const pageLinksPrev = findItemInObject(productList?.meta?.paginating?.links, 'rel', 'prev');
            const pageLinksNext = findItemInObject(productList?.meta?.paginating?.links, 'rel', 'next');
            const pageLinksLast = findItemInObject(productList?.meta?.paginating?.links, 'rel', 'last');

            if (pageLinksFirst?.rel !== null) {
                const href = getIdentityFromHref(pageLinksFirst?.href);
                paginationFirst = { disabled: false, value: pageLinksFirst?.title, href: href };
            };
            if (pageLinksPrev?.rel !== null) {
                const href = getIdentityFromHref(pageLinksPrev?.href);
                paginationPrev = { disabled: false, value: pageLinksPrev?.title, href: href };
            };
            if (pageLinksNext?.rel !== null) {
                const href = getIdentityFromHref(pageLinksNext?.href);
                paginationNext = { disabled: false, value: pageLinksNext?.title, href: href };
            };
            if (pageLinksLast?.rel !== null) {
                const href = getIdentityFromHref(pageLinksLast?.href);
                paginationLast = { disabled: false, value: pageLinksLast?.title, href: href };
            };
        };
    };

    return (
        <Suspense fallback={null}>
            <div className="bgc-white">
                <Grid container spacing={1}>
                    <Hidden only={['xs','sm', 'md']}>
                        <Grid item lg={3}>
                            <div className="menu__left menu__left--filter">
                                <ProductResult result={productList?.meta?.paginating?.totalResults} view={props.view}
                                               handleView={props.handleView} loading={props.loading}
                                />
                                <TreeCategory
                                    url={props.slug}
                                    handleChangeUrl={props.handleChangeUrl}
                                    tree={productList?.meta?.filtering} loading={props.loading} />
                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item lg={9}>
                        <div className="product__box">
                            <Grid container spacing={0}>
                                <Hidden only={['lg', 'xl']}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <MobileFilterProduct
                                            filtering={productList?.meta?.filtering}
                                            filterMobile={props.filterMobile}
                                            handleFilterMobile={props.handleFilterMobile}
                                            styleTitle={'fs-18 tx-c'}
                                            value={props.valueRadio}
                                            handleChangeRadio={props.handleChangeRadio}
                                            handleChangeCheckbox={props.handleChangeCheckbox}
                                            selectColor={props.selectColor}
                                            handleFilterColor={props.handleFilterColor}
                                            filterCheckBox={props.filterCheckBox}
                                            filterRadio={props.filterRadio}
                                            ordering={productList?.meta?.ordering}
                                            handleFilter={props.handleFilter}
                                        />
                                    </Grid>
                                </Hidden>
                                <Hidden only={['xs','sm', 'md']}>
                                    <Grid item lg={12}>
                                        <MenuFilter
                                            selected={props.selected}
                                            filtering={productList?.meta?.filtering}
                                            ordering={productList?.meta?.ordering}
                                            value={props.valueRadio}
                                            handleFilter={props.handleFilter}
                                            handleChangeRadio={props.handleChangeRadio}
                                            handleChangeCheckbox={props.handleChangeCheckbox}
                                            selectColor={props.selectColor}
                                            handleFilterColor={props.handleFilterColor}
                                            filterCheckBox={props.filterCheckBox}
                                            filterRadio={props.filterRadio}
                                            loading={props.loading}
                                        />
                                    </Grid>
                                </Hidden>
                                {productList?.data?.length > 0 &&
                                    productList.data.map((item, index) => {
                                        if (props.loading) {
                                            return (
                                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                                    <ProductItemSkeleton />
                                                </Grid>
                                            );
                                        }
                                        else {
                                            const href = getIdentityFromHref(item.href);
                                            return (
                                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                                    <ProductItem
                                                        image={item.image === null ? EmptyProduct : getHostUrl(item.image)}
                                                        alt="product-image"
                                                        brand={item.brand?.name}
                                                        name={item.name}
                                                        code={item.code}
                                                        normalPrice={item.price}
                                                        price={item.netPrice}
                                                        cart={true}
                                                        view={true}
                                                        index={index + 1}
                                                        href={href}
                                                        fullHref={item.href}
                                                        handleUrl={props.handleUrl}
                                                        discountView={true}
                                                        compare={true}
                                                        handleQuickView={props.handleQuickView}
                                                        handleChangeCompare={props.handleChangeCompare}
                                                        disabled={props.disabled}
                                                        compares={props.compares}
                                                        isWishlist={item.isWishlist}
                                                        handlePostWishlist={props.handlePostWishlist}
                                                        handleDeleteWishlist={props.handleDeleteWishlist}
                                                        handleAddToCart={() => props.handleAddToCart(item)}
                                                        isInstallment={true}
                                                        hasWholesale={item.hasWholesale}
                                                    />
                                                </Grid>
                                            );
                                        }
                                    })
                                }
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Pagination
                                        styleBoxPagination={'pagination__box'} count={props.countPagination} page={props.page}
                                        handleChange={props.handleChangePagination} variant={'outlined'} shape={'rounded'}
                                        first={paginationFirst} prev={paginationPrev} next={paginationNext} last={paginationLast}
                                        loading={props.loading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <ProductResult stylePage={'fl-r pr-10'} type={'page-product'} view={props.view}
                                                   handleView={props.handleView} loading={props.loading} />
                                </Grid>
                            </Grid>
                            <ProductQuickView handleOpen={props.openDialog} handleClose={props.handleCloseDialog}
                                              item={props.product} slide={props.slide} action={props.action}
                                              handleAction={props.handleAction} handleMultiSlide={props.handleMultiSlide}
                                              handleUrl={props.handleUrl} href={props.href}
                                              handleChangeProduct={props.handleChangeProduct}
                                              handlePostWishlist={props.handlePostWishlistDetail}
                                              handleDeleteWishlist={props.handleDeleteWishlistDetail}
                            />
                            <Compare itemCount={props.itemCount} handleCompare={props.handleCompare} />
                            <ProductCart
                                open={props.openCart}
                                handleCloseCart={props.handleCloseCart}
                                productAddCart={props.productAddCart}
                                handleUrl={props.handleUrl}
                                handleToCart={props.handleToCart}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

ProductListOrganism.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default React.memo(withWidth()(ProductListOrganism));