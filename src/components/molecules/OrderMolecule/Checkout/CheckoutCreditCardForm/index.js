import {React, Suspense, useForm, Grid, useTranslation, createAutoCorrectedDatePipe, PropTypes, MaskedInput} from 'libraries';
import {convertDate} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const TextFieldAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));

const year = convertDate(new Date(), 'yyyy');
const autoCorrectedDatePipeMonth = createAutoCorrectedDatePipe("mm", {
    minMonth: 1,
    maxMonth: 12
});
const autoCorrectedDatePipeYear = createAutoCorrectedDatePipe("yyyy", {
    minYear: year,
    maxYear: 3000
});

function TextMaskCardNumber (props) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[0-9]/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            guide
            keepCharPositions
        />
    );
};

function TextMaskMonth (props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/]}
            placeholderChar={"\u2000"}
            pipe={autoCorrectedDatePipeMonth}
            guide
            keepCharPositions
        />
    );
}

function TextMaskYear (props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/, /\d/]}
            placeholderChar={"\u2000"}
            pipe={autoCorrectedDatePipeYear}
            guide
            keepCharPositions
        />
    );
}

TextMaskMonth.propTypes = {
    inputRef: PropTypes.func.isRequired
};

TextMaskYear.propTypes = {
    inputRef: PropTypes.func.isRequired
};

TextMaskCardNumber.propTypes = {
    inputRef: PropTypes.func.isRequired
};

const CheckoutCreditCardForm = (props) => {

    const {handleSubmitForm, buttonLoading} = props;
    const t = useTranslation();
    const {register, handleSubmit} = useForm();

    return (
        <Suspense fallback={null}>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className={'mb-64'}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'mb-16'}>
                                <TextFieldAtom
                                    id={'cardName'}
                                    name={'cardName'}
                                    reg={register}
                                    label={t('form.cardholdersName')}
                                    typeForm={'text-field'}
                                    variant={'outlined'}
                                    required={true}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'mb-16'}>
                                <TextFieldAtom
                                    id={'cardNumber'}
                                    name={'cardNumber'}
                                    reg={register}
                                    label={t('form.cardNumber')}

                                    variant={'outlined'}
                                    required={true}
                                    placeholder={`${t('form.example')} : 0011222233336666`}
                                    inputComponent={TextMaskCardNumber}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <div className={'mb-16'}>
                                <div className={'fs-18 fw-400 mb-16'}>{t('form.expirationDate')}*</div>
                                <TextFieldAtom
                                    id={'month'}
                                    name={'month'}
                                    reg={register}
                                    label={t('form.month')}
                                    typeForm={'text-field-mask'}
                                    variant={'outlined'}
                                    required={true}
                                    placeholder={`06`}
                                    inputComponent={TextMaskMonth}
                                    min={1}
                                    max={12}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <div className={'mt-40'}>
                                <TextFieldAtom
                                    id={'year'}
                                    name={'year'}
                                    reg={register}
                                    label={t('form.year')}
                                    typeForm={'text-field-mask'}
                                    variant={'outlined'}
                                    required={true}
                                    placeholder={`2021`}
                                    inputComponent={TextMaskYear}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <div className={'fs-18 fw-400 mb-16'}>CVV*</div>
                            <TextFieldAtom
                                id={'cvv'}
                                name={'cvv'}
                                reg={register}
                                label={'CVV'}
                                typeForm={'text-field'}
                                type={'password'}
                                variant={'outlined'}
                                required={true}
                                placeholder={`${t('form.example')} : 123`}
                                maxLength={3}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={'mb-32'}>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            {buttonLoading ? (
                                <ButtonAtom
                                    type={'button-loading'}
                                    styleView={'btn__primary border-none border-radius-10px w-100'}
                                    styleImage={'w-11'}
                                />
                            ):(
                                <ButtonAtom
                                    type={'button-text'}
                                    name={t('label.pay')}
                                    styleView={'btn__primary text-transf-cap border-none border-radius-10px fs-16 fw-b w-100'}
                                    typeButton={'submit'}
                                />
                            )}
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Suspense>
    );
};

export default CheckoutCreditCardForm;