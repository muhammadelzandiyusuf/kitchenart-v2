import { React } from 'libraries';

const pageCart = React.lazy(() => import('pages/Order/Cart'));
const pageCheckout = React.lazy(() => import('pages/Order/Checkout'));
const pagePayment = React.lazy(() => import('pages/Order/Payment'));

const orderRoute = [
    {
        name: "Cart",
        component: pageCart,
        path: '/cart'
    },
    {
        name: "Checkout",
        component: pageCheckout,
        path: '/checkout'
    },
    {
        name: "Payment",
        component: pagePayment,
        path: '/payment/:type/:code'
    }
];

export default orderRoute;