import { fade, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: '1 !important',
    },
    growButton: {
        borderLeft: '1px solid #707070 !important',
        paddingLeft: '18px !important'
    },
    borderLeftBox: {
        borderLeft: '1px solid #707070 !important',
        position: 'absolute !important',
        right: '15px !important'
    },
    menuButton: {
        marginRight: `16px !important`,
    },
    menuButtonMobile: {
        marginRight: `8px !important`,
    },
    title: {
        flexGrow: '1 !important',
    },
    appbar: {
        backgroundColor: '#ffffff !important',
        boxShadow: '0px 3px 6px #00000029 !important'
    },
    search: {
        position: 'relative !important',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: `${fade(theme.palette.common.white, 0.15)} !important`,
        '&:hover': {
            backgroundColor: `${fade(theme.palette.common.white, 0.25)} !important`,
        },
        marginRight: `16px !important`,
        marginLeft: '0 !important',
        width: '100% !important',
        [theme.breakpoints.up('sm')]: {
            marginLeft: `0 !important`,
            width: 'auto !important',
        },
    },
    searchIcon: {
        padding: `0 16px !important`,
        height: '100% !important',
        position: 'absolute !important',
        pointerEvents: 'none !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        color: '#444444 !important'
    },
    inputRoot: {
        color: '#444444 !important',
        fontSize: '14px !important'
    },
    inputInputHome: {
        padding: `8px 8px 8px 0 !important`,
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + 32px) !important`,
        transition: theme.transitions.create('width'),
        width: '100% !important',
        [theme.breakpoints.up('md')]: {
            width: '65ch !important',
        },
    },
    inputInput: {
        padding: `8px 8px 8px 0 !important`,
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + 32px) !important`,
        transition: theme.transitions.create('width'),
        width: '100% !important',
        [theme.breakpoints.up('md')]: {
            width: '100ch !important',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default useStyles;