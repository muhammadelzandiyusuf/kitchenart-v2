import {React, Suspense, useState, useStyles} from 'libraries';

const TopNavbar = React.lazy(() => import('components/organisms/TopNavbar'));
const PrimaryNavbar = React.lazy(() => import('components/organisms/PrimaryNavbar'));
const MenuNavbar = React.lazy(() => import('components/organisms/MenuNavbar'));
const MobileMenuNavbar = React.lazy(() => import('components/organisms/MobileMenuNavbar'));

const HomeContainer = React.memo(props => {

    const classes = useStyles();
    const [position] = useState('static');

   return (
       <Suspense fallback={null}>
           <div className="home__navbar">
               <TopNavbar styleTopNavbar={classes.sectionDesktop} />
               <PrimaryNavbar position={position} styleInputInput={classes.inputInputHome} />
               <MenuNavbar styleMenu="menu ps-ab" />
               <MobileMenuNavbar />
           </div>
           {props.children}
       </Suspense>
   );
});

export default HomeContainer;