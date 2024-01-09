import { React } from 'libraries';

const ParentCategory = React.lazy(() => import('pages/Category/ParentCategory'));

const categoryRoute = [
    {
        name: "Parent Category",
        component: ParentCategory,
        path: '/parent-category/:url'
    }
];

export default categoryRoute;