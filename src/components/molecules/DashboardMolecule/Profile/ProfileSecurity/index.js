import {
    React,
    Suspense,
    Grid,
    useTranslation,
    useForm,
    faEyeSlash,
    useState,
    faEye
} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const TextFieldAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));

const ProfileSecurity = (props) => {

    const {customer, handleShowFormPassword, formPassword, handleChangePassword, formPhoneNumber,
        handleShowFormPhoneNumber, handleChangePhoneNumber, error, handleSettingPassword} = props;

    const t = useTranslation();
    const {register, handleSubmit} = useForm();
    const [valueOldPassword, setValueOldPassword] = useState(false);
    const [valueNewPassword, setValueNewPassword] = useState(false);
    const [valueConfirmPassword, setValueConfirmPassword] = useState(false);
    const [valuePhone, setValuePhone] = useState({
        phoneNumber: '',
    });

    const handlePhone = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setValuePhone({...valuePhone, phoneNumber: value})
    };

    const handleClickShowOldPassword = () => {
        setValueOldPassword(!valueOldPassword);
    };

    const handleMouseDownOldPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowNewPassword = () => {
        setValueNewPassword(!valueNewPassword);
    };

    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setValueConfirmPassword(!valueConfirmPassword);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Suspense fallback={null}>
            <div className={'p-24'}>
                <div className={'pt-16 pb-16 border-bottom'}>
                    <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <div className={'fs-20 fw-400 mb-16'}>{t('form.emailAddress')}</div>
                            <div className={'fs-18'}>{customer?.email}</div>
                        </Grid>
                    </Grid>
                </div>
                <div className={'pt-16 pb-16 border-bottom'}>
                    {!formPassword ? (
                        <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                                <div className={'fs-20 fw-400 mb-16'}>{t('form.password')}</div>
                                <div className={'fs-18'}>*********</div>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <ButtonAtom
                                    type={'button-text'}
                                    styleView={'text-transf-cap fs-16 btn__default w-70 border-radius-10px'}
                                    name={`${customer?.hasUsablePassword ? 
                                        t('label.change') : t('label.setting')} ${t('form.password')}`}
                                    clicked={handleShowFormPassword}
                                />
                            </Grid>
                        </Grid>
                    ):(
                        <>
                            {customer?.hasUsablePassword ? (
                                <form onSubmit={handleSubmit(handleChangePassword)}>
                                    <div className={'fs-20 fw-400 mb-16'}>{t('form.password')}</div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={7} lg={7}>
                                            <div className={'mb-16'}>
                                                <TextFieldAtom
                                                    typeForm={'text-field-end-adornment'}
                                                    name={'oldPassword'}
                                                    id={'oldPassword'}
                                                    variant={'outlined'}
                                                    required={true}
                                                    label={t('form.oldPassword')}
                                                    placeholder={`${t('form.oldPassword')}`}
                                                    reg={register}
                                                    iconStart={faEye}
                                                    iconEnd={faEyeSlash}
                                                    values={valueOldPassword}
                                                    error={error?.oldPassword}
                                                    showPassword={handleClickShowOldPassword}
                                                    mouseDownPassword={handleMouseDownOldPassword}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={7} lg={7}>
                                            <div className={'mb-16'}>
                                                <TextFieldAtom
                                                    typeForm={'text-field-end-adornment'}
                                                    name={'newPassword'}
                                                    id={'newPassword'}
                                                    variant={'outlined'}
                                                    required={true}
                                                    label={t('form.newPassword')}
                                                    placeholder={`${t('form.newPassword')}`}
                                                    reg={register}
                                                    iconStart={faEye}
                                                    iconEnd={faEyeSlash}
                                                    values={valueNewPassword}
                                                    error={error?.password}
                                                    showPassword={handleClickShowNewPassword}
                                                    mouseDownPassword={handleMouseDownNewPassword}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={7} lg={7}>
                                            <TextFieldAtom
                                                typeForm={'text-field-end-adornment'}
                                                name={'confirmPassword'}
                                                id={'confirmPassword'}
                                                variant={'outlined'}
                                                label={t('form.confirmPassword')}
                                                placeholder={`${t('form.confirmPassword')}`}
                                                reg={register}
                                                required={true}
                                                iconStart={faEye}
                                                iconEnd={faEyeSlash}
                                                values={valueConfirmPassword}
                                                error={error?.passwordConfirm}
                                                showPassword={handleClickShowConfirmPassword}
                                                mouseDownPassword={handleMouseDownConfirmPassword}
                                            />
                                            <div className={'ta-r mt-16'}>
                                                <ButtonAtom
                                                    typeButton={'submit'}
                                                    type={'button-text'}
                                                    styleView={'text-transf-cap fs-16 btn__primary w-50 border-radius-10px'}
                                                    name={`Submit`}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>
                            ):(
                                <form onSubmit={handleSubmit(handleSettingPassword)}>
                                    <div className={'fs-20 fw-400 mb-16'}>{t('form.password')}</div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={7} lg={7}>
                                            <div className={'mb-16'}>
                                                <TextFieldAtom
                                                    typeForm={'text-field-end-adornment'}
                                                    name={'newPassword'}
                                                    id={'newPassword'}
                                                    variant={'outlined'}
                                                    required={true}
                                                    label={t('form.newPassword')}
                                                    placeholder={`${t('form.newPassword')}`}
                                                    reg={register}
                                                    iconStart={faEye}
                                                    iconEnd={faEyeSlash}
                                                    values={valueNewPassword}
                                                    error={error?.password}
                                                    showPassword={handleClickShowNewPassword}
                                                    mouseDownPassword={handleMouseDownNewPassword}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={7} lg={7}>
                                            <TextFieldAtom
                                                typeForm={'text-field-end-adornment'}
                                                name={'confirmPassword'}
                                                id={'confirmPassword'}
                                                variant={'outlined'}
                                                label={t('form.confirmPassword')}
                                                placeholder={`${t('form.confirmPassword')}`}
                                                reg={register}
                                                required={true}
                                                iconStart={faEye}
                                                iconEnd={faEyeSlash}
                                                values={valueConfirmPassword}
                                                error={error?.passwordConfirm}
                                                showPassword={handleClickShowConfirmPassword}
                                                mouseDownPassword={handleMouseDownConfirmPassword}
                                            />
                                            <div className={'ta-r mt-16'}>
                                                <ButtonAtom
                                                    typeButton={'submit'}
                                                    type={'button-text'}
                                                    styleView={'text-transf-cap fs-16 btn__primary w-50 border-radius-10px'}
                                                    name={`Submit`}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </>
                    )}
                </div>
                <div className={'pt-16 pb-16'}>
                    {!formPhoneNumber ? (
                        <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                                <div className={'fs-20 fw-400 mb-16'}>{t('form.phoneNumber')}</div>
                                <div className={'fs-18'}>{customer?.phoneNumber}</div>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <ButtonAtom
                                    type={'button-text'}
                                    styleView={'text-transf-cap fs-16 btn__default w-70 border-radius-10px'}
                                    name={`${customer?.phoneNumber !== null && customer?.phoneNumber !== '' ? 
                                        t('label.change') : t('form.add')} ${t('form.phoneNumber')}`}
                                    clicked={handleShowFormPhoneNumber}
                                />
                            </Grid>
                        </Grid>
                    ):(
                        <form onSubmit={handleSubmit(handleChangePhoneNumber)}>
                            <div className={'fs-20 fw-400 mb-16'}>{t('form.phoneNumber')}</div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={7} lg={7}>
                                    <TextFieldAtom
                                        typeForm={'text-field-number'}
                                        name={'phoneNumber'}
                                        id={'phoneNumber'}
                                        variant={'outlined'}
                                        label={t('form.phoneNumber')}
                                        placeholder={`${t('form.add')} ${t('form.phoneNumber')}`}
                                        values={valuePhone.phoneNumber}
                                        reg={register}
                                        required={true}
                                        onChange={handlePhone}
                                    />
                                    <div className={'ta-r mt-16'}>
                                        <ButtonAtom
                                            typeButton={'submit'}
                                            type={'button-text'}
                                            styleView={'text-transf-cap fs-16 btn__primary w-50 border-radius-10px'}
                                            name={`Submit`}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </div>
            </div>
        </Suspense>
    );
};

export default ProfileSecurity;