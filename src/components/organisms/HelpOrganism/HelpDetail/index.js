import {faArrowLeft, Grid, React, Suspense} from "libraries";

const HelpBreadcrumb = React.lazy(() => import('components/molecules/HelpMolecule/HelpBreadcrumb'));
const HelpMenuSidebar = React.lazy(() => import('components/molecules/HelpMolecule/HelpMenuSidebar'));
const HelpContent = React.lazy(() => import('components/molecules/HelpMolecule/HelpContent'));
const HelpMenuModel = React.lazy(() => import('components/molecules/HelpMolecule/HelpMenuModal'));
const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const HelpDetail = (props) => {
    const { helpCategory, helpContents, content, handleContent, openMenuContent, handleCloseMenuModal,
        handleCloseContent } = props;

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={"mt-20 ps-ab x-center style__view--desktop"}>
                        <HelpBreadcrumb helpCategory={helpCategory} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div className={"ml-40 mt-80 style__view--desktop"}>
                        <HelpMenuSidebar
                            helpCategory={helpCategory}
                            helpContents={helpContents}
                            handleContent={handleContent}
                            content={content}
                        />
                    </div>
                    <div className={"style__view--mobile"}>
                        <IconAtom icon={faArrowLeft} clicked={handleCloseContent} styleIcon={"ml-16 mb-32 mt-10 fs-20"} />
                        <Grid item xs={12} sm={12}>
                            <div className={"fs-24 mb-10 tx-c ml-16"}>
                                {helpCategory.name}
                            </div>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <div className={"content"}>
                        <HelpContent content={content} />
                    </div>
                </Grid>
                <HelpMenuModel
                    openMenuContent={openMenuContent}
                    helpCategory={helpCategory}
                    helpContents={helpContents}
                    handleContent={handleContent}
                    content={content}
                    handleCloseMenuModal={handleCloseMenuModal}
                />
            </Grid>
        </Suspense>
    )
}

export default HelpDetail;