import {List, ListItem, ListItemText, React, Skeleton} from 'libraries';

const ProductMenuPromotion = (props) => {

    return (
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
    );
};

export default ProductMenuPromotion;