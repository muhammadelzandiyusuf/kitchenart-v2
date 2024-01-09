import {React, Suspense, useState, useStyles} from 'libraries';

const PrimaryNavbar = React.lazy(() => import('components/organisms/PrimaryNavbar'));
const MenuNavbar = React.lazy(() => import('components/organisms/MenuNavbar'));
const MobileMenuNavbar = React.lazy(() => import('components/organisms/MobileMenuNavbar'));

const BaseContainer = React.memo(props => {

    const classes = useStyles();
    const [position] = useState('fixed');

    return (
        <Suspense fallback={null}>
            <PrimaryNavbar position={position} styleNavbar="primary__navbar___spacecontent" styleInputInput={classes.inputInput} />
            <MenuNavbar styleMenu="menu ps-fx" />
            <MobileMenuNavbar />
            {props.children}
        </Suspense>
    );
});

export default BaseContainer;