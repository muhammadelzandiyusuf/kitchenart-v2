import {React, Suspense} from 'libraries';

const PromotionBreadcrumbs = React.lazy(() => import('components/atoms/PromotionAtom/PromotionBreadcrumbs'));
const PromotionDetailDescription = React.lazy(() => import('components/molecules/PromotionMolecule/PromotionDetailDescription'));

const PromotionDetail = (props) => {
    return (
        <Suspense fallback={null}>
            <PromotionBreadcrumbs path={props.path} />
            <PromotionDetailDescription promotion={props.promotion} path={props.path} />
        </Suspense>
    );
};

export default PromotionDetail;