import {Hidden, React, Skeleton, Suspense, useEffect, useHistory, useParams, useState} from "libraries";
import {getCategoriesList, getCategoryDetails} from "services";
import {getHostUrl, getIdentityFromHref} from "utils";

import "assets/scss/category/parentCategory.scss";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const BannerAtom = React.lazy(() => import('components/atoms/BannerAtom'));
const ParentCategoryOrganism = React.lazy(() => import('components/organisms/CategoryOrganism/ParentCategoryOrganism'));

const ParentCategory = () => {
    const params = useParams();
    const history = useHistory();

    const [meta, setMeta] = useState({
        title: 'KitchenArt - Category'
    });

    const [banner, setBanner] = useState({
        image: null,
        alt: null,
        title: null
    });

    const [loading, setLoading] = useState(true);
    const [parentCategory, setParentCategory] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const payloadDetailCategory = {
            path: params.url
        };
        getCategoryDetails(payloadDetailCategory).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setParentCategory(data);

                const slug = getIdentityFromHref(data?.href);
                setBanner({
                    image: data?.bannerImage ? getHostUrl(data?.bannerImage) : null, alt: slug, title: data?.name
                });
                setMeta({title: `KitchenArt - ${data?.name}`});
                const payloadCategoryByParent = {
                    params: {
                        level: 1,
                        is_active: true,
                        parent: params.url
                    }
                };
                getCategoriesList(payloadCategoryByParent).then(response => {
                    if (response?.axiosResponse?.status === 200) {
                        const categories = response?.axiosResponse?.data;
                        setCategories(categories);
                        setLoading(false);
                    };
                });
            };
        });
    }, [params]);

    const handleUrl = (href) => {
        const identity = getIdentityFromHref(href);
        history.push(`/category/${identity}`);
    };

    return(
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <Hidden only={['xs','sm', 'md']}>
                {loading ? <Skeleton variant="rect" className={'skeleton__banner'} height={720} /> :
                    <BannerAtom {...banner} titleShow={true} />
                }
            </Hidden>
            <ParentCategoryOrganism parentCategory={parentCategory} categories={categories} handleUrl={handleUrl} />
        </Suspense>
    )
}

export default ParentCategory;