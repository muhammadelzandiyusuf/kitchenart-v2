import {React, Suspense, useState, useEffect, useParams, useLocation, useHistory, useTranslation} from 'libraries';
import {getVouchers, getCoupons, getGiftVouchers} from 'services';

import 'assets/scss/promotion/promotion.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const PromotionDetailOrganism = React.lazy(() => import('components/organisms/PromotionOrganism/PromotionDetailOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));

const DetailPromotion = (props) => {

    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const t = useTranslation();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Voucher',
        keyword: 'voucher',
        description: 'voucher'
    });
    const [promotion, setPromotion] = useState([]);
    const [path, setPath] = useState('');
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: params.url
        };
        const pathLocation = location.pathname.split('/');
        setPath(pathLocation[1]);

        if (pathLocation[1] === 'voucher'){
            getVouchers(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setPromotion(data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                };
            });
        }
        else if (pathLocation[1] === 'coupon'){
            getCoupons(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setPromotion(data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                };
            });
        }
        else {
            getGiftVouchers(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setPromotion(data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                };
            });
        };
    }, [access, params, location]);

    const handleUsePromotion = () => {
        history.push('/cart');
    };

    const handleCopyCode = () => {
        setSnackbar({type: 'success', message: t('message.successCopy')});
        setTimeout(() => {
            setOpen(true);
        }, 1000);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <div className={'product__detail bgc-grey-smoth'}>
                <PromotionDetailOrganism
                    promotion={promotion}
                    path={path}
                    handleUsePromotion={handleUsePromotion}
                    handleCopyCode={handleCopyCode}
                    loading={loading}
                />
            </div>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
        </Suspense>
    );
};

export default DetailPromotion;