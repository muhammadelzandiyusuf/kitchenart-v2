import { List, ListItem, ListItemText, React, Suspense, listStyles } from 'libraries';
import {getIdentityFromHref} from "utils";

const MobileMenuProduct = (props) => {

    const classes = listStyles();
    const { menuItems } = props;

    const product = menuItems?.length > 0 && menuItems.map((item, index) => {
        const slug = getIdentityFromHref(item.href);
        return (
            <ListItem key={index} button className={classes.listMobileMenu}
                      onClick={(event) => props.clicked(event, item, slug)}
            >
                <ListItemText secondary={item.name}/>
            </ListItem>
        );
    })

    return (
        <Suspense fallback={null}>
            <List component="nav" aria-label="primary menu">
                { menuItems?.length ? product : null }
            </List>
        </Suspense>
    );
};

export default MobileMenuProduct;