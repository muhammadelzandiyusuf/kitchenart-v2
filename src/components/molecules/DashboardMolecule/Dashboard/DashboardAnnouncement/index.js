import {React, Suspense, SlickSlider} from 'libraries';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DashboardAnnouncement = (props) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const handleAnnouncement = (href) => {
        window.open(href, "_blank")
    };

    return (
        <Suspense fallback={null}>
            <SlickSlider {...settings}>
                {props.announcements?.length > 0 &&
                    props.announcements.map((item, index) => {
                        return (
                            <div
                                className={'border-color-primary bgc-pink p-24 fs-18 box-sizing-border'}
                                key={index}
                                onClick={() => handleAnnouncement(item.url)}
                                dangerouslySetInnerHTML={{__html: item.content}}>
                            </div>
                        )
                    })
                }
            </SlickSlider>
        </Suspense>
    );
};

export default DashboardAnnouncement;