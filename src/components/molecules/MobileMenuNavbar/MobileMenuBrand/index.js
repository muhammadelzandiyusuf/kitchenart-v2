import {List, ListItem, ListItemText, React, Suspense} from 'libraries';

const MobileMenuBrand = (props) => {

    const { menuItemTop, menuItems } = props;

    return (
        <Suspense fallback={null}>
            <h4 className="menu__left__title fw-b">Top Brands</h4>
            <List component="nav" aria-label="primary menu" className={props.styleList}>
                {menuItemTop?.length > 0 &&
                    menuItemTop.map((item, index) => (
                    <ListItem key={index} button className={props.styleListMobileMenu}
                              onClick={(event) => props.clicked(event, item, item.name)}
                    >
                        <ListItemText secondary={item.name} />
                    </ListItem>
                ))}
            </List>
            <h4 className="menu__left__title fw-b">Brands</h4>
            <List component="nav" aria-label="primary menu">
                {menuItems?.length > 0 &&
                    menuItems.map((item, index) => (
                    <ListItem key={index} button
                              onClick={(event) => props.clicked(event, item, item.name)}
                    >
                        <ListItemText secondary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Suspense>
    );
};

export default React.memo(MobileMenuBrand);