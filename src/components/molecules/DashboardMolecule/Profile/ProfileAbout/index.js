import {React, Suspense, useForm, useTranslation, DatePicker, MuiPickersUtilsProvider, DateFnsUtils, Grid} from 'libraries';
import {convertDate} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const RadioButtonAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/RadioButtonAtom'));
const TextFieldAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));

const ProfileAbout = (props) => {

    const {formName, customer, handleShowFormName, handleChangeName, handleShowFormDate, dateBirth, setDateBirth,
        handleDateChange, handleChangeGender, gender, formDate} = props;
    const t = useTranslation();

    const {register, handleSubmit} = useForm();

    return (
        <Suspense fallback={null}>
            <div className={'p-24'}>
                <div className={'pt-16 pb-16 border-bottom'}>
                    {!formName ? (
                        <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                                <div className={'fs-20 fw-400 mb-16'}>{t('form.name')}</div>
                                <div className={'fs-18'}>{customer?.firstName} {customer?.lastName}</div>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <ButtonAtom
                                    type={'button-text'}
                                    styleView={'text-transf-cap fs-16 btn__default w-70 border-radius-10px'}
                                    name={`${t('label.change')} ${t('form.name')}`}
                                    clicked={handleShowFormName}
                                />
                            </Grid>
                        </Grid>
                    ):(
                        <form onSubmit={handleSubmit(handleChangeName)}>
                            <div className={'fs-20 fw-400 mb-16'}>{t('form.name')}</div>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextFieldAtom
                                        typeForm={'text-field'}
                                        name={'firstName'}
                                        id={'firstName'}
                                        variant={'outlined'}
                                        required={true}
                                        label={t('form.firstName')}
                                        placeholder={`${t('form.add')} ${t('form.firstName')}`}
                                        defaultValue={`${customer?.firstName}`}
                                        reg={register}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextFieldAtom
                                        typeForm={'text-field'}
                                        name={'lastName'}
                                        id={'lastName'}
                                        variant={'outlined'}
                                        label={t('form.lastName')}
                                        placeholder={`${t('form.add')} ${t('form.lastName')}`}
                                        defaultValue={`${customer?.lastName}`}
                                        reg={register}
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
                <div className={'pt-16 pb-16 border-bottom'}>
                    {!formDate ? (
                        <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                                <div className={'fs-20 fw-400 mb-16'}>{t('form.birthdate')}</div>
                                <div className={'fs-18'}>{convertDate(customer?.birthDate, 'DD MMMM YYYY')}</div>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5}>
                                <ButtonAtom
                                    type={'button-text'}
                                    styleView={'text-transf-cap fs-16 btn__default w-70 border-radius-10px'}
                                    name={`${t('label.change')} ${t('form.birthdate')}`}
                                    clicked={handleShowFormDate}
                                />
                            </Grid>
                        </Grid>
                    ):(
                        <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={'fs-20 fw-400 mb-16'}>{t('form.birthdate')}</div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={'ta-c'}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            autoOk
                                            orientation="landscape"
                                            variant="static"
                                            openTo="date"
                                            value={dateBirth}
                                            onChange={setDateBirth}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className={'ta-c mt-16'}>
                                    <ButtonAtom
                                        typeButton={'button'}
                                        type={'button-text'}
                                        styleView={'text-transf-cap fs-16 btn__primary w-50 border-radius-10px'}
                                        name={`Submit`}
                                        clicked={handleDateChange}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </div>
                <div className={'pt-16 pb-16'}>
                    <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'fs-20 fw-400 mb-16'}>{t('label.gender')}</div>
                            <RadioButtonAtom
                                id={'male'}
                                name={'male'}
                                label={t('form.male')}
                                value={'male'}
                                checked={gender === 'male' ? true : false}
                                handleChangeRadio={handleChangeGender}
                            />
                            <RadioButtonAtom
                                id={'female'}
                                name={'female'}
                                label={t('form.female')}
                                value={'female'}
                                checked={gender === 'female' ? true : false}
                                handleChangeRadio={handleChangeGender}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Suspense>
    );
};

export default ProfileAbout;