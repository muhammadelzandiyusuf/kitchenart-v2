import { React } from 'libraries';

const TradeinRequest = React.lazy(() => import('pages/Tradein/TradeinRequest'));

const tradeinRoute = [
    {
        name: "Tradein Request",
        component: TradeinRequest,
        path: '/trade-in'
    }
];

export default tradeinRoute;