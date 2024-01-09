import { React, SlickSlider, Grid, EmptyProduct, FontAwesomeIcon, faChevronDown, faChevronUp, Image, Suspense } from 'libraries';
import {getHostUrl} from "utils";

const PrevArrowHorizontal = React.lazy(() => import('components/atoms/SlickAtom/PrevArrow'));
const NextArrowHorizontal = React.lazy(() => import('components/atoms/SlickAtom/NextArrow'));

const PrevArrowVertical = (props) => {
    const { className, onClick } = props
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronUp} color="#000"/>
        </div>
    );
};

const NextArrowVertical = (props) => {
    const { className, onClick } = props
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronDown} color="#000"/>
        </div>
    );
};

const ProductImageSlide = (props) => {

    const { media, className, onClick } = props;

    const settingVertical = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        prevArrow: <PrevArrowVertical />,
        nextArrow: <NextArrowVertical />
    };

    const settingHorizontal = {
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: false,
        verticalSwiping: false,
        swipeToSlide: false,
        prevArrow: <PrevArrowHorizontal className={className} onClick={onClick} />,
        nextArrow: <NextArrowHorizontal className={className} onClick={onClick} />
    };

    const verticalImageSlider = (
        <Suspense fallback={null}>
            <div className={'product__detail__image'}>
                <Grid container spacing={2}>
                    <Grid item lg={2}>
                        <SlickSlider {...settingVertical}>
                            {media?.length > 0 ?
                                media.map((item, key) => {
                                    return (
                                        <div key={key}
                                             className={`multiple__slide__image w-80 
                                     ${props.slide.key === key ? 'multiple__slide__image--active' : ''}`}
                                             onClick={() => props.handleMultiSlide(item, key)}>
                                            <img src={item.image === null ? EmptyProduct : getHostUrl(item.image)}
                                                 className="w-100" alt={'product-slider'} />
                                        </div>
                                    );
                                })
                                :
                                <div className={`multiple__slide__image w-80 multiple__slide__image--active`}>
                                    <img src={EmptyProduct}
                                         className="w-100" alt={'product-slider'} />
                                </div>
                            }
                        </SlickSlider>
                    </Grid>
                    <Grid item lg={10}>
                        <div className="multiple__slide__image--primary">
                            <Image src={props.slide.image === null ? EmptyProduct : getHostUrl(props.slide.image)}
                                   className="w-100" alt='primary-product-image'  />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );

    const horizontalImageSLider = (
        <Suspense fallback={null}>
            <div className={'product__detail__image'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className="multiple__slide__image--primary">
                            <Image src={props.slide.image === null ? EmptyProduct : getHostUrl(props.slide.image)}
                                   className="w-100" alt='primary-product-image'  />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={11}>
                        <SlickSlider {...settingHorizontal}>
                            {media?.length > 0 ?
                                media.map((item, key) => {
                                    return (
                                        <div key={key}
                                             className={`multiple__slide__image w-80 
                                     ${props.slide.key === key ? 'multiple__slide__image--active' : ''}`}
                                             onClick={() => props.handleMultiSlide(item, key)}>
                                            <img src={item.image === null ? EmptyProduct : getHostUrl(item.image)}
                                                 className="w-100" alt={'product-slider'} />
                                        </div>
                                    );
                                })
                                :
                                <div className={`multiple__slide__image w-80 multiple__slide__image--active`}>
                                    <img src={EmptyProduct}
                                         className="w-100" alt={'product-slider'} />
                                </div>
                            }
                        </SlickSlider>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );

    switch (props.type) {
        case 'vertical-slide':
            return verticalImageSlider;
        case 'horizontal-slide':
            return horizontalImageSLider;
        default:
            return horizontalImageSLider;
    }
};

export default ProductImageSlide;