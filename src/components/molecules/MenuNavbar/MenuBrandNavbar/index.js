import {Grid, List, React, Suspense} from 'libraries';
import { getHostUrl, getIdentityFromHref } from 'utils';
import 'assets/scss/menu/menu.scss';

const ListMenuAtom = React.lazy(() => import('components/atoms/ListMenuAtom'));
const TypographyAtom = React.lazy(() => import('components/atoms/TypographyAtom'));
const LinkAtom = React.lazy(() => import('components/atoms/LinkAtom'));

const MenuBrandNavbar = (props) => {

    const logo = getHostUrl(props.logo);

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={2}>
                    <div className="menu__left menu__left--navbar">
                        <h4 className="menu__left__title fw-b">Top Brands</h4>
                        <ListMenuAtom
                            type="list-item-brand"
                            listStyle={props.styleList}
                            lists={props.topBrand}
                            index={props.selectedIndex}
                            clicked={props.handleListItemClick} />
                        <h4 className="menu__left__title fw-b">Brands</h4>
                        <ListMenuAtom
                            listStyle={props.styleList}
                            lists={props.menuBrand}
                            index={props.selectedIndex}
                            clicked={props.handleListItemClick} />
                    </div>
                </Grid>
                <Grid item xs={12} lg={10}>
                    <div className="menu__item">
                        <TypographyAtom
                            type="image"
                            variant="h6"
                            image={logo}
                            styleImage="w-25 pointer"
                            alt="logo"
                            clicked={props.handleClickLogo} />
                        <div className="menu__item__right">
                            <Grid container spacing={1}>
                                {props.menuItem?.length > 0 &&
                                    props.menuItem.map((item, key) => {
                                        const slug = getIdentityFromHref(item.href);
                                        return (
                                            <Grid item xs={4} key={key}>
                                                <LinkAtom type="link-menu-material"
                                                          linkStyle="link__menu tx-c fw-b pointer"
                                                          url={slug}
                                                          name={item.name} handleClickLink={props.handleClickLinkParent}/>
                                                <div className={props.styleRootList}>
                                                    <List component="nav" aria-label="main mailbox folders">
                                                        {item.children.map((menu, index) => {
                                                            const subSlug = getIdentityFromHref(menu.href);
                                                            return (
                                                                <LinkAtom key={index}
                                                                          type="list-menu"
                                                                          listStyle={props.styleListMulti}
                                                                          name={menu.name}
                                                                          url={subSlug}
                                                                          handleClickLink={props.handleClickLink}
                                                                />
                                                                )
                                                        })}
                                                    </List>
                                                </div>
                                            </Grid>
                                        );
                                    })
                                }
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default MenuBrandNavbar;