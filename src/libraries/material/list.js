import { makeStyles } from '@material-ui/core';

const listStyles = makeStyles((theme) => ({
    rootList: {
        width: '100% !important',
        maxWidth: '360 !important',
        backgroundColor: theme.palette.background.paper,
    },
    listMenuVertical: {
        paddingLeft: '26px !important',
        paddingTop: '5px !important',
        paddingBottom: '5px !important',
    },
    ListMenuMultiVertical: {
        paddingLeft: '7px !important',
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
    },
    listMobileMenu: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        borderBottom: '1px solid #dddddd !important',
    },
    listPadding0: {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
    },
    listMobileIcon: {
        minWidth: '0 !important'
    }
}));

export default listStyles;