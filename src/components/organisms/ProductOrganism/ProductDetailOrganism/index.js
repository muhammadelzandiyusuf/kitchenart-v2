import {React, Suspense, Grid, useTranslation, PropTypes, withWidth, Hidden} from 'libraries';

const ProductImageSlide = React.lazy(() => import('components/molecules/ProductMolecule/ProductImageSlide'));
const ProductBreadcrumbs = React.lazy(() => import('components/molecules/ProductMolecule/ProductBreadcrumbs'));
const ProductDetailInfo = React.lazy(() => import('components/molecules/ProductMolecule/ProductDetailInfo'));
const AboutProductDetail = React.lazy(() => import('components/molecules/ProductMolecule/AboutProductDetail'));
const ProductDetailRelated = React.lazy(() => import('components/molecules/ProductMolecule/ProductDetailRelated'));
const ProductDetailInfoSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductDetailInfoSkeleton'));
const ProductBreadcrumbsSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductBreadcrumbsSkeleton'));
const ProductImageSlideSkeletonHorizontal = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductImageSlideSkeletonHorizontal'));
const ProductImageSlideSkeletonVertical = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductImageSlideSkeletonVertical'));
const ProductCart = React.lazy(() => import('components/molecules/ProductMolecule/ProductCart'));
const ProductDetailAboutSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductDetailAboutSkeleton'));

