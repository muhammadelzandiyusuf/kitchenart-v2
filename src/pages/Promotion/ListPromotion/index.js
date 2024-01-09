import {React, Suspense, useState, useHistory, useLocation, useEffect} from 'libraries';
import {getVouchers, getCoupons, getProductAvailablePromotions, getBanners} from 'services';

import 'assets/scss/promotion/promotion.scss';
import 'assets/scss/product/pagination.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const BannerAtom = React.lazy(() => import('components/atoms/BannerAtom'));
const MenuTab = React.lazy(() => import('components/molecules/MenuTab'));
const PromotionOrganism = React.lazy(() => import('components/organisms/PromotionOrganism/PromotionListOrganism'));

const Promotion = () => {

    const history = useHistory();
    const location = useLocation();
    const [meta, setMeta] = useState({
        title: 'KitchenArt - All Promotion',
        keyword: 'promotion',
        description: 'promotion'
    });
    const [banner, setBanner] = useState({
        type: 'banner-fluid',
        image: null,
        alt: 'banner-promotion'
    });
    const [active, setActive] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [paginations, setPaginations] = useState({
        total: 0,
        link: ''
    });
    const [page, setPage] = useState(1);
    const [view, setView] = useState(15);
    const [hrefParams, setHrefParams] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const path = location.pathname.replace('/', '');
        setActive(path);
        const payload = {
            params: {
                is_available: true,
                page: page,
                per_page: view
            }
        };
        const payloadBanners = {params: {group: 'promotion_banners'}};
        getBanners(payloadBanners).then(banner => {
            if (banner?.axiosResponse?.status === 200) {
                const data = banner?.axiosResponse?.data;
                if (data?.length > 0) {
                    setBanner({image: data[0].desktopImage, type: 'banner-fluid', alt: 'banner-promotion'});
                };
                if (path === 'voucher') {
                    getVouchers(payload).then(response => {
                        if (response?.axiosResponse?.status === 200) {
                            const dataVoucher = response?.axiosResponse?.data;
                            setPromotions(dataVoucher);
                            setPaginations({
                                total: response?.axiosResponse?.headers['x-total-results'],
                                link: response?.axiosResponse?.headers?.link !== undefined ? response?.axiosResponse?.headers?.link : ''
                            });
                            setMeta({
                                title: 'KitchenArt - Voucher',
                                keyword: 'voucher',
                                description: 'voucher'
                            });
                            setTimeout(() => {
                                setLoading(false);
                            }, 2000);
                        };
                    });
                }
                else if (path === 'coupon') {
                    getCoupons(payload).then(response => {
                        if (response?.axiosResponse?.status === 200) {
                            const dataCoupon = response?.axiosResponse?.data;
                            setPromotions(dataCoupon);
                            setPaginations({
                                total: response?.axiosResponse?.headers['x-total-results'],
                                link: response?.axiosResponse?.headers?.link !== undefined ? response?.axiosResponse?.headers?.link : ''
                            });
                            setMeta({
                                title: 'KitchenArt - Coupon',
                                keyword: 'coupon',
                                description: 'coupon'
                            });
                            setTimeout(() => {
                                setLoading(false);
                            }, 2000);
                        };
                    });
                }
                else{
                    const payloadAvailablePromotion = {path: 'available-promotion'};
                    getProductAvailablePromotions(payloadAvailablePromotion).then(available => {
                        if (available?.axiosResponse?.status === 200) {
                            const dataPromotion = available?.axiosResponse?.data;
                            setPromotions(dataPromotion);
                            setMeta({
                                title: 'KitchenArt - All Promotion',
                                keyword: 'promotion',
                                description: 'promotion'
                            });
                            setTimeout(() => {
                                setLoading(false);
                            }, 2000);
                        };
                    });
                };
            };
        });
    }, [location, page, view]);

    const handleChangePromotion = (path) => {
        history.push(`/${path}`);
    };

    const handleSearchPromotion = data => {
        const path = location.pathname.replace('/', '');
        setPage(1);
        const payload = {
            params: {
                q: data.findProduct,
                is_available: true,
                page: 1,
                per_page: view
            }
        };
        if (path === 'voucher') {
            getVouchers(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setPromotions(data);
                    setPaginations({
                        total: response?.axiosResponse?.headers['x-total-results'],
                        link: response?.axiosResponse?.headers?.link !== undefined ? response?.axiosResponse?.headers?.link : ''
                    });
                };
            });
        }
        else{
            getCoupons(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setPromotions(data);
                    setPaginations({
                        total: response?.axiosResponse?.headers['x-total-results'],
                        link: response?.axiosResponse?.headers?.link !== undefined ? response?.axiosResponse?.headers?.link : ''
                    });
                };
            });
        };
    };

    const handleMoreDetail = (href) => {
        if (href !== null && href !== undefined) {
            const path = location.pathname.replace('/', '');
            if (path !== 'promotion') {
                history.push(`/${path}/${href}`);
            }
            else{
                const slug = href.replace('_', '-');
                if (slug === 'trade-in') {
                    history.push(`/${slug}`);
                }
                else{
                    history.push(`/promo/${slug}`);
                };
            };
        };
    };

    const handleChangePagination = (value, url) => {
        const path = location.pathname.replace('/', '');
        setPage(value);
        setHrefParams(`${url}`);
        let payload = null;
        if (path === 'voucher') {
            payload = {
                url: `core/voucher/${url}`
            };
            getVouchers(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setPromotions(data);
                    setPaginations({
                        total: result?.axiosResponse?.headers['x-total-results'],
                        link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                    });
                };
            });
        }
        else{
            payload = {
                url: `core/coupon/${url}`
            };
            getCoupons(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setPromotions(data);
                    setPaginations({
                        total: result?.axiosResponse?.headers['x-total-results'],
                        link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                    });
                };
            });
        };
    };

    const handleProductViewList = (pageView, e) => {
        const path = location.pathname.replace('/', '');
        const page = 1;
        const query = new URLSearchParams(hrefParams);
        query.set('per_page', pageView.toString());
        query.set('page', page.toString());
        setPage(1);
        setView(pageView);
        setHrefParams(query);
        let payload = null;
        if (path === 'voucher') {
            payload = {
                url: `core/voucher/?${query.toString()}`
            };
            getVouchers(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setPromotions(data);
                    setPaginations({
                        total: result?.axiosResponse?.headers['x-total-results'],
                        link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                    });
                }
                ;
            });
        }
        else{
            payload = {
                url: `core/coupon/?${query.toString()}`
            };
            getCoupons(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setPromotions(data);
                    setPaginations({
                        total: result?.axiosResponse?.headers['x-total-results'],
                        link: result?.axiosResponse?.headers?.link !== undefined ? result?.axiosResponse?.headers?.link : ''
                    });
                };
            });
        };
        e.preventDefault();
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <BannerAtom {...banner} />
            <MenuTab active={active} handleChangePromotion={handleChangePromotion} />
            <div className={'product__detail'}>
                <PromotionOrganism
                    active={active}
                    handleSearchPromotion={handleSearchPromotion}
                    promotions={promotions}
                    handleMoreDetail={handleMoreDetail}
                    paginations={paginations}
                    page={page}
                    handleChangePagination={handleChangePagination}
                    view={view}
                    handleView={handleProductViewList}
                    loading={loading}
                />
            </div>
        </Suspense>
    );
};

export default Promotion;