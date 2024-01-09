import {React, Suspense, ListItem, ListItemIcon, ListItemText, FontAwesomeIcon} from 'libraries';

import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(far, fas, fab);

const DashboardMenuItem = (props) => {

    const path = props.path !== undefined && props.path !== 'edit' ? props.path : 'profile';

    return (
        <Suspense fallback={null}>
            <ListItem button
                      selected={path === props.href}
                      onClick={() => props.handleChangeUrl(props.href)}>
                <ListItemIcon>
                    <FontAwesomeIcon icon={props.icon} className={'fs-26 tx-c'}/>
                </ListItemIcon>
                <ListItemText primary={props.name} className={'fs-20 tx-c'} />
            </ListItem>
        </Suspense>
    );
};

export default DashboardMenuItem;