import {React, Suspense, Grid} from 'libraries';

const PromotionDetail = React.lazy(() => import('components/molecules/PromotionMolecule/PromotionDetail'));
const PromotionInfo = React.lazy(() => import('components/molecules/PromotionMolecule/PromotionInfo'));
const PromotionDetailSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/PromotionDetailSkeleton'));
const PromotionDetailInfoSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/PromotionDetailInfoSkeleton'));

const PromotionDetailOrganism = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={7}>
                    {props.loading ? (
                        <PromotionDetailSkeleton />
                    ):(
                        <PromotionDetail
                            path={props.path}
                            promotion={props.promotion}
                        />
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={5}>
                    {props.loading ? (
                        <PromotionDetailInfoSkeleton />
                    ):(
                        <PromotionInfo
                            path={props.path}
                            promotion={props.promotion}
                            handleUsePromotion={props.handleUsePromotion}
                            handleCopyCode={props.handleCopyCode}
                        />
                    )}
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default PromotionDetailOrganism;