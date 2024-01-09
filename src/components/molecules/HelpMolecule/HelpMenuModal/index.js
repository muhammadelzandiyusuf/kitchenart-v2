import {
    Dialog,
    DialogContent,
    DialogTitle,
    faArrowLeft,
    Grid,
    React,
    Slide,
    Suspense,
    useMediaQuery,
    useTheme
} from "libraries";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const HelpMenuModal = (props) => {
    const { openMenuContent, helpCategory, helpContents, handleCloseMenuModal, handleContent, content } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                open={openMenuContent}
                onClose={handleCloseMenuModal}
                aria-labelledby="menu-dashboard"
                TransitionComponent={Transition}
                keepMounted
                className={'style__view--mobile'}
            >
                <DialogTitle>
                    <IconAtom icon={faArrowLeft} clicked={handleCloseMenuModal} />
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={"fs-24 mb-10 tx-c"}>
                            {helpCategory.name}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={"bl-menu"}>
                            {helpContents.map((helpContent, index) => {
                                return(
                                    <div className={`fs-20 mb-5 ml-16 pointer ${helpContent.title === content.title ? 'tc-r' : 'tx-c'}`}
                                         key={index} onClick={() => handleContent(helpContent.href)}>
                                        {helpContent.title}
                                    </div>
                                )
                            })}
                        </div>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Suspense>
    )
}

export default HelpMenuModal;