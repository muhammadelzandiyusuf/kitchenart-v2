import {
    React,
    useTheme,
    useMediaQuery,
    Suspense,
    LogoKitchenArt,
    listStyles,
    useSelector,
    useState, useHistory
} from 'libraries';
import {
    postCloseMenuNavbar,
    postShowMenuNavbarSecondary,
    postShowMenuNavbarChild,
    postShowMenuNavbarSubChild,
    postBackMenuNavbarSecondary,
    postBackMenuNavbarPrimary,
    postBackMenuNavbarChild,
    getCategoryParents,
    getCategoriesByParent,
    getCategoriesSubChilds,
    getTopBrands,
    getBrands,
    getBrandCategories
} from 'services';
import {
    menuSelectorMobilePrimary, menuSelectorMobileSecondary, menuSelectorMobileChild,
    menuSelectorMobileTitle, menuSelectorMobileTitleChild, menuSelectorMobileTitleSubChild,
    menuSelectorMobileSubChild, categoryParentSelector, categoryChildSelector, categorySubChildSelector,
    brandSelector, topBrandSelector, brandCategorySelector
} from 'modules';
import { getIdentityFromHref } from 'utils';

import menuTop from 'configs/data/menu.json';

const MobileMenuPrimary = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuPrimary'));
const MobileMenuSecondary = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuSecondary'));
const MobileMenuChild = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuChild'));
const MobileMenuSubChild = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuSubChild'));

const MobileMenuNavbar = (props) => {

    let history = useHistory();
    const theme = useTheme();
    const classes = listStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [payloadCategoryParent] = useState({
        params: {
            level: 0,
            is_active: true
        },
    });

    const [payloadBrand] = useState(({
        params: {
            ordering: 'name',
            is_active: true
        }
    }));

    const [payloadTopBrand] = useState(({
        params: {
            ordering: 'name',
            is_active: true,
            is_top_brand: true
        }
    }));

    const parentCatgory = useSelector(categoryParentSelector);
    const childCategory = useSelector(categoryChildSelector);
    const subChildCategory = useSelector(categorySubChildSelector);
    const brands = useSelector(brandSelector);
    const topBrands = useSelector(topBrandSelector);
    const brandCategory = useSelector(brandCategorySelector);

    const selectorPrimary = useSelector(menuSelectorMobilePrimary);
    const selectorSecondary = useSelector(menuSelectorMobileSecondary);
    const selectorChild = useSelector(menuSelectorMobileChild);
    const selectorSubChild = useSelector(menuSelectorMobileSubChild);
    const title = useSelector(menuSelectorMobileTitle);
    const titleChild = useSelector(menuSelectorMobileTitleChild);
    const titleSubChild = useSelector(menuSelectorMobileTitleSubChild);

    const [logo, setLogo] = useState('');
    const [brandUrl, setBrandUrl] = useState('');

    const handleBackPrimary = () => {
        postBackMenuNavbarPrimary();
    };

    const handleBackSecondary = () => {
        postBackMenuNavbarSecondary();
    };

    const handleBackChild = () => {
        postBackMenuNavbarChild();
    };

    const handleShowSecondary = (event, name) => {
        event.preventDefault();
        postShowMenuNavbarSecondary(name);
        if (name === 'Products') {
            getCategoryParents(payloadCategoryParent)
        }
        else if (name === 'Brands') {
            getTopBrands(payloadTopBrand);
            getBrands(payloadBrand);
        };
    };

    const handleShowChild = (event, item, slug) => {
        event.preventDefault();

        if (title === 'Products') {
            const path = { path: `${slug}/tree`, slug: null };
            getCategoriesByParent(path);
        }
        else if (title === 'Brands') {
            const url = getIdentityFromHref(item.href);
            setLogo(item.logoImage);
            setBrandUrl(url);
            getBrandCategories({path: `${url}/category`})
        };
        postShowMenuNavbarChild(item.name);
    };

    const handleShowSubChild = (event, item, slug) => {
        event.preventDefault();
        postShowMenuNavbarSubChild(item.name);

        if (title === 'Products') {
            const path = { path: `${slug}/tree`};
            getCategoriesSubChilds(path);
        }
    };

    const handlecloseMenu = () => {
        postCloseMenuNavbar();
    };

    const handleClickLogo = () => {
        postCloseMenuNavbar();
        history.push({pathname: `/brand-detail/${brandUrl}/`});
    };

    const handleClickLink = (event, slug) => {
        event.preventDefault();
        postCloseMenuNavbar();
        history.push({pathname: `/category/${slug}/`});
    };

    const handleClickLinkParent = (event, slug) => {
        event.preventDefault();
        postCloseMenuNavbar();
        history.push({pathname: `${slug}/`});
    }

    return (
        <Suspense fallback={null}>
            <MobileMenuPrimary
                handleClose={handlecloseMenu}
                menuPrimary={selectorPrimary}
                image={LogoKitchenArt}
                styleListMobileMenu={classes.listMobileMenu}
                styleListMobileIcon={classes.listMobileIcon}
                fullScreen={fullScreen}
                menus={menuTop}
                clicked={handleShowSecondary}
            />
            <MobileMenuSecondary
                fullScreen={fullScreen}
                statusShow={selectorSecondary}
                handleBack={handleBackPrimary}
                handleClose={handlecloseMenu}
                menuItems={brands}
                menuItemTop={topBrands}
                menuItemProduct={parentCatgory}
                title={title}
                clicked={handleShowChild}
            />
            <MobileMenuChild
                fullScreen={fullScreen}
                statusShow={selectorChild}
                handleBack={handleBackSecondary}
                handleClose={handlecloseMenu}
                title={titleChild}
                titlePrimary={title}
                logo={logo}
                menuItem={childCategory}
                brandItem={brandCategory}
                styleRootList={classes.rootList}
                styleListMulti={classes.listPadding0}
                clicked={handleShowSubChild}
                handleClickLogo={handleClickLogo}
                handleClickLink={handleClickLink}
                handleClickLinkParent={handleClickLinkParent}
            />
            <MobileMenuSubChild
                fullScreen={fullScreen}
                statusShow={selectorSubChild}
                handleBack={handleBackChild}
                handleClose={handlecloseMenu}
                title={titleSubChild}
                menuItem={subChildCategory}
                styleRootList={classes.rootList}
                styleListMulti={classes.listPadding0}
                handleClickLink={handleClickLink}
            />
        </Suspense>
    );
};

export default React.memo(MobileMenuNavbar);