import { React, List, ListItem, ListItemText, useStyles, Suspense, Skeleton } from 'libraries';
import { getIdentityFromHref } from 'utils/helper';

const ListMenuAtom = (props) => {

    const classes = useStyles();

    const listAtom = (
        <Suspense fallback={null}>
            <div className={classes.rootList}>
                <List component="nav" aria-label="main mailbox folders">
                    {props.lists?.length > 0 &&
                        props.lists.map((item, key) => (
                        <ListItem className={props.listStyle} key={key} button selected={key === props.index} onClick={(event) => props.clicked(event, item, key)}>
                            <ListItemText className={`${props.styleTextItem} tx-c`} primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Suspense>
    );

    const listAtomTopBrand = (
        <Suspense fallback={null}>
            <div className={classes.rootList}>
                <List component="nav" aria-label="main mailbox folders">
                    {props.lists?.length > 0 &&
                        props.lists.map((item, key) => {
                        const slug = getIdentityFromHref(item.href);
                        return (
                            <ListItem className={props.listStyle} key={key} button selected={`${slug}-top` === `${props.index}-top`}
                                      onClick={(event) => props.clicked(event, item, slug)}>
                                <ListItemText className={`${props.styleTextItem} tx-c`} primary={item.name}/>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        </Suspense>
    );

    const ListAtomPromo = (
        <Suspense fallback={null}>
            <List component="nav" aria-label="secondary mailbox folders">
                {props.lists?.length > 0 &&
                    props.lists.map((item, key) => {
                    if (props.loading) {
                        return (
                            <Skeleton key={key} variant="text" height={30} />
                        );
                    }
                    else{
                        return (
                            <ListItem key={key} button
                                      onClick={() => props.clicked(item.type)}
                                      selected={props.param === item.type}
                            >
                                <ListItemText secondary={item.name} />
                            </ListItem>
                        )
                    }
                })}
            </List>
        </Suspense>
    );

    switch (props.type) {
        case 'list-item':
            return listAtom;
        case 'list-item-brand':
            return listAtomTopBrand;
        case 'list-item-promo':
            return ListAtomPromo;
        default:
            return listAtom;
    };

};

export default ListMenuAtom;