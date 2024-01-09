import { React }  from 'libraries';

const viewHomepage = React.lazy(() => import('pages/Homepage'));

const homepageRoute = [
    {
        name: "Homepage",
        component: viewHomepage,
        path: "/"
    }
];

export default homepageRoute;