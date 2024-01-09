import {React, useForm, useState, yup, faEnvelope, faLock, faEyeSlash, faEye, Link, Suspense, useTranslation, useEffect} from 'libraries';

const FormTextField = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const ButtonLogin = React.lazy(() => import('components/atoms/ButtonAtom'));
const SkeletonAtom = React.lazy(() => import('components/atoms/SkeletonAtom'));

const FormLogin = (props) => {

    const t = useTranslation();
    const [values, setValues] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClickShowPassword = () => {
        setValues(!values);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginSchema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required()
    });

    const { register, handleSubmit } = useForm({
        validationSchema: loginSchema
    });

    const [textEmail] = useState(
        {
            typeForm: 'text-field-start-adornment',
            name: 'email',
            reg: register,
            margin: 'normal',
            id: 'email',
            variant: 'outlined',
            icon: faEnvelope
        }
    )

    const [textPassword] = useState(
        {
            typeForm: 'text-field-start-end-adornment',
            name: 'password',
            reg: register,
            margin: 'normal',
            id: 'password',
            variant: 'outlined',
            icon: faLock,
            iconStart: faEye,
            iconEnd: faEyeSlash
        }
    )

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Suspense fallback={null}>
            <form onSubmit={handleSubmit(props.loginSubmit)} className="form-login">
                {loading ? (
                    <SkeletonAtom variant={'text'} height={80} />
                ):(
                    <FormTextField {...textEmail } label={'Email/'+ t('form.phoneNumber')} error={props.error?.email} />
                )}
                {loading ? (
                    <SkeletonAtom variant={'text'} height={80} />
                ):(
                    <FormTextField {...textPassword} label={t('form.password')} values={values} error={props.error?.password} showPassword={handleClickShowPassword} mouseDownPassword={handleMouseDownPassword} />
                )}
                {loading ? (
                    <SkeletonAtom variant={'text'} width={'40%'} height={30} />
                ):(
                    <Link to="/forgot-password" className="td-n tx-c ft-i fs-15">{t('label.forgotPassword') + '?'}</Link>
                )}
                <div className="mt-20">
                    {loading ? (
                        <SkeletonAtom variant={'text'} height={80} />
                    ):(
                        props.buttonLoading ? (
                            <ButtonLogin variant="contained" type="button-loading" styleView="w-100 btn__primary"
                                         styleImage={'w-6'} />
                        ):(
                            <ButtonLogin variant="contained" name="Login" type="button-text" typeButton={'submit'}
                                         styleView="w-100 btn__primary" />
                        )
                    )}
                </div>
            </form>
        </Suspense>
    );
}

export default React.memo(FormLogin);