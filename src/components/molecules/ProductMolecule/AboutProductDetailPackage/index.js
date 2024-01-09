import {React, Suspense, tabStyles, Tabs, Tab, PropTypes, withWidth, Hidden, Grid} from 'libraries';
import {findItemInObject, getIdentityFromHref} from "utils";

const TabAtom = React.lazy(() => import('components/atoms/TabMaterialAtom/TabAtom'));
const TabPanelAtom = React.lazy(() => import('components/atoms/TabMaterialAtom/TabPanelAtom'));
const ProductDetailTabVideos = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailTabVideos'));
const ProductDetailPopupVideo = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailPopupVideo'));
const ProductDetailTabDescription = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailTabDescription'));
const ProductDetailTabSpecification = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailTabSpecification'));
const ProductResult = React.lazy(() => import('components/molecules/ProductMolecule/ProductResult'));
const ProductDetailReview = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailReview'));
const Pagination = React.lazy(() => import('components/atoms/PaginationAtom'));
const ProductDetailReviewCustomer = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailReviewCustomer'));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
};

const AboutProductDetailPackage = (props) => {

    const { paginationReview } = props;
    const classes = tabStyles();

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
            <div className={'product__detail__info'}>
                <div className={`${classes.rootTab} style__view--mobile`}>
                    <Tabs
                        value={props.valueTabProduct}
                        onChange={props.handleChangeTabProduct}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant={'scrollable'}
                        scrollButtons={'auto'}
                        aria-label="scrollable auto tabs example"
                    >
                        {props.itemProducts?.length > 0 &&
                            props.itemProducts.map((item, index) => {
                            return (
                                <Tab key={index} className="mw-100" label={item?.product?.name} {...a11yProps(index)} />
                            );
                        })}
                    </Tabs>
                </div>
                <div className={`${classes.rootTab} style__view--desktop`}>
                    <Tabs
                        value={props.valueTabProduct}
                        onChange={props.handleChangeTabProduct}
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="tab-product-detail"
                        centered={true}
                        className={'border-bottom'}
                    >
                        {props.itemProducts?.length > 0 &&
                            props.itemProducts.map((item, index) => {
                            return (
                                <Tab key={index} className="mw-100" label={item?.product?.name} {...a11yProps(index)} />
                            );
                        })}
                    </Tabs>
                </div>
                {props.itemProducts?.length > 0 &&
                    props.itemProducts.map((product, index) => {
                    return (
                        <TabPanelAtom key={index} value={props.valueTabProduct} index={index}>
                            <Hidden only={['lg', 'xl']}>
                                <TabAtom scrool={'auto'}
                                         menuTop={props.aboutProduct}
                                         value={props.valueDetailTabProduct}
                                         handleChange={props.handleChangeTab}
                                         styleTab={'border-bottom product__detail__about--tab'}
                                         variant={'scrollable'}
                                         typeTab={'package'}
                                />
                            </Hidden>
                            <Hidden only={['xs','sm', 'md']}>
                                <TabAtom menuTop={props.aboutProduct}
                                         value={props.valueDetailTabProduct}
                                         handleChange={props.handleChangeTab}
                                         centered={true}
                                         styleTab={'border-bottom product__detail__about--tab'}
                                         typeTab={'package'}
                                />
                            </Hidden>
                            <TabPanelAtom value={props.valueDetailTabProduct} index={0}>
                                <ProductDetailTabVideos videos={props.videos} handleShowYoutube={props.handleShowYoutube} />
                                <ProductDetailPopupVideo
                                    handleCloseYoutube={props.handleCloseYoutube}
                                    fullWidth={props.fullWidth}
                                    maxWidth={props.maxWidth}
                                    openYoutube={props.openYoutube}
                                    youtubeId={props.youtubeId}
                                />
                            </TabPanelAtom>
                            <TabPanelAtom value={props.valueDetailTabProduct} index={1}>
                                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={5}>
                                        <ProductDetailTabDescription description={props.description} />
                                    </Grid>
                                </Grid>
                            </TabPanelAtom>
                            <TabPanelAtom value={props.valueDetailTabProduct} index={2}>
                                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <ProductDetailTabSpecification
                                            specifications={props.specifications}
                                            value={props.valueSpecification}
                                            handleChange={props.handleChangeTabSpecification}
                                        />
                                    </Grid>
                                </Grid>
                            </TabPanelAtom>
                            <TabPanelAtom value={props.valueDetailTabProduct} index={3}>
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
                        </TabPanelAtom>
                    );
                })}
            </div>
        </Suspense>
    );
};

AboutProductDetailPackage.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(AboutProductDetailPackage);