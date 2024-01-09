import {React, Suspense, useHistory, useParams, useState, useEffect, Hidden, Skeleton, Grid, NeedInspiration} from 'libraries';
import {getBrandCategories, getBrandDetails} from "services";
import {getHostUrl, getIdentityFromHref} from "utils";

import "assets/scss/category/parentCategory.scss";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const BannerAtom = React.lazy(() => import('components/atoms/BannerAtom'));
const BrandAbout = React.lazy(() => import('components/molecules/CategoryMolecule/CategoryAbout'));
const BrandProductLines = React.lazy(() => import('components/molecules/CategoryMolecule/CategoryProductLines'));
const BrandPopupVideo = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailPopupVideo'));

const Brand = () => {

    const params = useParams();
    const history = useHistory();

    const [meta, setMeta] = useState({
        title: 'KitchenArt - Home Appliances'
    });
    const [banner, setBanner] = useState({
        image: null,
        alt: null,
        title: null,
        titleShow: false,
        youtubeId: ''
    });
    const [loading, setLoading] = useState(true);
    const [brand, setBrand] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openYoutube, setOpenYoutube] = useState(false);

    useEffect(() => {
        const payload = {path: params.url};
        getBrandDetails(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setBrand(data);
                const slugBrand = getIdentityFromHref(data?.href);
                setBanner({
                    image: data?.bannerImage ? getHostUrl(data?.bannerImage) : null, alt: slugBrand,
                    title: data?.name, titleShow: false, youtubeId: data?.youtubeId
                });
                setMeta({title: `KitchenArt - ${data?.name}`});
                const payloadCategory = {path: `${slugBrand}/category`};
                getBrandCategories(payloadCategory).then(response => {
                    if (response?.axiosResponse?.status === 200) {
                        const categories = response?.axiosResponse?.data;
                        setCategories(categories);
                        setLoading(false);
                    };
                });
            }
            else{
                history.push('/404');
            };
        });
    }, [params, history]);

    const handleUrl = (href) => {
        const identity = getIdentityFromHref(href);
        history.push(`/brand/${params.url}/${identity}`);
    };

    const handleShopNow = (href) => {
        const identity = getIdentityFromHref(href);
        history.push(`/brand/${identity}`);
    };

    const handleShowYoutube = () => {
        setOpenYoutube(true);
    };

    const handleCloseYoutube = () => {
        setOpenYoutube(false);
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <Hidden only={['xs','sm', 'md']}>
                {loading ? <Skeleton variant="rect" className={'skeleton__banner'} height={720} /> :
                    <BannerAtom {...banner} />
                }
            </Hidden>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12} className="category__description__box">
                    <BrandAbout parentCategory={brand} handleUrl={handleShopNow} />
                </Grid>
                {banner?.youtubeId !== '' &&
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <BannerAtom type={'banner-video'} {...banner} clicked={handleShowYoutube} />
                    </Grid>
                }
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <BrandProductLines categories={categories} handleUrl={handleUrl} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <BannerAtom type={'banner-responsive'} desktopImage={NeedInspiration}
                                mobileImage={NeedInspiration} alt={'needinspiration'}  />
                </Grid>
            </Grid>
            <BrandPopupVideo
                fullWidth={true} maxWidth={'md'} openYoutube={openYoutube} handleCloseYoutube={handleCloseYoutube}
                youtubeId={banner?.youtubeId}
            />
        </Suspense>
    );
};

export default Brand;