import { List, React, Suspense} from 'libraries';
import { getHostUrl, getIdentityFromHref } from 'utils';

const TypographyAtom = React.lazy(() => import('components/atoms/TypographyAtom'));
const LinkAtom = React.lazy(() => import('components/atoms/LinkAtom'));

const MobileMenuBrandChild = (props) => {

    const logo = getHostUrl(props.logo);

    return (
        <Suspense fallback={null}>
            <TypographyAtom
                type="image"
                variant="h6"
                image={logo}
                styleImage="w-50 pointer"
                alt="logo"
                clicked={props.handleClickLogo} />
            <List component="nav" aria-label="main mailbox folders">
                {props.menuItem?.length > 0 &&
                    props.menuItem.map((item, key) => {
                        const slug = getIdentityFromHref(item.href);
                        return (
                            <div key={key}>
                                <LinkAtom type="link-menu-material" linkStyle="link__menu tx-c fw-b" url={`parent/${slug}`}
                                          name={item.name} handleClickLink={props.handleClickLinkParent}/>
                                <div className={props.styleRootList}>
                                    <List component="nav" aria-label="main mailbox folders">
                                        {item.children?.length > 0 &&
                                            item.children.map((menu, index) => {
                                            const childSlug = getIdentityFromHref(menu.href);
                                            return(
                                                <LinkAtom key={index} type="list-menu-secondary"
                                                          listStyle={props.styleListMulti}
                                                          name={menu.name} url={childSlug}
                                                          handleClickLink={props.handleClickLink} />
                                            );
                                        })}
                                    </List>
                                </div>
                            </div>
                        );
                    })}
            </List>
        </Suspense>
    );
};

export default React.memo(MobileMenuBrandChild);