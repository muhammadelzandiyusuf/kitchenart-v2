import {Grid, React, Suspense, useTranslation} from "libraries";

const BannerAtom = React.lazy(() => import('components/atoms/BannerAtom'));
const HelpMolecule = React.lazy(() => import('components/molecules/HelpMolecule/Help'));

const HelpOrganism = (props) => {
    const { helpCategories, banner, handleDetailHelp } = props;

    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <BannerAtom type={'banner-responsive'} desktopImage={banner.desktopImage}
                            mobileImage={banner.mobileImage} alt={'kitchenartcare'}  />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={"ta-c mt-30 fs-28 tx-c"}>
                {t('label.whatsYourProblem')}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={"help-list"}>
                <HelpMolecule helpCategories={helpCategories} handleDetailHelp={handleDetailHelp} />
            </Grid>
        </Suspense>
    )
}

export default HelpOrganism;