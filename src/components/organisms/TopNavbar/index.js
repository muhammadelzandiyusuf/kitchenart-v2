import { React, Grid, Suspense, useState } from 'libraries';

const LinkMenu = React.lazy(() => import('components/molecules/MenuNavbar/LinkMenu'));

const TopNavbar = React.memo(props => {

    const [dataMenuRight] = useState([
       {id: 1, name: 'About KitchenArt', url: 'about'},
       {id: 2, name: 'Bussiness Partner', url: 'bussiness-partner'},
       {id: 3, name: 'Help', url: 'help'},
    ]);

    const [dataMenuLeft] = useState([
        {id: 1, name: 'Comercial Kitchen', url: '/register'},
        {id: 2, name: 'Bath Kitchen', url: '/login'},
    ])

    return (
        <Suspense fallback={null}>
            <div className={`${props.styleTopNavbar} navbar_top`}>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={6} lg={6}>
                        <LinkMenu menus={dataMenuLeft} styleMenu="pt-10 pb-10" />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        <LinkMenu menus={dataMenuRight} styleMenu="ta-r pt-10 pb-10" />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
});

export default TopNavbar;