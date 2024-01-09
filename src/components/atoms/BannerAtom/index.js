import {Hidden, PropTypes, React, withWidth, faPlay} from 'libraries';

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const BannerAtom = (props) => {

    const emptyImage = 'http://www.placehold.it/1440x365/EFEFEF/AAAAAA&amp;text=no+image';

    const Banner = (
        <div className="banner banner--height">
            <img src={props.image === null ? emptyImage : props.image}
                 className="w-100 ps-rv ds-b" alt={props.alt} />
            {props.titleShow &&
                <div className="banner__title">
                    <div className="banner__title__text ta-c xy-center ps-ab">{props.title}</div>
                </div>
            }
        </div>
    );

    const BannerResponsive = (
        <div className="banner">
            <Hidden only={['xs','sm', 'md']}>
                <img src={props.desktopImage === null ? emptyImage : props.desktopImage}
                     className={`banner__image ps-rv ds-b`}
                     alt={props.alt}
                />
            </Hidden>
            <Hidden only={['lg', 'xl']}>
                <img src={props.mobileImage === null ? emptyImage : props.mobileImage}
                     className={`banner__image ps-rv ds-b`}
                     alt={props.alt}
                />
            </Hidden>
        </div>
    );

    const BannerVideo = (
        <div className={'banner banner--height--video pointer'} onClick={props.clicked}>
            <img src={`https://img.youtube.com/vi/${props.youtubeId}/maxresdefault.jpg`}
                 className={'w-100 y-center'}
                 alt={props.youtubeId} />
            <IconAtom icon={faPlay} styleIcon={'c-grey fs-3rem ps-ab xy-center'} />
        </div>
    );

    const BannerFluid = (
        <div className="banner">
            <img src={props.image === null ? emptyImage : props.image}
                 className="w-100 ps-rv ds-b" alt={props.alt} />
        </div>
    );

    switch (props.type) {
        case 'banner':
            return Banner;
        case 'banner-responsive':
            return BannerResponsive;
        case 'banner-video':
            return BannerVideo;
        case 'banner-fluid':
            return BannerFluid;
        default:
            return Banner;
    }
};

BannerAtom.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(BannerAtom);