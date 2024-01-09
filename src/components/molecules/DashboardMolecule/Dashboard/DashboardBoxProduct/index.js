import {React, Suspense, Grid, useTranslation, useHistory, Skeleton} from 'libraries';
import {getHostUrl, getIdentityFromHref} from "utils";

const DashboardProductItem = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardProductItem'));
const ProductItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductItemSkeleton'));

const DashboardBoxProduct = (props) => {

    const t = useTranslation();
    const history = useHistory();

    const hanndleProductToDetail = (slug, code) => {
        if (code !== null) {
            history.push(`/product/${slug}`);
        }
        else {
            history.push(`/product/package-deal/${slug}`);
        };
    };

    return (
        <Suspense fallback={null}>
            <div className={'bgc-white border-radius-10px box-shadow-box'}>
                <div className={'p-16 border-bottom-2px fs-18 fw-400'}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            {props.loading ? (
                                <Skeleton variant={'text'} width={'50%'} height={40} />
                            ):(
                                props.titleName
                            )}
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            {props.loading ? (
                                <Skeleton variant={'text'} width={'50%'} height={40} className={'fl-r'} />
                            ):(
                                <div className={'fw-none ta-r pointer'} onClick={() => props.handleSeeMore(props.href)}>
                                    {t('label.seeMore')}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={'p-16'}>
                    {props.loading ? (
                        <Grid container spacing={2}>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <ProductItemSkeleton />
                            </Grid>
                        </Grid>
                    ):(
                        props.productHistory === null ? (
                            <Grid container spacing={2}>
                                {props.products?.length > 0 &&
                                    props.products.map((item, index) => {
                                        const image = getHostUrl(item.product?.image);
                                        const slug = getIdentityFromHref(item.product?.href);
                                        return (
                                            <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                                                <DashboardProductItem
                                                    image={image}
                                                    brand={item.product?.brand?.name}
                                                    name={item.product?.name}
                                                    code={item.product?.code}
                                                    slug={slug}
                                                    hanndleProductToDetail={() => hanndleProductToDetail(slug, item.product?.code)}
                                                />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        ):(
                            <Grid container spacing={2}>
                                {props.products?.length > 0 &&
                                    props.productHistory.map((item, index) => {
                                        const slug = getIdentityFromHref(item.href);
                                        const product = props.products.find(result => getIdentityFromHref(result.href) === slug);
                                        const image = getHostUrl(product?.image);
                                        return (
                                            <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                                                <DashboardProductItem
                                                    image={image}
                                                    brand={product?.brand?.name}
                                                    name={product?.name}
                                                    code={product?.code}
                                                    slug={slug}
                                                    hanndleProductToDetail={() => hanndleProductToDetail(slug, product?.code)}
                                                />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        )
                    )}
                </div>
                {!props.loading && props.products?.length === 0 &&
                    <div className={'mt-16 fs-24 tx-c'}>
                        {t('message.thereIsNoProduct')}
                    </div>
                }
            </div>
        </Suspense>
    );
};

export default DashboardBoxProduct;