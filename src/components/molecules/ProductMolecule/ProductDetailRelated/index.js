import {React, SlickSlider, Suspense, EmptyProduct, Grid, useTranslation, Skeleton} from 'libraries';
import {getHostUrl, getIdentityFromHref} from "utils";

const PrevArrow = React.lazy(() => import('components/atoms/SlickAtom/PrevArrow'));
const NextArrow = React.lazy(() => import('components/atoms/SlickAtom/NextArrow'));
const ProductItem = React.lazy(() => import('components/molecules/ProductMolecule/ProductItem'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const ProductItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductItemSkeleton'));

const ProductDetailRelated = (props) => {
    const t = useTranslation();
    const settingSlides = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipeToSlide: false,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                    prevArrow: false,
                    nextArrow: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    prevArrow: false,
                    nextArrow: false
                }
            }
        ]
    };

    return (
        <Suspense fallback={null}>
            <div className={'product__detail__related'}>
                <div className={'fs-24 tx-c fw-400 ta-c mb-32'}>
                    {props.loading ? (
                        <Skeleton type={'text'} width={'25%'} height={50} className={'ps-rv x-center mt-30'} />
                    ):(
                      <>
                          {props.title}
                      </>
                    )}
                </div>
                {props.type === 'slider' &&
                    <SlickSlider {...settingSlides}>
                        {props.products?.length > 0 &&
                            props.products.map((item, index) => {
                                if (props.loading) {
                                    return (
                                        <div className={'mr-16 w-92'} key={index}>
                                            <ProductItemSkeleton />
                                        </div>
                                    );
                                }
                                else {
                                    const href = getIdentityFromHref(item.href);
                                    return (
                                        <ProductItem
                                            key={index}
                                            image={item.image === null ? EmptyProduct : getHostUrl(item.image)}
                                            alt="product-image"
                                            brand={item.brand?.name}
                                            name={item.name}
                                            code={item.code}
                                            normalPrice={item.price}
                                            price={item.netPrice}
                                            cart={false}
                                            view={false}
                                            index={index + 1}
                                            href={href}
                                            handleUrl={props.handleUrl}
                                            discountView={false}
                                            compare={false}
                                            detail={props.detail}
                                            param={props.param}
                                            isInstallment={props.isInstallment}
                                        />
                                    );
                                }
                        })}
                    </SlickSlider>
                }
                {props.type === 'button' &&
                    <Grid container spacing={1}>
                        {props.products?.length > 0 &&
                            props.products.map((item, index) => {
                                if (props.loading) {
                                    return (
                                        <Grid item xs={6} sm={6} md={6} lg={3} key={index}>
                                            <div className={'mr-24'}>
                                                <ProductItemSkeleton />
                                            </div>
                                        </Grid>
                                    );
                                }
                                else {
                                    const href = getIdentityFromHref(item.href);
                                    return(
                                        <Grid item xs={6} sm={6} md={6} lg={3} key={index}>
                                            <ProductItem
                                                key={index}
                                                image={item.image === null ? EmptyProduct : getHostUrl(item.image)}
                                                alt="product-image"
                                                brand={item.brand?.name}
                                                name={item.name}
                                                code={item.code}
                                                normalPrice={item.price}
                                                price={item.netPrice}
                                                cart={false}
                                                view={false}
                                                index={index + 1}
                                                href={href}
                                                handleUrl={props.handleUrl}
                                                discountView={false}
                                                compare={false}
                                                detail={props.detail}
                                                param={props.param}
                                                isInstallment={props.isInstallment}
                                            />
                                        </Grid>
                                    )
                                }
                        })}
                        {props.products?.length > 4 &&
                            <Grid item lg={12}>
                                <div className={'ta-c mb-32'}>
                                    <ButtonAtom type={'button-text'}
                                                clicked={() => props.handleSeeMore(props.href)}
                                                styleView={'product__detail__related--button'}
                                                name={t('label.seeMore')} />
                                </div>
                            </Grid>
                        }
                    </Grid>
                }
            </div>
        </Suspense>
    );
};

export default ProductDetailRelated;