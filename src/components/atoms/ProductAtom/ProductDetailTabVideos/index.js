import { React, SlickSlider, Suspense, faPlay } from 'libraries';

const PrevArrow = React.lazy(() => import('components/atoms/SlickAtom/PrevArrow'));
const NextArrow = React.lazy(() => import('components/atoms/SlickAtom/NextArrow'));
const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const ProductDetailTabVideos = (props) => {

    const settingSlideVideos = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        swipeToSlide: false,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <Suspense fallback={null}>
            {props.videos?.length > 0 &&
                props.videos.map((item, index) => {
                    return (
                        <div key={index} className={'product__detail__videos'}>
                            <div className={'fs-20 tx-c mb-32 fw-400'}>{item.category}</div>
                            <SlickSlider {...settingSlideVideos}>
                                {item.videos.map((video, key) => {
                                    return (
                                        <div key={key} className={'product__detail__videos--box pointer'}
                                            onClick={() => props.handleShowYoutube(video.youtubeId)}
                                        >
                                            <img src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                                 className={'w-100'}
                                                 alt={video.youtubeId} />
                                                 <IconAtom icon={faPlay} styleIcon={'c-grey fs-3rem ps-ab xy-center'} />
                                        </div>
                                    )
                                })}
                            </SlickSlider>
                        </div>
                    );
                })
            }
        </Suspense>
    );
};

export default ProductDetailTabVideos;