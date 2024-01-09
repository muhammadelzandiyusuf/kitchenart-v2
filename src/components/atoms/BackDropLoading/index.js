import {React, Suspense, Backdrop, CircularProgress, makeStyles} from 'libraries';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const BackDropLoading = (props) => {
    const classes = useStyles();
    return (
        <Suspense fallback={null}>
            <Backdrop className={classes.backdrop} open={props.open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Suspense>
    );
};

export default BackDropLoading;