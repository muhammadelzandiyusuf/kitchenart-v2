import {
    React,
    Suspense,
    Dialog,
    useTheme,
    useMediaQuery,
    DialogTitle,
    DialogContent,
    List,
    faSignOutAlt, IconButton, Close, useTranslation, Slide
} from 'libraries';

const DashboardMenuTitle = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardMenuTitle'));
const DashboardMenuItem = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardMenuItem'));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const DashboardMenuModal = (props) => {

    const t = useTranslation();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                open={props.openMenuDashboard}
                onClose={props.handleCloseMenuDashboard}
                aria-labelledby="menu-dashboard"
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle id="rmenu-dashboard">
                    <div className={'pt-16 pb-8 border-bottom mr-24 ml-24'}>
                        <DashboardMenuTitle
                            name={props.name}
                        />
                    </div>
                    <div className={'ps-ab top-right'}>
                        <IconButton aria-label="close" onClick={props.handleCloseMenuDashboard}>
                            <Close />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className={'pb-16'}>
                        <List component="nav" aria-label="dashboard menu">
                            {props.language === 'en' &&
                                props.menuDashboardEn.map((item, index) => (
                                <DashboardMenuItem
                                    key={index}
                                    icon={item.icon}
                                    name={item.name}
                                    href={item.href}
                                    handleChangeUrl={props.handleChangeUrl}
                                    path={props.path}
                                />
                            ))}
                            {props.language === 'id' &&
                                props.menuDashboardId.map((item, index) => (
                                <DashboardMenuItem
                                    key={index}
                                    icon={item.icon}
                                    name={item.name}
                                    href={item.href}
                                    handleChangeUrl={props.handleChangeUrl}
                                    path={props.path}
                                />
                            ))}
                        </List>
                    </div>
                    <div className={'mr-24 ml-24 border-bottom'}></div>
                    <div className={'mb-32'}>
                        <List component="nav" aria-label="dashboard menu">
                            <DashboardMenuItem
                                icon={faSignOutAlt}
                                name={t('label.logout')}
                                href={'logout'}
                                handleChangeUrl={props.handleLogout}
                            />
                        </List>
                    </div>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default DashboardMenuModal;