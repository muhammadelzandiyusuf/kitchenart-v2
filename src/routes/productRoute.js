import { React } from 'libraries';

const viewProductList = React.lazy(() => import('pages/Product/ProductList'));
const viewProductDetail = React.lazy(() => import('pages/Product/ProductDetail'));
const viewProductCompare = React.lazy(() => import('pages/Product/ProductCompare'));
const viewProductPromo = React.lazy(() => import('pages/Product/ProductPromo'));
const viewProductDetailPackage = React.lazy(() => import('pages/Product/ProductDetailPackage'));

const productRoute = [
    {
        name: "Product List Category",
        component: viewProductList,
        path: "/category/:url"
    },
    {
        name: "Product List Brand",
        component: viewProductList,
        path: "/brand/:brand/:url"
    },
    {
        name: "Product List All Brand",
        component: viewProductList,
        path: "/brand/:brand"
    },
    {
        name: "Product Compare",
        component: viewProductCompare,
        path: "/compare/"
    },
    {
        name: "Product Detail",
        component: viewProductDetail,
        path: "/product/:url"
    },
    {
        name: "Product List Promo",
        component: viewProductPromo,
        path: "/promo/:url"
    },
    {
        name: "Product Detail Package & Give Away",
        component: viewProductDetailPackage,
        path: "/product/:type/:url"
    }
];

export default productRoute;