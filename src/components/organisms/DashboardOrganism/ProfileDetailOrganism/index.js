import {React, Suspense, Grid} from 'libraries';

const ProfileBreadcrumb = React.lazy(() => import('components/molecules/DashboardMolecule/Profile/ProfileBreadcrumb'));
const ProfileSetting = React.lazy(() => import('components/molecules/DashboardMolecule/Profile/ProfileSetting'));
const FormVerification = React.lazy(() => import('components/molecules/FormMolecule/FormVerification'));

const ProfileDetailOrganism = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProfileBreadcrumb />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProfileSetting
                        tabMenu={props.tabMenu}
                        handleChangeMenu={props.handleChangeMenu}
                        customer={props.customer}
                        gender={props.gender}
                        handleChangeGender={props.handleChangeGender}
                        handleShowFormName={props.handleShowFormName}
                        formName={props.formName}
                        handleChangeName={props.handleChangeName}
                        formDate={props.formDate}
                        handleShowFormDate={props.handleShowFormDate}
                        dateBirth={props.dateBirth}
                        setDateBirth={props.setDateBirth}
                        handleDateChange={props.handleDateChange}
                        handleShowFormPassword={props.handleShowFormPassword}
                        formPassword={props.formPassword}
                        handleChangePassword={props.handleChangePassword}
                        formPhoneNumber={props.formPhoneNumber}
                        handleShowFormPhoneNumber={props.handleShowFormPhoneNumber}
                        handleChangePhoneNumber={props.handleChangePhoneNumber}
                        errors={props.errors}
                        handleSettingPassword={props.handleSettingPassword}
                    />
                </Grid>
            </Grid>
            <FormVerification
                handleOpen={props.handleOpen}
                handleClose={props.handleClose}
                getVerificationCode={props.getVerificationCode}
                setVerificationCode={props.setVerificationCode}
                verificationSubmit={props.verificationSubmit}
                setSeconds={props.setSeconds}
                seconds={props.seconds}
                phoneNumber={props.phoneNumber}
            />
        </Suspense>
    );
};

export default ProfileDetailOrganism;