import {React, useForm, useState, moment, yup, faEye, faEyeSlash, useTranslation, Suspense, useEffect} from "libraries";

import 'assets/scss/form/form.scss';

const FormTextField = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const ButtonRegister = React.lazy(() => import('components/atoms/ButtonAtom'));
const Checkbox = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const SkeletonAtom = React.lazy(() => import('components/atoms/SkeletonAtom'));
const TooltipAtom = React.lazy(() => import('components/atoms/TooltipAtom'));

const FormRegister = (props) => {
    const t = useTranslation();

    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const [valueConfirm, setValueConfirm] = useState({
        passwordConfirm: '',
        showConfirmPassword: false,
    });

    const [valuePhone, setValuePhone] = useState({
        phoneNumber: '',
    });

    const [valueCheck, setValueCheck] = useState({
            allowTermsConditions: '',
    });

    const [valueCheckSubscribe, setValueCheckSubscribe] = useState({
            allowSubscribe: '',
    });

    const handlePhone = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setValuePhone({...valuePhone, phoneNumber: value})
    };

    const handleChangeCheckbox = (event) => {
        setValueCheck({...valueCheck, allowTermsConditions: event.target.checked});
    };

    const handleChangeCheckboxSubscribe = (event) => {
        setValueCheckSubscribe({...valueCheckSubscribe, allowSubscribe: event.target.checked});
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setValueConfirm({ ...valueConfirm, showConfirmPassword: !valueConfirm.showConfirmPassword });
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const registerSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required(),
        phoneNumber: yup.string().required(),
        birthDate: yup.string().required(),
        password: yup.string().required(),
        passwordConfirm: yup.string().required(),
    });

    const {register, handleSubmit} = useForm({
        validationSchema: registerSchema
    });

    const now = moment().format("YYYY-MM-DD");
    const enabled = valueCheck.allowTermsConditions && valueCheckSubscribe.allowSubscribe;

    const [textFirstName] = useState(
        {
            autoComplete: "firstName",
            name: "firstName",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "firstName",
            required: true,
            styleText: "text__name pr-9",
        }
    )

    const [textLastName] = useState(
        {
            autoComplete: "lastName",
            name: "lastName",
            reg: register,
            margin: 'normal',
            variant: "outlined",
            id: "lastName",
            required: true,
            styleText: "text__name",
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
            onChange: handlePhone,
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
            required: true
        }
    )

    const [textPassword] = useState(
        {
            typeForm: 'text-field-end-adornment',
            name: 'password',
            reg: register,
            margin: 'normal',
            variant: 'outlined',
            id: 'password',
            handleClickShowPassword: handleClickShowPassword,
            handleMouseDownPassword: handleMouseDownPassword,
            iconStart: faEye,
            iconEnd: faEyeSlash,
            type: values.showPassword ? 'text' : 'password',
            values: values.showPassword,
            required: true
        }
    )

    const [textConfirmPassword] = useState(
        {
            typeForm: 'text-field-end-adornment',
            name: 'passwordConfirm',
            reg: register,
            margin: 'normal',
            variant: 'outlined',
            id: 'passwordConfirm',
            handleClickShowPassword: handleClickShowConfirmPassword,
            handleMouseDownPassword: handleMouseDownConfirmPassword,
            iconStart: faEye,
            iconEnd: faEyeSlash,
            type: valueConfirm.showConfirmPassword ? 'text' : 'password',
            values: valueConfirm.showConfirmPassword,
            required: true
        }
    )

    const [checkboxAllow] = useState(
        {
            name: 'allowTermsConditions',
            reg: register,
            id: 'allowTermsConditions',
            handleChangeCheckbox: handleChangeCheckbox,
        }
    )

    const [checkboxSubscribe] = useState(
        {
            name: 'allowSubscribe',
            reg: register,
            id: 'allowSubscribe',
            handleChangeCheckbox: handleChangeCheckboxSubscribe,
        }
    )

    useEffect(() => {
       setLoading(false);
    }, []);

    return (
        <Suspense fallback={null}>
            <form onSubmit={handleSubmit(props.registerSubmit)} className="form-register">
                {loading ? <SkeletonAtom variant={'text'} height={80} /> : <FormTextField {...textFirstName} error={props.error?.name} label={t('form.firstName')} />}
                {loading ? <SkeletonAtom variant={'text'} height={80} /> : <FormTextField {...textLastName} error={props.error?.name} label={t('form.lastName')} />}
                {loading ? <SkeletonAtom variant={'text'} height={80} /> : <FormTextField {...textEmail} error={props.error?.email} />}
                {loading ? <SkeletonAtom variant={'text'} height={80} /> : <FormTextField {...textPhone} values={valuePhone.phoneNumber} error={props.error?.phoneNumber} label={t('form.phoneNumber')}/>}
                {loading ? <SkeletonAtom variant={'text'} height={80} /> : <FormTextField {...textBirthdate} error={props.error?.birthDate} label={t('form.birthdate')} />}
                <TooltipAtom />
                {loading ? <SkeletonAtom variant={'text'} height={80} /> : <FormTextField {...textPassword} values={values.showPassword} error={props.error?.password} label={t('form.password')} showPassword={handleClickShowPassword} mouseDownPassword={handleMouseDownPassword} styleText="mt-0" />}
                {loading ? <SkeletonAtom variant={'text'} height={80} /> : <FormTextField {...textConfirmPassword} values={valueConfirm.showConfirmPassword} error={props.error?.passwordConfirm} label={t('form.confirmPassword')} showPassword={handleClickShowConfirmPassword} mouseDownPassword={handleMouseDownConfirmPassword} />}
                {loading ? <SkeletonAtom variant={'text'} height={50} /> : <Checkbox {...checkboxAllow} label={t('form.termConditions')} />}
                {loading ? <SkeletonAtom variant={'text'} height={50} /> : <Checkbox {...checkboxSubscribe} label={t('form.subscribe')} />}
                <div className="mt-20">
                    {loading ? <SkeletonAtom variant={'text'} height={70} /> : <ButtonRegister variant="contained" name={t('form.register')} type="submit" styleView={enabled ? "w-100 btn__primary" : "w-100"} disabled={!enabled}/>}
                </div>
            </form>
        </Suspense>
    );
}

export default React.memo(FormRegister);