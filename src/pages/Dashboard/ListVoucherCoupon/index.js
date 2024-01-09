import {React, Suspense, useState, useEffect, useHistory, useParams} from 'libraries';
import {getCoupons, getGiftVouchers, getVouchers, getVoucherTypes} from "services";

import 'assets/scss/promotion/promotion.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const ListVoucherCouponOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/ListVoucherCouponOrganism'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const ListVoucherCoupon = () => {

    const params = useParams();
    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Voucher & Coupon'
    });
    const [voucherTypes, setVoucherTypes] = useState([]);
    const [active, setActive] = useState(null);
    const [vouchers, setVouchers] = useState([]);
    const [limit, setLimit] = useState(6);
    const [backDrop, setBackDrop] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (access !== null) {
            getVoucherTypes({}).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setVoucherTypes(data);
                    if (data?.length > 0) {
                        setActive(data[0]?.type);
                        if (data[0]?.type === 'coupon') {
                            const payload = {
                                params: {
                                    is_available: true
                                }
                            };
                            getCoupons(payload).then(result => {
                                if (result?.axiosResponse?.status === 200) {
                                    const dataVoucherCoupon = result?.axiosResponse?.data;
                                    setVouchers(dataVoucherCoupon);
                                    setLoading(false);
                                };
                            });
                        }
                        else if (data[0]?.type === 'gift_voucher') {
                            const payload = {
                                headers: {
                                    'Authorization': access,
                                    'Cache-Control': 'no-cache'
                                },
                                params: {
                                    is_available: true
                                }
                            };
                            getGiftVouchers(payload).then(result => {
                                if (result?.axiosResponse?.status === 200) {
                                    const dataVoucherCoupon = result?.axiosResponse?.data;
                                    setVouchers(dataVoucherCoupon);
                                    setLoading(false);
                                };
                            })
                        }
                        else {
                            const payload = {
                                params: {
                                    voucher_type: data[0]?.type,
                                    is_available: true,
                                    ordering: 'name'
                                }
                            };
                            getVouchers(payload).then(result => {
                                if (result?.axiosResponse?.status === 200) {
                                    const dataVoucherCoupon = result?.axiosResponse?.data;
                                    setVouchers(dataVoucherCoupon);
                                    setLoading(false);
                                };
                            });
                        };
                    };
                };
            });
        }
        else {
            history.push('/login');
        };
    }, [access, params, history]);

    const handleChangeVoucher = (type) => {
        setBackDrop(true);
        setActive(type);
        if (type === 'coupon') {
            const payload = {
                params: {
                    is_available: true
                }
            };
            getCoupons(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const dataVoucherCoupon = result?.axiosResponse?.data;
                    setVouchers(dataVoucherCoupon);
                    setBackDrop(false);
                };
            });
        }
        else if (type === 'gift_voucher') {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                params: {
                    is_available: true
                }
            };
            getGiftVouchers(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const dataVoucherCoupon = result?.axiosResponse?.data;
                    setVouchers(dataVoucherCoupon);
                    setBackDrop(false);
                };
            })
        }
        else {
            const payload = {
                params: {
                    voucher_type: type,
                    is_available: true,
                    ordering: 'name'
                }
            };
            getVouchers(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const dataVoucherCoupon = result?.axiosResponse?.data;
                    setVouchers(dataVoucherCoupon);
                    setBackDrop(false);
                };
            });
        };
    };

    const handleMoreDetail = (href, type) => {
        if (type === 'coupon') {
            history.push(`/coupon/${href}`);
        }
        else if (type === 'gift_voucher') {
            history.push(`/gift-voucher/${href}`);
        }
        else {
            history.push(`/voucher/${href}`);
        };
    };

    const handleLoadMore = () => {
        setLimit(limit + 6);
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <MenuDashboard>
                <ListVoucherCouponOrganism
                    voucherTypes={voucherTypes}
                    active={active}
                    handleChangeVoucher={handleChangeVoucher}
                    vouchers={vouchers}
                    handleMoreDetail={handleMoreDetail}
                    handleLoadMore={handleLoadMore}
                    limit={limit}
                    loading={loading}
                />
                <BackDropLoading open={backDrop} />
            </MenuDashboard>
        </Suspense>
    );
};

export default ListVoucherCoupon;