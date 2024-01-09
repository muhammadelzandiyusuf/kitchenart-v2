import {
    React,
    AppBar,
    useStyles,
    Toolbar,
    Suspense,
    faBars,
    useHistory,
    faSearch,
    useSelector,
    LogoKitchenArt,
    useState,
    useEffect,
    Localbase
} from 'libraries';
import { postShowMenuNavbar, postCloseMenuNavbarPrimary, postShowMenuNavbarPrimary } from 'services';
import 'assets/scss/image/image.scss';
import 'assets/scss/button/button.scss';
import {totalCartSelector, totalWishlistSelector} from "modules";

const TypographAtom = React.lazy(() => import('components/atoms/TypographyAtom'));
const IconButtonAtom = React.lazy(() => import('components/atoms/IconButtonAtom'));
const SearchNavbar = React.lazy(() => import('components/molecules/MenuNavbar/SearchNavbar'));
const MenuButtonIcon = React.lazy(() => import('components/molecules/MenuNavbar/MenuButtonIconNavbar'));

const PrimaryNavbar = (props) => {

    const classes = useStyles();
    const menuId = 'primary-search-account-menu';

    let history = useHistory();
    const totalCart = useSelector(totalCartSelector);
    const totalWishlist = useSelector(totalWishlistSelector);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        let db = new Localbase('db');
        db.collection('customer').get().then(customer => {
            if (customer?.length > 0) {
                setCustomer(customer[0]);
            };
        });
    }, []);

    const handleBack = () => {
        postCloseMenuNavbarPrimary();
        history.push('/');
    };

    const handleShowMenu = () => {
        postShowMenuNavbar();
    };

    const handleShowMenuMObile = () => {
        postShowMenuNavbarPrimary();
    };

    return (
        <Suspense fallback={null}>
            <div className={classes.grow + ' ' + props.styleNavbar + ' style__view--desktop'}>
                <AppBar className={classes.appbar} position={props.position}>
                    <Toolbar>
                        <TypographAtom typographyStyle={classes.title} variant="h6" type="image" image={LogoKitchenArt} styleImage="image__center-y h-42" alt="logo-image" clicked={handleBack} />
                        <IconButtonAtom type="icon-button" edge="start" styleIconButton={classes.menuButton + ' btn__bars btn__bars--menu'} label="open drawer" icon={faBars} clicked={handleShowMenu} />
                        <SearchNavbar styleSearch={classes.search} styleSearchIcon={classes.searchIcon} styleInputRoot={classes.inputRoot} styleInputInput={props.styleInputInput} />
                        <MenuButtonIcon styleMenu={classes.growButton} styleChildMenu={classes.sectionDesktop} badgeCart={totalCart} badgeWish={totalWishlist} controlUser={menuId} popup={true} />
                        <TypographAtom type="title" variant="h6" title={`${customer !== null ? `hi, ${customer?.firstName}` : ''}`} typographyStyle="tx-c fs-13 pl-10 pt-10" />
                    </Toolbar>
                </AppBar>
            </div>

            <div className={classes.grow + ' ' + props.styleNavbar + ' style__view--mobile'}>
                <AppBar className={classes.appbar} position={props.position}>
                    <Toolbar>
                        <IconButtonAtom edge="start" type="icon-button" styleIconButton={classes.menuButtonMobile + ' btn__bars'} label="open drawer" icon={faBars} clicked={handleShowMenuMObile} />
                        <IconButtonAtom type="icon-button" styleIconButton="tx-c" label="open search" icon={faSearch} />
                        <MenuButtonIcon styleMenu={classes.borderLeftBox} styleChildMenu={classes.sectionMobile} badgeCart={totalCart} badgeWish={totalWishlist} controlUser={menuId} popup={true} />
                    </Toolbar>
                </AppBar>
            </div>
        </Suspense>
    );
};

export default PrimaryNavbar;