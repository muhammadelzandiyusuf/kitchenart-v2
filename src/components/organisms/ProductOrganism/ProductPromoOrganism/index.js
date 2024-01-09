import {Grid, Hidden, PropTypes, React, Suspense, withWidth, Skeleton, EmptyProduct} from 'libraries';
import {findItemInObject, getHostUrl, getIdentityFromHref} from "utils";

const ProductResult = React.lazy(() => import('components/molecules/ProductMolecule/ProductResult'));
const ProductMenuPromotion = React.lazy(() => import('components/molecules/ProductMolecule/ProductMenuPromotion'));
const Pagination = React.lazy(() => import('components/atoms/PaginationAtom'));
const MenuFilter = React.lazy(() => import('components/molecules/MenuFilterMolecule'));
const MobileFilterProduct = React.lazy(() => import('components/molecules/MobileFilterProduct'));
const ProductItem = React.lazy(() => import('components/molecules/ProductMolecule/ProductItem'));
const ProductItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductItemSkeleton'));
const ProductQuickView = React.lazy(() => import('components/molecules/ProductMolecule/ProductQuickView'));
const ProductCart = React.lazy(() => import('components/molecules/ProductMolecule/ProductCart'));

const ProductPromoOrganism = (props) => {

    const { products } = props;

    let paginationFirst = { disabled: true, value: 1, href: '' };
    let paginationPrev = { disabled: true, value: 1, href: '' };
    let paginationNext = { disabled: true, value: 2, href: '' };
    let paginationLast = { disabled: true, value: products?.meta?.paginating?.pageSize, href: '' };

    if (products?.data?.length > 0) {
        if (products?.meta?.paginating?.links?.length > 0) {
            const pageLinksFirst = findItemInObject(products?.meta?.paginating?.links, 'rel', 'first');
            const pageLinksPrev = findItemInObject(products?.meta?.paginating?.links, 'rel', 'prev');
            const pageLinksNext = findItemInObject(products?.meta?.paginating?.links, 'rel', 'next');
            const pageLinksLast = findItemInObject(products?.meta?.paginating?.links, 'rel', 'last');

            if (pageLinksFirst?.rel !== null) {
                const href = getIdentityFromHref(pageLinksFirst?.href);
                paginationFirst = { disabled: false, value: pageLinksFirst?.title, href: href };
            }
            if (pageLinksPrev?.rel !== null) {
                const href = getIdentityFromHref(pageLinksPrev?.href);
                paginationPrev = { disabled: false, value: pageLinksPrev?.title, href: href };
            }
            if (pageLinksNext?.rel !== null) {
                const href = getIdentityFromHref(pageLinksNext?.href);
                paginationNext = { disabled: false, value: pageLinksNext?.title, href: href };
            }
            if (pageLinksLast?.rel !== null) {
                const href = getIdentityFromHref(pageLinksLast?.href);
                paginationLast = { disabled: false, value: pageLinksLast?.title, href: href };
            }
        }
    }

    return (
        <Suspense fallback={null}>
            <div className="bgc-white">
                <Grid container spacing={1}>
                    <Hidden only={['xs','sm', 'md']}>
                        <Grid item lg={3}>
                            <div className="menu__left menu__left--filter">
                                <ProductResult result={10} view={props.view}
                                               handleView={props.handleView} loading={props.loading}
                                />
                                {props.loading ? <Skeleton variant="text" height={30} /> :
                                    <div className={'fs-20 pl-16 fw-400'}>Special Promo</div>}
                                <ProductMenuPromotion param={props.param} type={"list-item-promo"} lists={props.availablePromotion}
                                              clicked={props.handleChangeUrl} loading={props.loading}
                                />
                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={12} md={12} lg={9}>
                        <div className="product__box">
                            <Grid container spacing={0}>
                                <Hidden only={['lg', 'xl']}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <MobileFilterProduct
                                            filtering={products?.meta?.filtering}
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
                                            ordering={products?.meta?.ordering}
                                            handleFilter={props.handleFilter}
                                        />
                                    </Grid>
                                </Hidden>
                                <Hidden only={['xs','sm', 'md']}>
                                    <Grid item lg={12}>
                                        <MenuFilter
                                            selected={props.selected}
                                            filtering={products?.meta?.filtering}
                                            ordering={products?.meta?.ordering}
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
                                {products?.data?.length > 0 &&
                                    products.data.map((item, index) => {
                                        if (props.loadingProduct) {
                                            return (
                                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                                    <ProductItemSkeleton />
                                                </Grid>
                                            );
                                        }
                                        else {
                                            const href = getIdentityFromHref(item.href);
                                            let quickView = true;
                                            if (item?.formatItem?.structure === 'package') {
                                                quickView = false
                                            }
                                            else{
                                                quickView = true;
                                            }
                                            return (
                                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                                    <ProductItem
                                                        image={item.image === null ? EmptyProduct : getHostUrl(item.image)}
                                                        alt="product-image"
                                                        brand={item.brand}
                                                        name={item.name}
                                                        code={item.code}
                                                        normalPrice={item.price}
                                                        price={item.netPrice}
                                                        cart={props.disabled}
                                                        view={quickView}
                                                        index={index + 1}
                                                        href={href}
                                                        fullHref={item.href}
                                                        handleUrl={props.handleUrl}
                                                        discountView={props.discountView}
                                                        compare={false}
                                                        handleChangeCompare={props.handleChangeCompare}
                                                        disabled={props.disabled}
                                                        compares={props.compares}
                                                        limitedStock={true}
                                                        stock={item.stock}
                                                        promo={true}
                                                        promoName={item.formatItem?.packageMeta?.typeLabel}
                                                        handleQuickView={props.handleQuickView}
                                                        dateEventActive={props.dateActive}
                                                        param={props.param}
                                                        isWishlist={item.isWishlist}
                                                        handlePostWishlist={props.handlePostWishlist}
                                                        handleDeleteWishlist={props.handleDeleteWishlist}
                                                        isInstallment={true}
                                                        handleAddToCart={() => props.handleAddToCart(item)}
                                                    />
                                                </Grid>
                                            );
                                        }
                                    })
                                }
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Pagination
                            styleBoxPagination={'pagination__box'} count={props.countPagination} page={props.page}
                            handleChange={props.handleChangePagination} variant={'outlined'} shape={'rounded'}
                            first={paginationFirst} prev={paginationPrev} next={paginationNext} last={paginationLast}
                            loading={props.loadingProduct}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ProductResult stylePage={'fl-r pr-10'} type={'page-product'} view={props.view}
                                       handleView={props.handleView} loading={props.loadingProduct} />
                        <ProductQuickView handleOpen={props.openDialog} handleClose={props.handleCloseDialog}
                                          item={props.product} slide={props.slide} action={props.action}
                                          handleAction={props.handleAction} handleMultiSlide={props.handleMultiSlide}
                                          handleUrl={props.handleUrl} href={props.href}
                                          handleChangeProduct={props.handleChangeProduct} />
                        <ProductCart
                            open={props.openCart}
                            handleCloseCart={props.handleCloseCart}
                            productAddCart={props.productAddCart}
                            handleUrl={props.handleUrl}
                            handleToCart={props.handleToCart}
                        />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

ProductPromoOrganism.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(ProductPromoOrganism);