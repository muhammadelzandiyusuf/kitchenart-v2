import { React, Grid, List, Suspense } from 'libraries';
import { getIdentityFromHref } from 'utils';
import 'assets/scss/menu/menu.scss';

const ListMenuAtom = React.lazy(() => import('components/atoms/ListMenuAtom'));
const TypographyAtom = React.lazy(() => import('components/atoms/TypographyAtom'));
const LinkAtom = React.lazy(() => import('components/atoms/LinkAtom'));

const MenuProductNavbar = (props) => {

    const childCategory = props.menuItem?.length && props.menuItem.map((item, key) => {
        const slug = getIdentityFromHref(item.href);
        return (
            <Grid item xs={4} key={key}>
                <LinkAtom type="link-menu-material" linkStyle="link__menu tx-c fw-b pointer" url={`${slug}`}
                          name={item.name} handleClickLink={props.handleClickLinkParent}  />
                <div className={props.styleRootList}>
                    <List component="nav" aria-label="main mailbox folders">
                        {item.children?.length > 0 &&
                            item.children.map((menu, index) => {
                            const childSlug = getIdentityFromHref(menu.href);
                            return (
                                <LinkAtom key={index} type="list-menu"
                                          listStyle={props.styleListMulti} name={menu.name}
                                          url={childSlug} handleClickLink={props.handleClickLink} />
                            );
                        })}
                    </List>
                </div>
            </Grid>
        );
    });

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={2}>
                    <div className="menu__left menu__left--navbar">
                        {props.menuProduct?.length &&
                            <ListMenuAtom
                                listStyle={props.styleList}
                                lists={props.menuProduct}
                                index={props.selectedIndexProduct}
                                clicked={props.handleClickProduct} />
                        }
                    </div>
                </Grid>
                <Grid item xs={12} lg={10}>
                    <div className="menu__item">
                        <TypographyAtom type="title" variant="h6"
                                        typographyStyle="link__menu__title fw-b mb-20 pointer"
                                        title={props.title}
                                        clicked={props.handleClickTitle} />
                        <div className="menu__item__right">
                            <Grid container spacing={1}>
                                {props.menuItem?.length ? childCategory : null}
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export  default React.memo(MenuProductNavbar);