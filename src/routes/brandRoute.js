import { React } from 'libraries';

const ParentBrand = React.lazy(() => import('pages/Brand'));

const brandRoute = [
    {
        name: "Parent Brand",
        component: ParentBrand,
        path: '/brand-detail/:url'
    }
];

export default brandRoute;