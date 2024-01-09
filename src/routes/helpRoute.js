import { React }  from 'libraries';

const viewHelp = React.lazy(() => import('pages/Help/Help'));
const viewHelpDetail = React.lazy(() => import('pages/Help/HelpDetail'));

const helpRoute = [
    {
        name: "Help",
        component: viewHelp,
        path: "/help"
    },
    {
        name: "Help Detail",
        component: viewHelpDetail,
        path: "/help/:category"
    }
];

export default helpRoute;