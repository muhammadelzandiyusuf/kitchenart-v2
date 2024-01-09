import {React, Suspense, useState, listStyles, useSelector, useHistory, useEffect} from 'libraries';
import {
    getCategoryParents,
    getCategoriesByParent,
    postShowMenuNavbar,
    getBrands,
    getTopBrands,
    getBrandCategories,
    getProductLists
} from 'services';
import {
    menuSelector, categoryParentSelector, categoryChildSelector, categorySlugSelector, brandSelector, topBrandSelector,
    brandCategorySelector, productViewSelector
} from "modules";
import { getIdentityFromHref } from 'utils';

import menuTop from 'configs/data/menu.json';

const TabAtom = React.lazy(() => import('components/atoms/TabMaterialAtom/TabAtom'));
const TabPanelAtom = React.lazy(() => import('components/atoms/TabMaterialAtom/TabPanelAtom'));
const MenuBrandNavbar = React.lazy(() => import('components/molecules/MenuNavbar/MenuBrandNavbar'));
const MenuProductNavbar = React.lazy(() => import('components/molecules/MenuNavbar/MenuProductNavbar'));

const MenuNavbar = (props) => {

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

    let history = useHistory();
    const classes = listStyles();

    const [selectedIndex, setSelectedIndex] = useState('ariston');
    const [selectedIndexProduct, setSelectedIndexProduct] = useState(0);
    const [title, setTitle] = useState('Home Appliances');
    const [value, setValue] = useState(0);
    const [logo, setLogo] = useState('');
    const [brandUrl, setBrandUrl] = useState('');

    const selector = useSelector(menuSelector);
    const parentCatgory = useSelector(categoryParentSelector);
    const childCatgory = useSelector(categoryChildSelector);
    const slugParent = useSelector(categorySlugSelector);
    const brands = useSelector(brandSelector);
    const topBrand = useSelector(topBrandSelector);
    const brandCategories = useSelector(brandCategorySelector);
    const view = useSelector(productViewSelector);

    useEffect(() => {
        getCategoryParents(payloadCategoryParent).then(result => {
            if (result?.axiosResponse?.status === 200) {
                getTopBrands(payloadTopBrand).then(topBrand => {
                    if (topBrand?.axiosResponse?.status === 200) {
                        const dataTopBrand = topBrand?.axiosResponse?.data;
                        let topBrandSlug = null;
                        let topBrandLogo = null;
                        if (dataTopBrand?.length > 0) {
                            topBrandSlug = getIdentityFromHref(dataTopBrand[0]['href']);
                            topBrandLogo = dataTopBrand[0]['logoImage'];
                        };
                        getBrands(payloadBrand).then(brand => {
                            if (brand?.axiosResponse?.status === 200) {
                                setSelectedIndex(topBrandSlug);
                                setLogo(topBrandLogo);
                                setBrandUrl(topBrandSlug);
                                if (topBrandSlug !== null) {
                                    getBrandCategories({path: `${topBrandSlug}/category`});
                                };
                            };
                        });
                    };
                });
            };
        });
    }, [payloadCategoryParent, payloadBrand, payloadTopBrand]);

    const handleListItemClick = (event, item, key) => {
        event.preventDefault();
        const url = getIdentityFromHref(item.href);
        if (item.href) setBrandUrl(url);

        setSelectedIndex(key);
        setLogo(item.logoImage);
        getBrandCategories({path: `${url}/category`});
    };

    const handleListItemClickProduct = (event, item, key) => {
        event.preventDefault();
        setSelectedIndexProduct(key);
        setTitle(item.name);

        const path = { path: `${item.fullSlug}/tree`, slug: item.fullSlug };
        getCategoriesByParent(path);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const path = { path: `${slugParent}/tree`, slug: slugParent };
        getCategoriesByParent(path);
    };

    const handleClickLink = (event, url) => {
        event.preventDefault();
        const payloadProduct = {
            params: {
                category: url,
                page: 1,
                per_page: view
            }
        };
        postShowMenuNavbar();
        history.push({pathname: `/category/${url}/`});
        getProductLists(payloadProduct);

    };

    const handleClickLinkParent = (event, url) => {
        event.preventDefault();

        postShowMenuNavbar();
        history.push({pathname: `/parent-category/${url}/`});
    };

    const handleClickLogo = (event) => {
        event.preventDefault();
        postShowMenuNavbar();

        history.push({pathname: `/brand-detail/${brandUrl}/`});
    };

    const handleClickTitle = (event) => {
        event.preventDefault();
        postShowMenuNavbar();
        history.push(`/${slugParent}`);
    };

    const handleClickItemBrand = (event, url) => {
        event.preventDefault();
        const payloadProduct = {
            params: {
                category: url,
                page: 1,
                per_page: view,
                brand: brandUrl
            }
        };
        postShowMenuNavbar();
        history.push({pathname: `/brand/${brandUrl}/${url}`});
        getProductLists(payloadProduct);
    };

    return (
        <Suspense fallback={null}>
            {selector &&
                <div className={props.styleMenu}>
                    <TabAtom menuTop={menuTop} value={value} handleChange={handleChange} styleTab={'tab__box__shadow'}
                             variant={'scrollable'} scrool={'auto'} centered={false}
                    />
                    <TabPanelAtom value={value} index={0}>
                        <MenuBrandNavbar
                            logo={logo}
                            styleList={classes.listMenuVertical}
                            topBrand={topBrand}
                            selectedIndex={selectedIndex}
                            handleListItemClick={handleListItemClick}
                            menuBrand={brands}
                            menuItem={brandCategories}
                            styleRootList={classes.rootList}
                            styleListMulti={classes.ListMenuMultiVertical}
                            handleClickLink={handleClickItemBrand}
                            handleClickLogo={handleClickLogo}
                            handleClickLinkParent={handleClickLinkParent}
                        />
                    </TabPanelAtom>
                    <TabPanelAtom value={value} index={1}>
                        <MenuProductNavbar
                            styleList={classes.listMenuVertical}
                            menuProduct={parentCatgory}
                            selectedIndexProduct={selectedIndexProduct}
                            handleClickProduct={handleListItemClickProduct}
                            title={title}
                            menuItem={childCatgory}
                            styleRootList={classes.rootList}
                            styleListMulti={classes.ListMenuMultiVertical}
                            handleClickLink={handleClickLink}
                            handleClickTitle={handleClickTitle}
                            handleClickLinkParent={handleClickLinkParent}
                        />
                    </TabPanelAtom>
                </div>
            }
        </Suspense>
    );
}

export default React.memo(MenuNavbar);