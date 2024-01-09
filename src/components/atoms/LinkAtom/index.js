import {React, Link, ListItem, ListItemText, LinkMaterial} from 'libraries';

const LinkAtom = (props) => {

    const listMenu = (
        <ListItem className={props.listStyle} button onClick={(event) => props.handleClickLink(event, props.url)}>
            <ListItemText className="tx-c" primary={props.name} />
        </ListItem>
    );

    const listMenuSecondary = (
        <ListItem className={props.listStyle} button onClick={(event) => props.handleClickLink(event, props.url)}>
            <ListItemText className="tx-c" secondary={props.name} />
        </ListItem>
    );

    const linkMenu = (
        <Link to={`/${props.url}`} className={props.linkStyle}>
            {props.name}
        </Link>
    );

    const linkMenuMaterial = (
        <LinkMaterial className={props.linkStyle} onClick={(event) => props.handleClickLink(event, props.url)}>
            {props.name}
        </LinkMaterial>
    );

    switch (props.type) {
        case 'list-menu':
            return listMenu;
        case 'list-menu-secondary':
            return listMenuSecondary;
        case 'link-menu':
            return linkMenu;
        case 'link-menu-material':
            return linkMenuMaterial;
        default:
            return linkMenu;
    }
};

export default LinkAtom;