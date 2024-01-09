import {React, Suspense, Grid, useState, useForm, useEffect, moment, useTranslation, RadioGroup, FormControlLabel,
    FormHelperText, Radio, ImgId, ImgOtherId, FormControl, Input, AsyncSelect
} from "libraries";
import {businessPartner, addressDestination} from "services";
import {fileToBase64} from "utils";

import 'assets/scss/form/form.scss';

const Checkbox = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const FormTextField = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const SelectAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/SelectAtom'));
const Typography = React.lazy(() => import('components/atoms/TypographyAtom'));
const ButtonRegister = React.lazy(() => import('components/atoms/ButtonAtom'));

const FormBusinessPartner = (props) => {
    const t = useTranslation();

    const [optionCompanyIndustry, setOptionCompanyIndustry] = useState([]);
    const [optionDocumentIdentityType, setOptionDocumentIdentityType] = useState([]);
    const [optionOtherDocumentType, setOptionOtherDocumentType] = useState([]);
    const [selectedPicAddress, setSelectedPicAddress] = useState(null);
    const [selectedCompanyAddress, setSelectedCompanyAddress] = useState(null);
    const [valueRegistration, setValueRegistration] = useState('professional');
    const [valueGender, setValueGender] = useState('male');

    const handleChangeRegister = (event) => {
        setValueRegistration(event.target.value);
    };

    const handleChangeGender = (event) => {
        setValueGender(event.target.value);
    };

    const [documentIdentityFile, setDocumentIdentityFile] = useState({
        selectedFile: ImgId,
        style: "img-file",
        documentIdentityFile: ""
    });

    const [otherDocumentFile, setOtherDocumentFile] = useState({
        selectedFile: ImgOtherId,
        style: "img-file",
        otherDocumentFile: ""
    });

    const [value, setValue] = useState({
        province: '',
        city: '',
        district: '',
        subDistrict: '',
        postalCode: '',
    });

    const [valueCompany, setValueCompany] = useState({
        companyProvince: '',
        companyCity: '',
        companyDistrict: '',
        companySubDistrict: '',
        companyPostalCode: '',
    });

    const [valueCompanyPhone, setValueCompanyPhone] = useState({
        companyPhone: '',
    });

    const [valuePhone, setValuePhone] = useState({
        phoneNumber: '',
    });

    const [valueIdentity, setValueIdentity] = useState({
        identityNumber: '',
    });

    const [valueCheck, setValueCheck] = useState({
        allowTermsConditions: '',
    });

    const [valueCheckSubscribe, setValueCheckSubscribe] = useState({
        allowSubscribe: '',
    });

    const handleChangeCheckbox = (event) => {
        setValueCheck({...valueCheck, allowTermsConditions: event.target.checked});
    };

    const handleChangeCheckboxSubscribe = (event) => {
        setValueCheckSubscribe({...valueCheckSubscribe, allowSubscribe: event.target.checked});
    };

    const handleCompanyPhone = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setValueCompanyPhone({...valueCompanyPhone, companyPhone: value})
    };

    const handlePhone = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setValuePhone({...valuePhone, phoneNumber: value})
    };

    const handleIdentityNumber = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setValueIdentity({...valueIdentity, identityNumber: value})
    };

    const {register, handleSubmit} = useForm();

    const now = moment().format("YYYY-MM-DD");
    const enabled = valueCheck.allowTermsConditions && valueCheckSubscribe.allowSubscribe;

    useEffect(() => {
        businessPartner().then(result => {
            if (result) {
                setOptionCompanyIndustry(result.actions?.POST?.profile?.children?.companyIndustry?.choices);
                setOptionDocumentIdentityType(result.actions?.POST?.profile?.children?.documentIdentityType?.choices);
                setOptionOtherDocumentType(result.actions?.POST?.profile?.children?.otherDocumentType?.choices);
            }
        });
    },[]);

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
                            value: `${address.province}/${address.city}/${address.district}/${address.subDistrict}/${address.postalCode}`
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

        setSelectedPicAddress(e);
        setValue({...value, province: address[0], city: address[1], district: address[2], subDistrict: address[3], postalCode: address[4]});
    }

    const handleCompanyAddress = (e) => {
        const companyAddress = e.value;
        const address = companyAddress.split("/");

        setSelectedCompanyAddress(e);
        setValueCompany({...valueCompany, companyProvince: address[0], companyCity: address[1], companyDistrict: address[2], companySubDistrict: address[3], companyPostalCode: address[4]});
    }

    const handleUploadFile = event => {
        delete props.error.profile?.documentIdentityFile?.message;
        const file = event.target.files[0];

        fileToBase64(file).then(result => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = function() {
                setDocumentIdentityFile({
                    selectedFile: [reader.result],
                    style: "uploaded-file",
                    documentIdentityFile: result
                });
            };

            setDocumentIdentityFile({
                mainState: "uploaded",
                selectedFile: event.target.files[0],
                imageUploaded: 1,
                style: "uploaded-file",
                documentIdentityFile: result
            });
        });
    };

    const handleUploadOtherFile = event => {
        delete props.error.profile?.otherDocumentFile?.message;
        const file = event.target.files[0];

        fileToBase64(file).then(result => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = function() {
                setOtherDocumentFile({
                    selectedFile: [reader.result],
                    style: "uploaded-file",
                    otherDocumentFile: result
                });
            };

            setOtherDocumentFile({
                mainState: "uploaded",
                selectedFile: event.target.files[0],
                imageUploaded: 1,
                style: "uploaded-file",
                otherDocumentFile: result
            });
        });
    };

    const [textCompanyName] = useState(
        {
            autoComplete: "companyName",
            name: "profile.companyName",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "companyName",
            styleText: "w-80",
            required: true
        }
    )

    const [textWebsite] = useState(
        {
            name: "profile.companySite",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "companySite",
            styleText: "w-80",
        }
    )

    const [textCompanyPhone] = useState(
        {
            typeForm: 'text-field-number',
            name: "profile.companyPhone",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "companyPhone",
            values: valueCompanyPhone.companyPhone,
            onChange: handleCompanyPhone,
            styleText: "w-80",
            max: "14",
            required: true
        }
    )

    const [selectIndustry] = useState(
        {
            name: "profile.companyIndustry",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "companyIndustry",
            styleText: "w-80"
        }
    )

    const [textCompanyAddress] = useState(
        {
            name: "profile.companyAddress",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "companyAddress",
            styleText: "w-80",
            required: true
        }
    )

    const [textCompanyPostalCode] = useState(
        {
            typeForm: 'text-field-number',
            name: "profile.companyPostalCode",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "companyPostalCode",
            styleText: "w-30",
            readonly: true,
            max: "5"
        }
    )

    const [textFirstName] = useState(
        {
            name: "firstName",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "firstName",
            required: true,
            styleText: "text__name-business-partner pr-10",
        }
    )

    const [textLastName] = useState(
        {
            name: "lastName",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "lastName",
            required: true,
            styleText: "text__name-business-partner",
        }
    )

    const [textPosition] = useState(
        {
            name: "profile.position",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "position",
            styleText: "w-80",
        }
    )

    const [textIdentity] = useState(
        {
            typeForm: 'text-field-number',
            name: "profile.identityNumber",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "identityNumber",
            values: valueIdentity.identityNumber,
            onChange: handleIdentityNumber,
            styleText: "w-80",
            max: "16",
            required: true
        }
    )

    const [textBirthdate] = useState(
        {
            typeForm: 'text-field-date',
            name: "birthDate",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "birthDate",
            type: "date",
            now: now,
            styleText: "w-80",
            required: true
        }
    )

    const [textAddress] = useState(
        {
            name: "profile.address",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "address",
            styleText: "w-80",
        }
    )

    const [textPostalCode] = useState(
        {
            typeForm: 'text-field-number',
            name: "profile.postalCode",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "postalCode",
            styleText: "w-30",
            readonly: true,
            max: "5"
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
            values: valueCompanyPhone.phoneNumber,
            onChange: handlePhone,
            styleText: "w-80",
            max: "14"
        }
    )

    const [textEmail] = useState(
        {
            typeForm: 'text-field',
            name: "email",
            reg: register,
            label: 'Email',
            margin: 'normal',
            variant: "outlined",
            id: "email",
            styleText: "w-80",
            required: true
        }
    )

    const [selectDocumentIdentityType] = useState(
        {
            name: "profile.documentIdentityType",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "documentIdentityType",
            styleText: "w-35"
        }
    )

    const [selectOtherDocumentType] = useState(
        {
            name: "profile.otherDocumentType",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "otherDocumentType",
            styleText: "w-35"
        }
    )

    const [checkboxAllow] = useState(
        {
            name: 'allowTermsConditions',
            id: 'allowTermsConditions',
            handleChangeCheckbox: handleChangeCheckbox,
        }
    )

    const [checkboxSubscribe] = useState(
        {
            name: 'allowSubscribe',
            id: 'allowSubscribe',
            handleChangeCheckbox: handleChangeCheckboxSubscribe,
        }
    )

    return(
        <Suspense fallback={null}>
            <form onSubmit={handleSubmit(props.businessPartnerSubmit)} className="mt-20">
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Typography title={t('label.registrationFor')} typographyStyle="tx-l mt-20 fs-20" />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3}>
                        <RadioGroup name="profile.registrationPurpose" value={valueRegistration} onChange={handleChangeRegister}>
                            <FormControlLabel value="professional" control={<Radio />} inputRef={register} label={t('form.professional')} className="tx-l" />
                        </RadioGroup>
                        <FormHelperText className="helper-text"><i>{t('label.professionalDesc')}</i></FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3}>
                        <RadioGroup name="profile.registrationPurpose" value={valueRegistration} onChange={handleChangeRegister}>
                            <FormControlLabel value="company" control={<Radio />} inputRef={register} label={t('form.company')} className="tx-l" />
                        </RadioGroup>
                        <FormHelperText className="helper-text"><i>{t('label.companyDesc')}</i></FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Typography title={t('label.titleData')} typographyStyle="tx-l mt-20 fs-20" />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <FormTextField {...textCompanyName} label={t('form.name')} error={props.error?.profile?.companyName} />
                        <FormTextField {...textWebsite} label={t('form.website')} error={props.error?.profile?.companySite} />
                        <FormTextField {...textCompanyPhone} label={t('form.telephone')} values={valueCompanyPhone.companyPhone} error={props.error?.profile?.companyPhone} />
                        <Typography title={`${t('form.industry')}`} typographyStyle="tx-l mt-20 fs-17" />
                        <SelectAtom {...selectIndustry} data={optionCompanyIndustry} />
                        <FormTextField {...textCompanyAddress} label={t('form.companyAddress')} error={props.error?.profile?.companyAddress} />
                        <Typography title={`${t('form.cityOrDistrict')} *`} typographyStyle="tx-l mt-20 fs-17" />
                        <FormControl variant="outlined" margin="normal" className="text__city-district">
                            <AsyncSelect
                                defaultOptions
                                loadOptions={loadOptionAddress}
                                onChange={(e) => handleCompanyAddress(e)}
                                value={selectedCompanyAddress}
                                placeholder={t('form.cityOrDistrict')}
                            />
                        </FormControl>
                        <Input type="hidden" inputRef={register} name="profile.companyProvince" value={valueCompany.companyProvince} />
                        <Input type="hidden" inputRef={register} name="profile.companyCity" value={valueCompany.companyCity} />
                        <Input type="hidden" inputRef={register} name="profile.companyDistrict" value={valueCompany.companyDistrict} />
                        <Input type="hidden" inputRef={register} name="profile.companySubdistrict" value={valueCompany.companySubDistrict} />
                        <FormTextField {...textCompanyPostalCode} label={t('form.postalCode')} values={valueCompany.companyPostalCode} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <Typography title={t('label.pic')} typographyStyle="tx-l mt-20 fs-20" />
                        <FormTextField {...textFirstName} label={t('form.firstName')} error={props.error?.firstName} />
                        <FormTextField {...textLastName} label={t('form.lastName')} error={props.error?.lastName} />
                        <FormTextField {...textPosition} label={t('form.position')} />
                        <FormTextField {...textIdentity} label={t('form.ktp')} values={valueIdentity.identityNumber} error={props.error?.profile?.identityNumber} />
                        <FormTextField {...textBirthdate} label={t('form.birthdate')} error={props.error?.birthDate} />
                        <Typography title={t('label.gender')} typographyStyle="tx-l mt-20 fs-17" />
                        <RadioGroup row name="profile.gender" value={valueGender} onChange={handleChangeGender}>
                            <FormControlLabel value="male" control={<Radio />} inputRef={register} label={t('form.male')} className="tx-l" />
                            <FormControlLabel value="female" control={<Radio />} inputRef={register} label={t('form.female')} className="tx-l" />
                        </RadioGroup>
                        <FormTextField {...textAddress} label={t('form.picAddressDetail')} />
                        <Typography title={t('form.cityOrDistrict')} typographyStyle="tx-l mt-20 fs-17" />
                        <FormControl variant="outlined" margin="normal" className="text__city-district" required={true}>
                            <AsyncSelect
                                defaultOptions
                                loadOptions={loadOptionAddress}
                                onChange={(e) => handlePICAddress(e)}
                                value={selectedPicAddress}
                                placeholder={t('form.cityOrDistrict')}
                                error={props.error?.phoneNumber}
                            />
                        </FormControl>
                        <Input type="hidden" inputRef={register} name="profile.province" value={value.province} />
                        <Input type="hidden" inputRef={register} name="profile.city" value={value.city} />
                        <Input type="hidden" inputRef={register} name="profile.district" value={value.district} />
                        <Input type="hidden" inputRef={register} name="profile.subdistrict" value={value.subDistrict} />
                        <FormTextField {...textPostalCode} label={t('form.postalCode')} values={value.postalCode} />
                        <FormTextField {...textPhone} label={t('form.picTelephone')} values={valuePhone.phoneNumber} error={props.error?.phoneNumber} />
                        <FormTextField {...textEmail} label="Email" error={props.error?.email} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <Typography title={`${t('form.document')} *`} typographyStyle="tx-l mt-20 fs-17" />
                        <SelectAtom {...selectDocumentIdentityType} data={optionDocumentIdentityType} />
                        <Grid item xs={12} sm={12} lg={12}>
                            <input accept="image/*" id="document-file" className="ds-n" type="file" onChange={handleUploadFile} />
                            <Input type="hidden" name="profile.documentIdentityFile" inputRef={register} value={documentIdentityFile.documentIdentityFile} />
                            <label htmlFor="document-file">
                                <img src={documentIdentityFile.selectedFile} className={props.error?.profile?.documentIdentityFile?.message ? "img-error" : documentIdentityFile.style} alt="img-id" />
                            </label>
                            <FormHelperText className="helper-text-error">{props.error?.profile ? props.error?.profile?.documentIdentityFile?.message : ""}</FormHelperText>
                            <FormHelperText className="helper-text-file"><i>{t('label.format')}</i></FormHelperText>
                        </Grid>
                        <Typography title={`${t('form.otherDocument')} *`} typographyStyle="tx-l mt-20 fs-17" />
                        <SelectAtom {...selectOtherDocumentType} data={optionOtherDocumentType} />
                        <Grid item xs={12} sm={12} lg={12}>
                            <input accept="image/*" id="other-document-file" className="ds-n" type="file" onChange={handleUploadOtherFile} />
                            <Input type="hidden" name="profile.otherDocumentFile" inputRef={register} value={otherDocumentFile.otherDocumentFile} />
                            <label htmlFor="other-document-file">
                                <img src={otherDocumentFile.selectedFile} className={props.error?.profile?.otherDocumentFile?.message ? "img-error" : otherDocumentFile.style} alt="img-id" />
                            </label>
                            <FormHelperText className="helper-text-error">{props.error.profile ? props.error.profile?.otherDocumentFile?.message : ""}</FormHelperText>
                            <FormHelperText className="helper-text-file"><i>{t('label.format')}</i></FormHelperText>
                        </Grid>
                        <Checkbox {...checkboxAllow} label={t('form.termConditions')} />
                        <Checkbox {...checkboxSubscribe} label={t('form.subscribe')} />
                        <div className="mt-20 mb-20">
                            <ButtonRegister variant="contained" color="secondary" name={t('form.register')} type="submit" styleView={enabled ? "w-80 btn__primary" : "w-80"} disabled={!enabled} />
                        </div>
                    </Grid>
                </Grid>
            </form>
        </Suspense>
    );
};

export default React.memo(FormBusinessPartner);