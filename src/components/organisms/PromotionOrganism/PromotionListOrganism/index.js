import {React, Suspense, Grid, useForm} from 'libraries';
import {convertDate, findItemInObject, getHostUrl, getIdentityFromHref} from "utils";

const SearchAtom = React.lazy(() => import('components/atoms/SearchAtom'));
const PromotionItem = React.lazy(() => import('components/molecules/PromotionMolecule/PromotionItem'));
const Pagination = React.lazy(() => import('components/atoms/PaginationAtom'));
const ProductResult = React.lazy(() => import('components/molecules/ProductMolecule/ProductResult'));
const PromotionSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/PromotionSkeleton'));

const PromotionOrganism = (props) => {

    const {register, handleSubmit} = useForm();

    let paginationFirst = { disabled: true, value: 1, href: '' };
    let paginationPrev = { disabled: true, value: 1, href: '' };
    let paginationNext = { disabled: true, value: 2, href: '' };
    let paginationLast = { disabled: true, value: props.paginations?.total, href: '' };

    let linlkPaginations = [];
    if (props.paginations?.link !== '') {
        let dataPagination = props.paginations?.link.replace(/[<>"]/g,'');
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

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'mt-30 w-100'}>
                        {props.active !== 'promotion' &&
                            <SearchAtom
                                handleSubmit={handleSubmit}
                                register={register}
                                styleSearch={'w-100'}
                                handleSearch={props.handleSearchPromotion}
                                type={'promotion'}
                                styleForm={'w-30 fl-r mb-32'}
                            />
                        }
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {props.promotions?.length > 0 && props.active !== 'promotion' &&
                    props.promotions.map((promotion, index) => {
                        if (props.loading) {
                            return (
                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                    <PromotionSkeleton />
                                </Grid>
                            )
                        }
                        else {
                            const href = getIdentityFromHref(promotion?.href);
                            const thumbnail = getHostUrl(promotion?.thumbnail);
                            const validFrom = convertDate(promotion?.validFrom, 'DD MMMM');
                            const validTo = convertDate(promotion?.validTo, 'DD MMMM YYYY');
                            return (
                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                    <PromotionItem
                                        href={href}
                                        description={promotion?.description}
                                        minimumOrderAmount={promotion?.minimumOrderAmount}
                                        validFrom={validFrom}
                                        validTo={validTo}
                                        thumbnail={thumbnail}
                                        active={props.active}
                                        code={promotion?.code}
                                        handleMoreDetail={() => props.handleMoreDetail(href)}
                                        type={promotion?.type}
                                    />
                                </Grid>
                            )
                        }
                    })
                }
                {props.active === 'promotion' && props.promotions?.length > 0 &&
                    props.promotions.map((promotion, index) => {
                        if (props.loading) {
                            return (
                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                    <PromotionSkeleton />
                                </Grid>
                            )
                        }
                        else {
                            const thumbnail = getHostUrl(promotion?.thumbnailImage);
                            const validFrom = convertDate(promotion?.validFrom, 'DD MMMM');
                            const validTo = convertDate(promotion?.validTo, 'DD MMMM YYYY');
                            return (
                                <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                    <PromotionItem
                                        thumbnail={thumbnail}
                                        active={props.active}
                                        description={promotion?.description}
                                        validFrom={validFrom}
                                        validTo={validTo}
                                        name={promotion?.name}
                                        handleMoreDetail={() => props.handleMoreDetail(promotion?.type)}
                                        type={promotion?.type}
                                    />
                                </Grid>
                            )
                        }
                    })
                }
            </Grid>
            {props.active !== 'promotion' &&
                <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Pagination
                            styleBoxPagination={'pagination__box'} count={props.countPagination} page={props.page}
                            handleChange={props.handleChangePagination} variant={'outlined'} shape={'rounded'}
                            first={paginationFirst} prev={paginationPrev} next={paginationNext} last={paginationLast}
                            loading={props.loading}
                        />
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ProductResult stylePage={'fl-r pr-10 mb-32'} type={'page-product'} view={props.view}
                                           handleView={props.handleView} loading={props.loading} />
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Suspense>
    );
};

export default PromotionOrganism;