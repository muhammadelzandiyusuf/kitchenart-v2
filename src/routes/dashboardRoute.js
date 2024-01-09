import { React } from 'libraries';

const dashboardView = React.lazy(() => import('pages/Dashboard/Dashboard'));
const pageHistoryOrder = React.lazy(() => import('pages/Dashboard/HistoryOrder'));
const pageHistoryOrderDetail = React.lazy(() => import('pages/Dashboard/HistoryOrderDetail'));
const pageTrackingOrder = React.lazy(() => import('pages/Dashboard/TrackingOrder'));
const pageProductHistory = React.lazy(() => import('pages/Dashboard/ProductHistory'));
const pageWishlist = React.lazy(() => import('pages/Dashboard/Wishlist'));
const pageListVoucherCoupon = React.lazy(() => import('pages/Dashboard/ListVoucherCoupon'));
const pageReferralProgram = React.lazy(() => import('pages/Dashboard/ReferralProgram'));
const pageCommission = React.lazy(() => import('pages/Dashboard/Commission'));
const pageCommissionWithdraw = React.lazy(() => import('pages/Dashboard/CommissionWithdraw'));
const pageProfile = React.lazy(() => import('pages/Dashboard/Profile'));
const pageProfileEdit = React.lazy(() => import('pages/Dashboard/ProfileEdit'));
const pageTradein = React.lazy(() => import('pages/Dashboard/TradeIn'));
const pageProductReview = React.lazy(() => import('pages/Dashboard/ProductReview'));
const pageOrderComplaint = React.lazy(() => import('pages/Dashboard/OrderComplaint'));
const pageOrderComplaintDetail = React.lazy(() => import('pages/Dashboard/OrderComplaintDetail'));
const pageOrderCancellation = React.lazy(() => import('pages/Dashboard/OrderCancellation'));
const pageOrderCancellationDetail = React.lazy(() => import('pages/Dashboard/OrderCancellationDetail'));

const dashboardRoute = [
    {
        name: "My KitchenArt",
        component: dashboardView,
        path: '/profile/dashboard'
    },
    {
        name: "History-Order",
        component: pageHistoryOrder,
        path: "/profile/history-order"
    },
    {
        name: "History-Order-Detail",
        component: pageHistoryOrderDetail,
        path: "/profile/history-order/:code"
    },
    {
        name: "Track-Order",
        component: pageTrackingOrder,
        path: "/profile/history-order/track-order/:code"
    },
    {
        name: "Product-Review",
        component: pageProductReview,
        path: "/profile/history-order/review/:code"
    },
    {
        name: "Order-Complaint",
        component: pageOrderComplaint,
        path: "/profile/order-complaint"
    },
    {
        name: "Order-Complaint-Detail",
        component: pageOrderComplaintDetail,
        path: "/profile/order-complaint/:code"
    },
    {
        name: "Order-Cancellation",
        component: pageOrderCancellation,
        path: "/profile/order-cancellation"
    },
    {
        name: "Order-Cancellation-Detail",
        component: pageOrderCancellationDetail,
        path: "/profile/order-cancellation/:code"
    },
    {
        name: "Product History",
        component: pageProductHistory,
        path: "/profile/product-history"
    },
    {
        name: "Wishlist",
        component: pageWishlist,
        path: "/profile/wishlist"
    },
    {
        name: "Voucher & Coupon",
        component: pageListVoucherCoupon,
        path: "/profile/voucher"
    },
    {
        name: "Referral Program",
        component: pageReferralProgram,
        path: "/profile/referral-program"
    },
    {
        name: "Commission",
        component: pageCommission,
        path: "/profile/commission"
    },
    {
        name: "Commission Withdraw",
        component: pageCommissionWithdraw,
        path: "/profile/commission/withdraw"
    },
    {
        name: "Profile",
        component: pageProfile,
        path: "/profile"
    },
    {
        name: "Edit Profile",
        component: pageProfileEdit,
        path: "/profile/edit"
    },
    {
        name: "Tradein",
        component: pageTradein,
        path: "/profile/tradein"
    },
    {
        name: "Tradein Detail",
        component: pageTradein,
        path: "/profile/tradein/:code"
    }
];

export default dashboardRoute;