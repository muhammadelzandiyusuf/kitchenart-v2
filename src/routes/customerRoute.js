import { React }  from 'libraries';

const viewCustomerLogin = React.lazy(() => import('pages/Customer/CustomerLogin'));
const viewCustomerForgotPassword = React.lazy(() => import('pages/Customer/CustomerForgotPassword'));
const viewCustomerRegister = React.lazy(() => import('pages/Customer/CustomerRegister'));
const viewCustomerVerificationAccount = React.lazy(() => import('pages/Customer/CustomerVerificationAccount'));
const viewCustomerBusinessPartner = React.lazy(() => import('pages/Customer/CustomerBusinessPartner'));

const customerRoute = [
    {
        name: "Login",
        component: viewCustomerLogin,
        path: "/login"
    },
    {
        name: "Forgot-Password",
        component: viewCustomerForgotPassword,
        path: "/forgot-password"
    },
    {
        name: "Register",
        component: viewCustomerRegister,
        path: "/register"
    },
    {
        name: "Business-Partner",
        component: viewCustomerBusinessPartner,
        path: "/business-partner"

    },
    {
        name: "Verification-Account",
        component: viewCustomerVerificationAccount,
        path: "/verify/:token/:uid"
    },
];

export default customerRoute;