import {React, Suspense, Tabs, Tab, tabStyles, useTranslation} from 'libraries';

import 'assets/scss/tab/tab.scss';

const ProfileAbout = React.lazy(() => import('components/molecules/DashboardMolecule/Profile/ProfileAbout'));
const ProfileSecurity = React.lazy(() => import('components/molecules/DashboardMolecule/Profile/ProfileSecurity'));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
};

const ProfileSetting = (props) => {

    const {customer, gender, handleChangeGender, handleShowFormName, formName, handleChangeName, formDate,
        handleShowFormDate, dateBirth, setDateBirth, handleDateChange, handleShowFormPassword, formPassword,
        handleChangePassword, formPhoneNumber, handleShowFormPhoneNumber, handleChangePhoneNumber, errors} = props;

    const t = useTranslation();
    const classes = tabStyles();

    return (
        <Suspense fallback={null}>
            <div className={'box-shadow-box bgc-white p-16 border-radius-10px mb-32 mt-16'}>
                <div className={classes.rootTab}>
                    <Tabs
                        value={props.tabMenu}
                        onChange={props.handleChangeMenu}
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="menu-edit-profile"
                        className={'border-bottom'}
                    >
                        <Tab className="fs-20 text-transf-cap pr-16 pl-16" label={t('label.settingProfile')} {...a11yProps(0)} />
                        <Tab className="fs-20 text-transf-cap pr-16 pl-16" label={t('label.securityProfile')} {...a11yProps(1)} />
                    </Tabs>
                </div>
                <div role="tabpanel" hidden={props.tabMenu !== 0} id={`scrollable-auto-tabpanel-0`}
                     aria-labelledby={`scrollable-auto-tab-l-0`}>
                    {props.tabMenu === 0 &&
                        <ProfileAbout
                            formName={formName}
                            customer={customer}
                            handleShowFormName={handleShowFormName}
                            handleChangeName={handleChangeName}
                            handleShowFormDate={handleShowFormDate}
                            dateBirth={dateBirth}
                            setDateBirth={setDateBirth}
                            handleDateChange={handleDateChange}
                            gender={gender}
                            handleChangeGender={handleChangeGender}
                            formDate={formDate}
                        />
                    }
                </div>
                <div role="tabpanel" hidden={props.tabMenu !== 1} id={`scrollable-auto-tabpanel-1`}
                     aria-labelledby={`scrollable-auto-tab-l-1`}>
                    {props.tabMenu === 1 &&
                        <ProfileSecurity
                            customer={customer}
                            handleShowFormPassword={handleShowFormPassword}
                            formPassword={formPassword}
                            handleChangePassword={handleChangePassword}
                            handleShowFormPhoneNumber={handleShowFormPhoneNumber}
                            formPhoneNumber={formPhoneNumber}
                            handleChangePhoneNumber={handleChangePhoneNumber}
                            error={errors}
                        />
                    }
                </div>
            </div>
        </Suspense>
    );
};

export default ProfileSetting;