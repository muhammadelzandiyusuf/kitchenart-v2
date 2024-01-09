import { React, Suspense, List } from 'libraries';
import {getIdentityFromHref} from "utils";

const LinkAtom = React.lazy(() => import('components/atoms/LinkAtom'));

const MobileMenuSubProduct = (props) => {

    const product = props.childCategory?.length > 0 && props.childCategory.map((menu, index) => {
        const slug = getIdentityFromHref(menu.href);
        return (
            <LinkAtom key={index} type="list-menu-secondary" listStyle={props.styleListMulti} name={menu.name}
                      url={slug} handleClickLink={props.handleClickLink}
            />
        );
    });

    return (
        <Suspense fallback={null}>
            <div className={props.styleRootList}>
                <List component="nav" aria-label="main mailbox folders">
                    {props.childCategory?.length ? product : null}
                </List>
            </div>
        </Suspense>
    );
};

export default MobileMenuSubProduct;