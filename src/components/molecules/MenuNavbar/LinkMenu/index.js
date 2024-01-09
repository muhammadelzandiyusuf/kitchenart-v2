import { React, LinkMaterial } from 'libraries';
import 'assets/scss/menu/menu.scss';

const LinkMenu = (props) => {
    return (
        <div className={"list__menu " + props.styleMenu}>
            {props.menus?.length > 0 &&
                props.menus.map(item => (
                <LinkMaterial key={item.id} href={`/${item.url}`} className="list__menu__top">{item.name}</LinkMaterial>
            ))}
        </div>
    );
};

function areEqual(prevProps, nextProps) {
    let status = false;
    if (prevProps.styleMenu === nextProps.styleMenu) {
        status = true;
    }
    return status;
}

export default React.memo(LinkMenu, areEqual);