import {DialogTitle, faArrowLeft, faTimes, Grid, React, Suspense} from 'libraries';

const IconButtonAtom = React.lazy(() => import('components/atoms/IconButtonAtom'));
const TypographyAtom = React.lazy(() => import('components/atoms/TypographyAtom'));

const MobileMenuHeader = (props) => {

    return (
        <Suspense fallback={null}>
            <DialogTitle id="responsive-dialog-title" className="bgc-grey title__menu___mobile__navbar fl-r c-black">
                <Grid container alignItems="center" spacing={0}>
                    <Grid item xs={2}>
                        <IconButtonAtom icon={faArrowLeft} clicked={props.handleBack} styleIconButton="fl-l" />
                    </Grid>
                    <Grid item xs={8}>
                        <TypographyAtom type="title" variant="h5" typographyStyle="ta-c fw-b" title={props.title} />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButtonAtom icon={faTimes} clicked={props.handleClose} styleIconButton="fl-r" />
                    </Grid>
                </Grid>
            </DialogTitle>
        </Suspense>
    );
};

export default React.memo(MobileMenuHeader);