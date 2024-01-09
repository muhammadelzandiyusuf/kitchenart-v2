import {
    React,
    Suspense,
    useForm,
    useState,
    yup,
    useEffect
} from 'libraries';

const FormTextField = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const ButtonLogin = React.lazy(() => import('components/atoms/ButtonAtom'));
const SkeletonAtom = React.lazy(() => import('components/atoms/SkeletonAtom'));

const FormForgotPassword = (props) => {

    const [loading, setLoading] = useState(true);
    const forgotPasswordSchema = yup.object().shape({
        email: yup.string().required()
    });

    const { register, handleSubmit } = useForm({
        validationSchema: forgotPasswordSchema
    });

    const [textEmail] = useState(
        {
            typeForm: 'text-field',
            name: 'email',
            reg: register,
            label: 'Email',
            margin: 'normal',
            id: 'email',
            variant: 'outlined'
        }
    );

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Suspense fallback={null}>
            <form onSubmit={handleSubmit(props.forgotPasswordSubmit)} className="form-login">
                {loading ? (
                    <SkeletonAtom variant={'rect'} height={50} />
                ):(
                    <FormTextField {...textEmail } error={props.error?.email} />
                )}
                <div className="mt-20 ta-c">
                    {loading ? (
                        <SkeletonAtom variant={'rect'} width={'20%'} height={50} styleSkeleton="m-0-auto" />
                    ):(
                        <ButtonLogin variant="contained" name="Submit" type="submit" styleView="btn__primary" />
                    )}
                </div>
            </form>
        </Suspense>
    );
}

export default React.memo(FormForgotPassword);