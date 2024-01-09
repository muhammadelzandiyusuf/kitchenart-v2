import {Grid, React, Suspense} from "libraries";

const ProfileUser = React.lazy(() => import('components/molecules/DashboardMolecule/Profile/ProfileUser'));
const ProfileShippingAddress = React.lazy(() => import('components/molecules/DashboardMolecule/Profile/ProfileShippingAddress'));

const ProfileOrganism = (props) => {
    const { shippingAddresses, shippingAddressSubmit, handleCloseShippingAddress, openShippingAddress, showLocation,
        setShowLocation, errors, actionShippingAddress, buttonLoading, handleShowShippingAddress, shippingAddress,
        handleUpdateShippingAddress, search, handleOpenDialog, handleChooseDefaultShipping, customer, handleToEditProfile,
        options, handleSearch } = props;

    return(
        <Suspense fallback={null}>
            <div className={'box-shadow-box bgc-white p-48 border-radius-10px mb-32'}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ProfileUser
                            customer={customer}
                            handleToEditProfile={handleToEditProfile}
                            options={options}
                        />
                    </Grid>
                </Grid>
            </div>

            <div className={'box-shadow-box bgc-white border-radius-10px mb-32'}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ProfileShippingAddress
                            shippingAddresses={shippingAddresses}
                            shippingAddressSubmit={shippingAddressSubmit}
                            handleCloseShippingAddress={handleCloseShippingAddress}
                            openShippingAddress={openShippingAddress}
                            showLocation={showLocation}
                            setShowLocation={setShowLocation}
                            errors={errors}
                            actionShippingAddress={actionShippingAddress}
                            buttonLoading={buttonLoading}
                            handleShowShippingAddress={handleShowShippingAddress}
                            shippingAddress={shippingAddress}
                            handleUpdateShippingAddress={handleUpdateShippingAddress}
                            search={search}
                            handleOpenDialog={handleOpenDialog}
                            handleChooseDefaultShipping={handleChooseDefaultShipping}
                            handleSearch={handleSearch}
                        />
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    )
}

export default ProfileOrganism;