const ProductDetailOrganism = (props) => {

    const t = useTranslation();
    const { product, slide, handleMultiSlide, handleChangeProduct, valueSpecification, handleChangeTabSpecification } = props;

    return (
        <Suspense fallback={null}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                    {props.loading ? (
                        <ProductBreadcrumbsSkeleton />
                    ):(
                        <ProductBreadcrumbs category={product?.category} />
                    )}
                    <Hidden only={['lg', 'xl']}>
                        {props.loading ? (
                            <ProductImageSlideSkeletonHorizontal />
                        ):(
                            <ProductImageSlide
                                type={'horizontal-slide'}
                                media={product?.images}
                                slide={slide}
                                handleMultiSlide={handleMultiSlide} />
                        )}
                    </Hidden>
                    <Hidden only={['xs','sm', 'md']}>
                        {props.loading ? (
                            <ProductImageSlideSkeletonVertical />
                        ):(
                            <ProductImageSlide
                                type={'vertical-slide'}
                                media={product?.images}
                                slide={slide}
                                handleMultiSlide={handleMultiSlide} />
                        )}
                    </Hidden>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                    {props.loading ? (
                        <ProductDetailInfoSkeleton />
                    ):(
                        <ProductDetailInfo
                            brand={product?.brand}
                            name={product?.name}
                            code={product?.code}
                            availability={product?.availability}
                            stock={product?.stock}
                            catalogFile={product?.catalogFile}
                            manualFile={product?.manualFile}
                            cuttingImage={product?.cuttingImage}
                            handleDownload={props.handleDownload}
                            price={product?.price}
                            netPrice={product?.netPrice}
                            variants={product?.variants}
                            handleChangeProduct={handleChangeProduct}
                            warranty={product?.warranty}
                            handleCloseReport={props.handleCloseReport}
                            openReport={props.openReport}
                            handleShowReport={props.handleShowReport}
                            handleSubmitReportProduct={props.handleSubmitReportProduct}
                            handleCloseRequestStock={props.handleCloseRequestStock}
                            openRequestStock={props.openRequestStock}
                            handleShowRequestStock={props.handleShowRequestStock}
                            handleSubmitRequestStock={props.handleSubmitRequestStock}
                            openSimulation={props.openSimulation}
                            handleCloseSimulation={props.handleCloseSimulation}
                            handleShowSimulation={props.handleShowSimulation}
                            indexInstallment={props.indexInstallment}
                            handleChooseBankInstallment={props.handleChooseBankInstallment}
                            openShipiingCost={props.openShipiingCost}
                            handleCloseShippingCost={props.handleCloseShippingCost}
                            handleOpenShippingCost={props.handleOpenShippingCost}
                            weight={product?.weight}
                            vendorShipment={props.vendorShipment}
                            relatedPackages={product?.activePackages}
                            baseHref={product?.href}
                            productType={'base'}
                            activePromotion={product?.activePromotion}
                            handleChangePackage={props.handleChangePackage}
                            handlePostWishlist={props.handlePostWishlist}
                            handleDeleteWishlist={props.handleDeleteWishlist}
                            isWishlist={product?.isWishlist !== undefined ? product?.isWishlist : false}
                            href={product?.href}
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
                            maxQuantity={product.maxQuantity}
                            wholesalePriceLists={product.wholesalePriceLists}
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
                        <AboutProductDetail
                            aboutProduct={props.aboutProduct}
                            value={props.value}
                            handleChangeTab={props.handleChangeTab}
                            description={product?.description}
                            specifications={product?.specifications}
                            valueSpecification={valueSpecification}
                            handleChangeTabSpecification={handleChangeTabSpecification}
                            videos={product?.videos}
                            handleShowYoutube={props.handleShowYoutube}
                            fullWidth={props.yotube.fullWidth}
                            maxWidth={props.yotube.maxWidth}
                            openYoutube={props.openYoutube}
                            youtubeId={props.youtubeId}
                            handleCloseYoutube={props.handleCloseYoutube}
                            discussions={props.discussions}
                            productRelateds={product?.related}
                            handleCloseAddProductLink={props.handleCloseAddProductLink}
                            openAddProductLink={props.openAddProductLink}
                            handleShowAddProductLink={props.handleShowAddProductLink}
                            checkedProductLink={props.checkedProductLink}
                            handleCheckProductLink={props.handleCheckProductLink}
                            productLinks={props.productLinks}
                            handleSearch={props.handleSearch}
                            count={props.count}
                            productChosen={props.productChosen}
                            itemProductLink={props.itemProductLink}
                            selectItemShow={props.selectItemShow}
                            handleShowSelectItem={props.handleShowSelectItem}
                            handleRemoveProductLink={props.handleRemoveProductLink}
                            handlePostDiscussion={props.handlePostDiscussion}
                            handleReplyDiscussion={props.handleReplyDiscussion}
                            customer={props.customer}
                            handleSeeMoreReplies={props.handleSeeMoreReplies}
                            replies={props.replies}
                            indexedReplies={props.indexedReplies}
                            page={props.page}
                            view={props.view}
                            handleChangePagination={props.handleChangePagination}
                            handleView={props.handleView}
                            loading={props.loading}
                            paginationDiscussion={props.paginationDiscussion}
                            brand={product?.brand}
                            name={product?.name}
                            code={product?.code}
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
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {product?.related?.length > 0 &&
                        <ProductDetailRelated title={t('label.similiarProduct')}
                                              products={product?.related}
                                              handleUrl={handleChangeProduct}
                                              type={'button'}
                                              handleSeeMore={props.handleSeeMore}
                                              href={product?.category?.href}
                                              detail={true}
                                              isInstallment={true}
                                              loading={props.loading}
                                              param={'related'}
                                              discountView={true}
                        />
                    }
                    {product?.consumables?.length > 0 &&
                        <ProductDetailRelated title={t('label.consumables')}
                                              products={product?.consumables}
                                              handleUrl={handleChangeProduct}
                                              type={'slider'}
                                              handleSeeMore={props.handleSeeMore}
                                              href={product?.category?.href}
                                              detail={true}
                                              isInstallment={true}
                                              loading={props.loading}
                                              param={'consumables'}
                                              discountView={true}
                        />
                    }
                    {product?.accessories?.length > 0 &&
                        <ProductDetailRelated title={t('label.accessories')}
                                              products={product?.accessories}
                                              handleUrl={handleChangeProduct}
                                              type={'slider'}
                                              handleSeeMore={props.handleSeeMore}
                                              href={product?.category?.href}
                                              detail={true}
                                              isInstallment={true}
                                              loading={props.loading}
                                              param={'accessories'}
                                              discountView={true}
                        />
                    }
                    {product?.series?.length > 0 &&
                        <ProductDetailRelated title={t('label.productSeries')}
                                              products={product?.series[0]?.products}
                                              handleUrl={handleChangeProduct}
                                              type={'slider'}
                                              handleSeeMore={props.handleSeeMore}
                                              href={product?.category?.href}
                                              detail={true}
                                              isInstallment={true}
                                              loading={props.loading}
                                              param={'series'}
                                              discountView={true}
                        />
                    }
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

ProductDetailOrganism.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(ProductDetailOrganism);