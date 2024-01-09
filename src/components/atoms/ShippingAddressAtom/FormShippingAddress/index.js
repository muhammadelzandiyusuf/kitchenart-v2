import {
    AsyncSelect,
    Close, Dialog, DialogContent,
    DialogTitle, FormControl,
    IconButton, Input,
    React, Suspense,
    useForm,
    useMediaQuery,
    useState,
    useTheme,
    useTranslation,
    yup
} from "libraries";
import {addressDestination} from "services";
import {useEffect} from "react";

const FormTextField = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const Typography = React.lazy(() => import('components/atoms/TypographyAtom'));
const ShippingAddressLocation = React.lazy(() => import('components/atoms/ShippingAddressAtom/ShippingAddressLocation'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const FormShippingAddress = (props) => {
    const { setShowLocation, openShippingAddress, handleCloseShippingAddress, shippingAddressSubmit, showLocation, errors,
        shippingAddress, actionShippingAddress, buttonLoading } = props;
    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [coordinates, setCoordinates] = useState({
        center: {
            lat: 0,
            lng: 0
        }
    });
    const [chooseCoordinates, setChooseCoordinates] = useState([]);
    const [selectedPicAddress, setSelectedPicAddress] = useState(null);
    const [info, setInfo] = useState(false);
    const [valueAddress, setValueAddress] = useState('');
    const [valueLabel, setValueLabel] = useState('');
    const [valueReceiptName, setValueReceiptName] = useState('');
    const [valueHref, setValueHref] = useState('');
    const [valuePhone, setValuePhone] = useState({
        phoneNumber: '',
    });
    const [value, setValue] = useState({
        province: '',
        city: '',
        district: '',
        subDistrict: '',
        postalCode: '',
        destinationCode: '',
        country: '',
    });

    useEffect(() => {
        if (actionShippingAddress === 'update') {
            setValueAddress(shippingAddress.address);
            setValueLabel(shippingAddress.label);
            setValueReceiptName(shippingAddress.receiptName);
            setValuePhone({phoneNumber: shippingAddress.phoneNumber});
            setValueHref(shippingAddress.href);
            setValue({
                province: shippingAddress.province,
                city: shippingAddress.city,
                district: shippingAddress.district,
                subDistrict: shippingAddress.subDistrict,
                postalCode: shippingAddress.postalCode,
                destinationCode: shippingAddress.destinationCode,
                country: shippingAddress.country
            })
            setSelectedPicAddress({
                label: `${shippingAddress.province}, ${shippingAddress.city}, ${shippingAddress.district}, ${shippingAddress.subDistrict}, ${shippingAddress.postalCode}`,
                value: `${shippingAddress.province}/${shippingAddress.city}/${shippingAddress.district}/${shippingAddress.subDistrict}/${shippingAddress.postalCode}/${shippingAddress.destinationCode}/${shippingAddress.country}`
            })
            setCoordinates({
                center: {
                    lat: shippingAddress.latitude,
                    lng: shippingAddress.longitude
                }
            })
        } else {
            setValueAddress('');
            setValueLabel('');
            setValueReceiptName('');
            setValuePhone({phoneNumber: ''});
            setValueHref('');
            setValue({
                province: '',
                city: '',
                district: '',
                subDistrict: '',
                postalCode: '',
                destinationCode: '',
                country: '',
            });
            setSelectedPicAddress(null);
            setCoordinates({
                center: {
                    lat: 0,
                    lng: 0
                }
            })
        }
    }, [shippingAddress, actionShippingAddress]);

    const handleAddress = (e) => {
        setValueAddress(e.target.value);
    }

    const handleLabel = (e) => {
        setValueLabel(e.target.value);
    }

    const handleReceiptName = (e) => {
        setValueReceiptName(e.target.value);
    }

    const handlePhone = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setValuePhone({...valuePhone, phoneNumber: value})
    };

    const registerSchema = yup.object().shape({
        name: yup.string().required(),
        address: yup.string().required(),
        phoneNumber: yup.string().required(),
    });

    const {register, handleSubmit} = useForm({
        validationSchema: registerSchema
    });

    const fetchDestinationAddress = async (inputValue) => {
        let result = [];
        const payload = {
            'params': {
                'q': inputValue
            }
        }

        await addressDestination(payload).then(response => {
            if (response.axiosResponse.status === 200) {
                const addresses = response.axiosResponse.data;
                if (addresses.length) {
                    addresses.forEach(address => {
                        result.push({
                            label: `${address.province}, ${address.city}, ${address.district}, ${address.subDistrict}, ${address.postalCode}`,
                            value: `${address.province}/${address.city}/${address.district}/${address.subDistrict}/${address.postalCode}/${address.destinationCode}/${address.country}/${address.coordinates.longitude}/${address.coordinates.latitude}`
                        })
                    })
                }
            }
        });

        return result;
    };

    const loadOptionAddress = (inputValue) => {
        return fetchDestinationAddress(inputValue);
    };

    const handlePICAddress = (e) => {
        const picAddress = e.value;
        const address = picAddress.split("/");

        setCoordinates({
            center: {
                lat: address[7],
                lng: address[8]
            }
        })
        setSelectedPicAddress(e);
        setInfo(false);
        setValue({...value, province: address[0], city: address[1], district: address[2], subDistrict: address[3], postalCode: address[4], destinationCode: address[5], country: address[6]});
    }

    const handleLocation = () => {
        if (selectedPicAddress && valueAddress) {
            setShowLocation(true);
            setInfo(false);
        } else {
            setInfo(true);
        }
    }

    const handleClose = () => {
        setShowLocation(false);
    }

    const handleChooseLocation = () => {
        setCoordinates(chooseCoordinates);
        setShowLocation(false);
    }

    const [textAddress] = useState(
        {
            autoComplete: "label",
            name: "label",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "label",
            onChange: handleLabel,
            required: true
        }
    )

    const [textName] = useState(
        {
            autoComplete: "receiptName",
            name: "receiptName",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "receiptName",
            styleText: "text__name-receiver",
            onChange: handleReceiptName,
            required: true
        }
    )

    const [textPhone] = useState(
        {
            typeForm: 'text-field-number',
            name: "phoneNumber",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "phoneNumber",
            values: valuePhone.phoneNumber,
            styleText: "w-40",
            onChange: handlePhone,
            required: true
        }
    )

    const [textPostalCode] = useState(
        {
            typeForm: 'text-field-number',
            name: "postalCode",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "postalCode",
            styleText: "w-30",
            readonly: true,
            max: "5"
        }
    )

    const [textDetailAddress] = useState(
        {
            typeForm: 'text-multiline',
            name: "address",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "address",
            onChange: handleAddress,
            required: true,
            rows: 4
        }
    );

    return(
        <Dialog
            fullScreen={fullScreen}
            open={openShippingAddress}
            onClose={handleCloseShippingAddress}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={'ps-ab top-right'}>
                {showLocation === false ? (
                    <IconButton aria-label="close" onClick={handleCloseShippingAddress}>
                        <Close/>
                    </IconButton>
                ) : (
                    <IconButton aria-label="close" onClick={handleClose}>
                        <Close/>
                    </IconButton>
                )
                }
            </div>
            <DialogTitle id="responsive-dialog-title" className={'c-black fw-b ta-c'}>
                {showLocation === false ? (<div>{t('label.titleAddAddress')}</div>) : (<div>{t('label.titleMarkLocation')}</div>) }
            </DialogTitle>
            <DialogContent>
                <Suspense fallback={null}>
                    {showLocation === false ? (
                        <form onSubmit={handleSubmit(shippingAddressSubmit)}>
                            <FormTextField {...textAddress} values={valueLabel} error={errors?.label} label={t('form.addressLabel')} />
                            <FormTextField {...textName} values={valueReceiptName} error={errors?.receiptName} label={t('form.name')} />
                            <FormTextField {...textPhone} values={valuePhone.phoneNumber} error={errors?.phoneNumber} label={t('form.phoneNumber')}/>
                            <FormControl variant="outlined" margin="normal" className="text__city-district w-80" required={true}>
                                <AsyncSelect
                                    defaultOptions
                                    loadOptions={loadOptionAddress}
                                    onChange={(e) => handlePICAddress(e)}
                                    value={selectedPicAddress}
                                    placeholder={t('form.cityOrDistrict')}
                                    error={errors?.phoneNumber}
                                />
                            </FormControl>
                            <Input type="hidden" inputRef={register} name="province" value={value.province} />
                            <Input type="hidden" inputRef={register} name="city" value={value.city} />
                            <Input type="hidden" inputRef={register} name="district" value={value.district} />
                            <Input type="hidden" inputRef={register} name="subDistrict" value={value.subDistrict} />
                            <Input type="hidden" inputRef={register} name="areaCode" value={value.destinationCode} />
                            <Input type="hidden" inputRef={register} name="country" value={value.country} />
                            <FormTextField {...textPostalCode} label={t('form.postalCode')} values={value.postalCode} />
                            <FormTextField {...textDetailAddress} values={valueAddress} error={errors?.address} label={t('form.detailAddress')} />
                            <Input type="hidden" inputRef={register} name="latitude" value={coordinates.center.lat} />
                            <Input type="hidden" inputRef={register} name="longitude" value={coordinates.center.lng} />
                            <Input type="hidden" inputRef={register} name="href" value={valueHref} />
                            <Typography title={t('label.markLocation')} typographyStyle="tx-l mt-20 fs-20" />
                            {coordinates.center.lat === 0 && coordinates.center.lng === 0 ? (
                                <>
                                    <div className={'fs-16 tx-c pointer'} onClick={handleLocation}>
                                        <span className={'tc-p td-u pointer'}>{t('label.chooseLocation')}</span>
                                    </div>
                                    {info === true &&
                                    <div className={'fs-12 tx-c'}>
                                        <span className={'tc-p td-u'}>{t('message.errorLocation')}</span>
                                    </div>
                                    }
                                </>
                            ) : (
                                <div className={'fs-16 tx-c'}>
                                    {t('message.successLocation')} <span className={'tc-p td-u pointer'} onClick={handleLocation}>{t('label.update')}</span>
                                </div>
                            )}
                            <div className="mt-20 ta-r mb-20">
                                <ButtonAtom
                                    type={'button-text'}
                                    variant={'outlined'}
                                    name={t('label.cancel')}
                                    styleView={'text-transf-cap w-20 mr-16'}
                                    clicked={handleCloseShippingAddress}
                                />
                                {buttonLoading ? (
                                    <ButtonAtom
                                        type={'button-loading'}
                                        styleView={'w-20 text-transf-cap fw-b tc-white bgc-primary'}
                                        styleImage={'w-25'}
                                    />
                                ):(
                                    <ButtonAtom
                                        variant="contained"
                                        name={t('form.add')}
                                        type="submit"
                                        styleView={"w-20 btn__primary"}
                                    />
                                )}
                            </div>
                        </form>
                    ) : (
                        <ShippingAddressLocation
                            valueAddress={valueAddress}
                            customerAddress={selectedPicAddress}
                            coordinates={coordinates}
                            setChooseCoordinates={setChooseCoordinates}
                            handleChooseLocation={handleChooseLocation}
                        />
                    )
                    }
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}

export default FormShippingAddress;