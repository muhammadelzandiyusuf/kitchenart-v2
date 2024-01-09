import {React, Suspense, List, faSignOutAlt, useTranslation, IconButton, MoreVert} from 'libraries';

const DashboardMenuTitle = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardMenuTitle'));
const DashboardMenuItem = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardMenuItem'));
const DashboardMenuModal = React.lazy(() => import('components/molecules/DashboardMolecule/Dashboard/DashboardMenuModal'));

const MenuDashbordOrganism = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'border-radius-10px bgc-white style__view--desktop'}>
                <div className={'pt-16 pb-8 border-bottom mr-24 ml-24'}>
                    <DashboardMenuTitle
                        name={props.name}
                    />
                </div>
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
            </div>
            <div className={'bgc-white style__view--mobile'}>
                <div className={'ta-r'}>
                    <IconButton aria-label="close" onClick={props.handleOpenMenuDashboard}>
                        <MoreVert />
                    </IconButton>
                </div>
                <DashboardMenuModal
                    name={props.name}
                    language={props.language}
                    menuDashboardEn={props.menuDashboardEn}
                    menuDashboardId={props.menuDashboardId}
                    path={props.path}
                    openMenuDashboard={props.openMenuDashboard}
                    handleCloseMenuDashboard={props.handleCloseMenuDashboard}
                    handleChangeUrl={props.handleChangeUrl}
                    handleLogout={props.handleLogout}
                />
            </div>
        </Suspense>
    );
};

export default MenuDashbordOrganism;