import {React, Suspense, Grid, PropTypes, withWidth, Hidden} from 'libraries';

const ProductImageSlide = React.lazy(() => import('components/molecules/ProductMolecule/ProductImageSlide'));
const ProductDetailInfo = React.lazy(() => import('components/molecules/ProductMolecule/ProductDetailInfo'));
const ProductBreadcrumbs = React.lazy(() => import('components/molecules/ProductMolecule/ProductBreadcrumbs'));
const AboutProductDetailPackage = React.lazy(() => import('components/molecules/ProductMolecule/AboutProductDetailPackage'));
const ProductCart = React.lazy(() => import('components/molecules/ProductMolecule/ProductCart'));
const ProductBreadcrumbsSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductBreadcrumbsSkeleton'));
const ProductImageSlideSkeletonHorizontal = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductImageSlideSkeletonHorizontal'));
const ProductImageSlideSkeletonVertical = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductImageSlideSkeletonVertical'));
const ProductDetailInfoSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductDetailInfoSkeleton'));
const ProductDetailAboutSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductDetailAboutSkeleton'));

const ProductDetailPackageOrganism = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                    {props.loading ? (
                        <ProductBreadcrumbsSkeleton />
                    ):(
                        <ProductBreadcrumbs category={props.breadcumb} type={'package-product'} />
                    )}
                    <Hidden only={['lg', 'xl']}>
                        {props.loading ? (
                            <ProductImageSlideSkeletonHorizontal />
                        ):(
                            <ProductImageSlide
                                type={'horizontal-slide'}
                                media={props.product?.media}
                                slide={props.slide}
                                handleMultiSlide={props.handleMultiSlide} />
                        )}
                    </Hidden>
                    <Hidden only={['xs','sm', 'md']}>
                        {props.loading ? (
                            <ProductImageSlideSkeletonVertical />
                        ):(
                            <ProductImageSlide
                                type={'vertical-slide'}
                                media={props.product?.media}
                                slide={props.slide}
                                handleMultiSlide={props.handleMultiSlide} />
                        )}
                    </Hidden>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                    {props.loading ? (
                        <ProductDetailInfoSkeleton />
                    ):(
                        <ProductDetailInfo
                            productType={props.productType}
                            productLabel={props.product?.packageMeta?.typeDisplayName}
                            productName={props.product?.packageMeta?.label}
                            name={props.product?.name}
                            availability={props.product?.availability}
                            stock={props.product?.stock}
                            price={props.product?.price}
                            netPrice={props.product?.netPrice}
                            typeDownload={'package-product'}
                            baseHref={props.product?.href}
                            itemProduct={props.product?.packageItems}
                            valueDownload={props.valueDownload}
                            handleChangeDownload={props.handleChangeDownload}
                            fileDownload={props.fileDownload}
                            handleDownload={props.handleDownload}
                            openRequestStock={props.openRequestStock}
                            handleCloseRequestStock={props.handleCloseRequestStock}
                            handleShowRequestStock={props.handleShowRequestStock}
                            handleSubmitRequestStock={props.handleSubmitRequestStock}
                            openSimulation={props.openSimulation}
                            handleShowSimulation={props.handleShowSimulation}
                            handleCloseSimulation={props.handleCloseSimulation}
                            indexInstallment={props.indexInstallment}
                            handleChooseBankInstallment={props.handleChooseBankInstallment}
                            weight={props.product?.weight}
                            openShipiingCost={props.openShipiingCost}
                            handleOpenShippingCost={props.handleOpenShippingCost}
                            handleCloseShippingCost={props.handleCloseShippingCost}
                            vendorShipment={props.vendorShipment}
                            openReport={props.openReport}
                            handleShowReport={props.handleShowReport}
                            handleCloseReport={props.handleCloseReport}
                            handleSubmitReportProduct={props.handleSubmitReportProduct}
                            relatedPackages={props.product?.relatedPackages !== null ? props.product?.relatedPackages : []}
                            handleChangePackage={props.handleChangePackage}
                            handlePostWishlist={props.handlePostWishlist}
                            handleDeleteWishlist={props.handleDeleteWishlist}
                            isWishlist={props.product?.isWishlist !== undefined ? props.product?.isWishlist : false}
                            href={props.product?.href !== undefined ? props.product?.href : null}
                            handleAddToCart={props.handleAddToCart}
                            shortLink={props.shortLink}
                            handleCopyShortLink={props.handleCopyShortLink}
                            openShortLink={props.openShortLink}
                            handleOpenSharingUrl={props.handleOpenSharingUrl}
                            buttonLoading={props.buttonLoading}
                            tariff={props.tariff}
                            message={props.message}
                            showTable={props.showTable}
                            handleCalculate={props.handleCalculate}
                            quantity={props.quantity}
                            maxQuantity={props.product.maxQuantity}
                            wholesalePriceLists={props.product.wholesalePriceLists}
                            handleQuantity={props.handleQuantity}
                            openWholesale={props.openWholesale}
                            handleShowWholesale={props.handleShowWholesale}
                            handleCloseWholesale={props.handleCloseWholesale}
                        />
                    )}
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {props.loading ? (
                        <ProductDetailAboutSkeleton />
                    ):(
                        <AboutProductDetailPackage
                            itemProducts={props.product?.packageItems}
                            valueTabProduct={props.valueTabProduct}
                            handleChangeTabProduct={props.handleChangeTabProduct}
                            aboutProduct={props.aboutProduct}
                            valueDetailTabProduct={props.valueDetailTabProduct}
                            handleChangeTab={props.handleChangeTab}
                            videos={props.productDetail?.videos}
                            handleShowYoutube={props.handleShowYoutube}
                            openYoutube={props.openYoutube}
                            youtubeId={props.youtubeId}
                            handleCloseYoutube={props.handleCloseYoutube}
                            fullWidth={props.youtube?.fullWidth}
                            maxWidth={props.youtube?.maxWidth}
                            description={props.productDetail?.description}
                            specifications={props.productDetail?.specifications}
                            valueSpecification={props.valueSpecification}
                            handleChangeTabSpecification={props.handleChangeTabSpecification}
                            brand={props.productDetail?.brand}
                            name={props.productDetail?.name}
                            code={props.productDetail?.code}
                            reviews={props.reviews}
                            pageReview={props.pageReview}
                            viewPage={props.viewPage}
                            paginationReview={props.paginationReview}
                            handleChangePaginationReview={props.handleChangePaginationReview}
                            handleProductViewListReview={props.handleProductViewListReview}
                            detailReview={props.detailReview}
                        />
                    )}
                </Grid>
            </Grid>
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

ProductDetailPackageOrganism.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(ProductDetailPackageOrganism);