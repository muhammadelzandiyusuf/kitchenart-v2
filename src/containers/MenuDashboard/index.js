import {
    React,
    Suspense,
    Grid,
    useEffect,
    useState,
    useHistory,
    useLocation,
    useSelector,
    useTranslation,
    Localbase
} from 'libraries';

import menuDashboardEn from 'configs/data/menuDashboardEn.json';
import menuDashboardId from 'configs/data/menuDashboardId.json';
import {languageSelector} from "modules";

import 'assets/scss/dashboard/dashboardMenu.scss';
import {getCarts, headWishlistProduct} from "services";

const MenuDashbordOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/MenuDashbord'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));

const MenuDashboard = (props) => {

    const t = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const selector = useSelector(languageSelector);
    const dbCollection = new Localbase('db');

    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [language, setLanguage] = useState('en');
    const [path, setPath] = useState(null);
    const [openMenuDashboard, setOpenMenuDashboard] = useState(false);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        setLanguage(selector.locale);
        const pathName = location.pathname.split('/',);
        setPath(pathName[2]);
        let db = new Localbase('db');
        db.collection('customer').get().then(customer => {
            if (customer?.length > 0) {
                setCustomer(customer);
            };
        });
    }, [selector, location, history]);

    const handleChangeUrl = (url) => {
        if (url === 'profile') {
            history.push(`/${url}`);
        }
        else {
            history.push(`/profile/${url}`);
        };
        setOpenMenuDashboard(false);
    };

    const handleOpenMenuDashboard = () => {
        setOpenMenuDashboard(true);
    };

    const handleCloseMenuDashboard = () => {
        setOpenMenuDashboard(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        if (dbCollection.collection('customer').delete()) {
            const access = localStorage.getItem('access');
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            };
            getCarts(payload).then(response => {
                if (response?.axiosResponse?.status === 401) {
                    headWishlistProduct(payload).then(result => {
                        if (result?.axiosResponse?.status === 401) {
                            setSnackbar({type: 'success', message: t('message.logoutPage')});
                            setOpen(true);
                            history.push('/');
                        };
                    });
                };
            });
        };
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    return (
        <Suspense fallback={null}>
            <div className={'dashboard bgc-f5'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <MenuDashbordOrganism
                            name={`${customer !== null ? `${customer[0]?.firstName} ${customer[0]?.lastName}` : ''}`}
                            language={language}
                            menuDashboardEn={menuDashboardEn}
                            menuDashboardId={menuDashboardId}
                            handleChangeUrl={handleChangeUrl}
                            path={path}
                            openMenuDashboard={openMenuDashboard}
                            handleCloseMenuDashboard={handleCloseMenuDashboard}
                            handleOpenMenuDashboard={handleOpenMenuDashboard}
                            handleLogout={handleLogout}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        {props.children}
                    </Grid>
                </Grid>
            </div>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
        </Suspense>
    );
};

export default MenuDashboard;