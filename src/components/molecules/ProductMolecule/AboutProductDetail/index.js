import {React, Suspense, Grid, PropTypes, withWidth, Hidden} from 'libraries';
import {findItemInObject, getIdentityFromHref} from "utils";

const TabAtom = React.lazy(() => import('components/atoms/TabMaterialAtom/TabAtom'));
const TabPanelAtom = React.lazy(() => import('components/atoms/TabMaterialAtom/TabPanelAtom'));
const ProductDetailTabDescription = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailTabDescription'));
const ProductDetailTabSpecification = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailTabSpecification'));
const ProductDetailTabVideos = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailTabVideos'));
const ProductDetailPopupVideo = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailPopupVideo'));
const ProductDetailTabDiscussion = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailTabDiscussion'));
const ProductDetailAddProductLink = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailAddProductLink'));
const ProductResult = React.lazy(() => import('components/molecules/ProductMolecule/ProductResult'));
const ProductDetailReview = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailReview'));
const Pagination = React.lazy(() => import('components/atoms/PaginationAtom'));
const ProductDetailReviewCustomer = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailReviewCustomer'));

const AboutProductDetail = (props) => {

    const { aboutProduct, value, handleChangeTab, valueSpecification, handleChangeTabSpecification, paginationDiscussion,
        paginationReview} = props;

    let paginationFirst = { disabled: true, value: 1, href: '' };
    let paginationPrev = { disabled: true, value: 1, href: '' };
    let paginationNext = { disabled: true, value: 2, href: '' };
    let paginationLast = { disabled: true, value: paginationDiscussion?.total, href: '' };

    let linlkPaginations = [];
    if (paginationDiscussion?.link !== '') {
        let dataPagination = paginationDiscussion?.link.replace(/[<>"]/g,'');
        dataPagination = dataPagination.split(',');
        if (dataPagination?.length > 0) {
            dataPagination.forEach(data => {
                let array = [];
                const pagePagination = data.split(';');
                array = {
                    href: pagePagination[0],
                    rel: pagePagination[1].replace(' rel=', ''),
                    title: pagePagination[2].replace(' title=', '')
                };
                linlkPaginations.push(array);
            });
        };
    };

    if (linlkPaginations?.length > 0) {
        const pageLinksFirst = findItemInObject(linlkPaginations, 'rel', 'first');
        const pageLinksPrev = findItemInObject(linlkPaginations, 'rel', 'prev');
        const pageLinksNext = findItemInObject(linlkPaginations, 'rel', 'next');
        const pageLinksLast = findItemInObject(linlkPaginations, 'rel', 'last');

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

    let paginationFirstReview = { disabled: true, value: 1, href: '' };
    let paginationPrevReview = { disabled: true, value: 1, href: '' };
    let paginationNextReview = { disabled: true, value: 2, href: '' };
    let paginationLastReview = { disabled: true, value: paginationReview?.total, href: '' };

    let linlkPaginationsReview = [];
    if (paginationReview?.link !== '') {
        let dataPaginationReview = paginationReview?.link.replace(/[<>"]/g,'');
        dataPaginationReview = dataPaginationReview.split(',');
        if (dataPaginationReview?.length > 0) {
            dataPaginationReview.forEach(data => {
                let arrayReview = [];
                const pagePaginationReview = data.split(';');
                arrayReview = {
                    href: pagePaginationReview[0],
                    rel: pagePaginationReview[1].replace(' rel=', ''),
                    title: pagePaginationReview[2].replace(' title=', '')
                };
                linlkPaginationsReview.push(arrayReview);
            });
        };
    };

    if (linlkPaginationsReview?.length > 0) {
        const pageLinksFirstReview = findItemInObject(linlkPaginationsReview, 'rel', 'first');
        const pageLinksPrevReview = findItemInObject(linlkPaginationsReview, 'rel', 'prev');
        const pageLinksNextReview = findItemInObject(linlkPaginationsReview, 'rel', 'next');
        const pageLinksLastReview = findItemInObject(linlkPaginationsReview, 'rel', 'last');

        if (pageLinksFirstReview?.rel !== null) {
            const href = getIdentityFromHref(pageLinksFirstReview?.href);
            paginationFirstReview = { disabled: false, value: pageLinksFirstReview?.title, href: href };
        };
        if (pageLinksPrevReview?.rel !== null) {
            const href = getIdentityFromHref(pageLinksPrevReview?.href);
            paginationPrevReview = { disabled: false, value: pageLinksPrevReview?.title, href: href };
        };
        if (pageLinksNextReview?.rel !== null) {
            const href = getIdentityFromHref(pageLinksNextReview?.href);
            paginationNextReview = { disabled: false, value: pageLinksNextReview?.title, href: href };
        };
        if (pageLinksLastReview?.rel !== null) {
            const href = getIdentityFromHref(pageLinksLastReview?.href);
            paginationLastReview = { disabled: false, value: pageLinksLastReview?.title, href: href };
        };
    };

    return (
        <Suspense fallback={null}>
            <div className={'product__detail__info mb-48'}>
                <Hidden only={['lg', 'xl']}>
                    <TabAtom scrool={'auto'} menuTop={aboutProduct} value={value} handleChange={handleChangeTab}
                             styleTab={'border-bottom product__detail__about--tab'} variant={'scrollable'}
                    />
                </Hidden>
                <Hidden only={['xs','sm', 'md']}>
                    <TabAtom menuTop={aboutProduct} value={value} handleChange={handleChangeTab} centered={true}
                             styleTab={'border-bottom product__detail__about--tab'}
                    />
                </Hidden>
                <TabPanelAtom value={value} index={0}>
                    <ProductDetailTabVideos videos={props.videos} handleShowYoutube={props.handleShowYoutube} />
                    <ProductDetailPopupVideo
                        handleCloseYoutube={props.handleCloseYoutube}
                        fullWidth={props.fullWidth}
                        maxWidth={props.maxWidth}
                        openYoutube={props.openYoutube}
                        youtubeId={props.youtubeId}
                    />
                </TabPanelAtom>
                <TabPanelAtom value={value} index={1}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <ProductDetailTabDescription description={props.description} />
                        </Grid>
                    </Grid>
                </TabPanelAtom>
                <TabPanelAtom value={value} index={2}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ProductDetailTabSpecification
                                specifications={props.specifications}
                                value={valueSpecification}
                                handleChange={handleChangeTabSpecification}
                            />
                        </Grid>
                    </Grid>
                </TabPanelAtom>
                <TabPanelAtom value={value} index={3}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <ProductDetailReview
                                brand={props.brand}
                                name={props.name}
                                code={props.code}
                                reviews={props.reviews}
                                detailReview={props.detailReview}
                            />
                            <ProductDetailReviewCustomer
                                reviews={props.reviews}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <Pagination
                                styleBoxPagination={'pagination__box'} count={props.countPagination} page={props.pageReview}
                                handleChange={props.handleChangePaginationReview} variant={'outlined'} shape={'rounded'}
                                first={paginationFirstReview} prev={paginationPrevReview} next={paginationNextReview}
                                last={paginationLastReview} loading={props.loading}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <ProductResult stylePage={'fl-r pr-10 mb-32'} type={'page-product'} view={props.viewPage}
                                           handleView={props.handleProductViewListReview} loading={props.loading} />
                        </Grid>
                    </Grid>
                </TabPanelAtom>
                <TabPanelAtom value={value} index={4}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <ProductDetailTabDiscussion
                                discussions={props.discussions}
                                handleShowAddProductLink={props.handleShowAddProductLink}
                                itemProductLink={props.itemProductLink}
                                selectItemShow={props.selectItemShow}
                                handleRemoveProductLink={props.handleRemoveProductLink}
                                handlePostDiscussion={props.handlePostDiscussion}
                                handleReplyDiscussion={props.handleReplyDiscussion}
                                customer={props.customer}
                                handleSeeMoreReplies={props.handleSeeMoreReplies}
                                replies={props.replies}
                                indexedReplies={props.indexedReplies}
                            />
                            <ProductDetailAddProductLink
                                productRelateds={props.productRelateds}
                                handleCloseAddProductLink={props.handleCloseAddProductLink}
                                openAddProductLink={props.openAddProductLink}
                                checkedProductLink={props.checkedProductLink}
                                handleCheckProductLink={props.handleCheckProductLink}
                                productLinks={props.productLinks}
                                handleSearch={props.handleSearch}
                                count={props.count}
                                productChosen={props.productChosen}
                                handleShowSelectItem={props.handleShowSelectItem}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <Pagination
                                styleBoxPagination={'pagination__box'} count={props.countPagination} page={props.page}
                                handleChange={props.handleChangePagination} variant={'outlined'} shape={'rounded'}
                                first={paginationFirst} prev={paginationPrev} next={paginationNext} last={paginationLast}
                                loading={props.loading}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <ProductResult stylePage={'fl-r pr-10 mb-32'} type={'page-product'} view={props.view}
                                           handleView={props.handleView} loading={props.loading} />
                        </Grid>
                    </Grid>
                </TabPanelAtom>
            </div>
        </Suspense>
    );
};

AboutProductDetail.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(AboutProductDetail);