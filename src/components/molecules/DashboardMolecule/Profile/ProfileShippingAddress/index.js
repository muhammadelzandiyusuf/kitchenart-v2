import {
    Button,
    Add,
    faEdit,
    faSearch,
    faTrash,
    FontAwesomeIcon,
    Grid,
    React,
    Suspense,
    useTranslation,
    useForm
} from "libraries";

const RadioButton = React.lazy(() => import('components/atoms/FormMaterialAtom/RadioButtonAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const FormShippingAddress = React.lazy(() => import('components/atoms/ShippingAddressAtom/FormShippingAddress'));

const ProfileShippingAddress = (props) => {
    const { shippingAddresses, shippingAddressSubmit, handleCloseShippingAddress, openShippingAddress,
        showLocation, setShowLocation, errors, actionShippingAddress, buttonLoading, handleShowShippingAddress,
        shippingAddress, handleUpdateShippingAddress, handleOpenDialog, handleChooseDefaultShipping,
        handleSearch } = props;
    const t = useTranslation();

    const {register, handleSubmit} = useForm();

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form onSubmit={handleSubmit(handleSearch)} className={'ds-f fl-r pt-24 pb-24 pr-8 w-40'}>
                        <input type={'text'} name={'search'} placeholder={t('label.searchForAddress')}
                               className={'w-80 fs-15 p-8 form-control border-radius-right-none outline-none'}
                               ref={register}
                        />
                        <Button type={'submit'}
                                className={'border-radius-left-none product__detail__add__product--btnSearch'}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </form>
                </Grid>
            </Grid>
            <div className={'border-top border-bottom pb-24 pt-24'}>
                <Grid container spacing={2}>
                    <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
                    <Grid item xs={3} sm={3} lg={3}>
                        <div className={'fs-18 fw-400'}>
                            {t('form.name')}
                        </div>
                    </Grid>
                    <Grid item xs={3} sm={3} lg={3}>
                        <div className={'fs-18 fw-400'}>
                            {t('label.shippingAddress')}
                        </div>
                    </Grid>
                    <Grid item xs={5} sm={5} lg={5}>
                        <div className={'fs-18 fw-400'}>
                            {t('label.shippingArea')}
                        </div>
                    </Grid>
                </Grid>
            </div>
            {shippingAddresses.map((shippingAddress, index) => {
                return(
                    <div className={'p-16 border-top fs-18'} key={index}>
                        <Grid container spacing={2}>
                            <Grid item xs={1} sm={1} lg={1}>
                                <div className={'ta-c'}>
                                    <RadioButton name={"default"} checked={shippingAddress.isDefault}
                                                 clicked={() => handleChooseDefaultShipping(shippingAddress.href)} />
                                </div>
                            </Grid>
                            <Grid item xs={3} sm={3} lg={3}>
                                {shippingAddress.receiptName} <br/> {shippingAddress.phoneNumber}
                            </Grid>
                            <Grid item xs={3} sm={3} lg={3}>
                                {shippingAddress.label} <br/> {shippingAddress.address}
                            </Grid>
                            <Grid item xs={4} sm={4} lg={4}>
                                {`
                                ${shippingAddress.province}, 
                                ${shippingAddress.city}, 
                                ${shippingAddress.district},
                                ${shippingAddress.postalCode}
                            `}
                            </Grid>
                            <Grid item xs={1} sm={1} lg={1} className={'ta-c'}>
                                <FontAwesomeIcon icon={faEdit} className={'mr-8 pointer'}
                                                 onClick={() => handleUpdateShippingAddress(shippingAddress.href)} />
                                <FontAwesomeIcon icon={faTrash} className={'pointer'}
                                                 onClick={() => handleOpenDialog(shippingAddress.href)} />
                            </Grid>
                        </Grid>
                    </div>
                )
            })}
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={'ta-r p-24'}>
                        <ButtonAtom variant="contained" color="secondary"
                                    styleView={'btn__default text-transf-cap'}
                                    name={t('label.addNewAddress')}
                                    icon={<Add />}
                                    clicked={handleShowShippingAddress} />
                    </div>
                </Grid>
            </Grid>
            <FormShippingAddress
                handleCloseShippingAddress={handleCloseShippingAddress}
                openShippingAddress={openShippingAddress}
                showLocation={showLocation}
                setShowLocation={setShowLocation}
                errors={errors}
                shippingAddressSubmit={shippingAddressSubmit}
                shippingAddress={shippingAddress}
                actionShippingAddress={actionShippingAddress}
                buttonLoading={buttonLoading}
            />
        </Suspense>
    )
}

export default ProfileShippingAddress;