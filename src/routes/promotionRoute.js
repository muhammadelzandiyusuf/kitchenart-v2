import { React } from 'libraries';

const viewPromotion = React.lazy(() => import('pages/Promotion/ListPromotion'));
const viewDetailPromotion = React.lazy(() => import('pages/Promotion/DetailPromotion'));

const promotionRoute = [
    {
        name: "All Promotion",
        component: viewPromotion,
        path: "/promotion"
    },
    {
        name: "Voucher",
        component: viewPromotion,
        path: "/voucher"
    },
    {
        name: "Detail Voucher",
        component: viewDetailPromotion,
        path: "/voucher/:url"
    },
    {
        name: "Detail Gift Voucher",
        component: viewDetailPromotion,
        path: "/gift-voucher/:url"
    },
    {
        name: "Coupon",
        component: viewPromotion,
        path: "/coupon"
    },
    {
        name: "Detail Coupon",
        component: viewDetailPromotion,
        path: "/coupon/:url"
    }
];

export default promotionRoute;