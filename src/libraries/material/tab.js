import { makeStyles } from '@material-ui/core';

const tabStyles = makeStyles((theme) => ({
    rootTab: {
        flexGrow: '1 !important',
        width: '100% !important',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default tabStyles;