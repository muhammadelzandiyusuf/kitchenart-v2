import {
    React,
    Suspense,
    Grid,
    useTranslation,
    useForm,
    NumberFormat,
    FormControlLabel,
    Checkbox,
    PropTypes
} from 'libraries';

const TextFieldAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

function NumberFormatAmount(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix={'Rp'}
            decimalScale={0}
        />
    );
};

NumberFormatAmount.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function NumberFormatAccountNumber(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            decimalScale={0}
        />
    );
};

NumberFormatAccountNumber.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const CommissionWithdrawForm = (props) => {

    const t = useTranslation();
    const {register, handleSubmit} = useForm();

    return (
        <Suspense fallback={null}>
            <div className={'p-24 fs-18 fw-400 border-bottom'}>{t('label.withdrawFunds')}</div>
            <div className={'p-24'}>
                <div className={'fs-18 fw-400 mb-24'}>{t('label.withdrawBalance')}</div>
                {props.completeBank ? (
                    <Grid container spacing={0}>
                        <Grid item xs={4} sm={4} md={2} lg={2}>
                            <div className={'fs-16 tx-c'}>{props.bank}</div>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <div className={'fs-16 tx-c'}>{props.accountNumber}</div>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <span className={'fs-16 tc-p pointer'} onClick={props.handleUpdateBank}>
                                {t('label.update')}
                            </span>
                        </Grid>
                    </Grid>
                ):(
                    <form onSubmit={handleSubmit(props.handleAddForm)}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={4} lg={4}>
                                <TextFieldAtom
                                    typeForm={'text-field'}
                                    id={'bank'}
                                    name={'bank'}
                                    label={t('label.nameBank')}
                                    variant={'outlined'}
                                    reg={register}
                                    size={'small'}
                                    required={true}
                                    onChange={props.handleAmount}
                                    values={props.bank}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={4}>
                                <TextFieldAtom
                                    typeForm={'text-field-mask'}
                                    id={'accountNumber'}
                                    name={'accountNumber'}
                                    label={t('label.accountNumber')}
                                    variant={'outlined'}
                                    reg={register}
                                    size={'small'}
                                    required={true}
                                    onChange={props.handleAmount}
                                    values={props.accountNumber}
                                    inputComponent={NumberFormatAccountNumber}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} lg={4}>
                                <ButtonAtom
                                    type={'button-text'}
                                    typeButton={'submit'}
                                    styleView={'border-radius-10px btn__primary text-transf-cap w-50'}
                                    name={t('label.finish')}
                                />
                            </Grid>
                        </Grid>
                    </form>
                )}
                <form className={'mt-32'} onSubmit={handleSubmit(props.handleConfirm)}>
                    {props.balance ? (
                        <div className={'fs-24 fw-b'}>
                            <NumberFormat value={props.commission?.balance} displayType={'text'} thousandSeparator={true}
                                          prefix={'Rp'} decimalScale={0} />
                        </div>
                    ):(
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextFieldAtom
                                    typeForm={'text-field-mask'}
                                    id={'amount'}
                                    name={'amount'}
                                    label={t('label.amount')}
                                    variant={'outlined'}
                                    reg={register}
                                    size={'small'}
                                    required={true}
                                    styleText={'fs-24 fw-b'}
                                    values={props.amount}
                                    inputComponent={NumberFormatAmount}
                                    onChange={props.handleAmount}
                                />
                            </Grid>
                        </Grid>
                    )}
                    <div className={'mb-16 fs-18 tx-c mt-8'}>
                        <FormControlLabel
                            control={<Checkbox name="balance" />}
                            label={t('label.withdrawAllBalances')}
                            name={'balance'}
                            id={'balance'}
                            onChange={props.handleUseAllBalance}
                        />
                        (<NumberFormat value={props.commission?.balance} displayType={'text'} thousandSeparator={true}
                                        prefix={'Rp'} decimalScale={0} />)
                    </div>
                    <ButtonAtom
                        type={'button-text'}
                        typeButton={'submit'}
                        styleView={`border-radius-10px fs-18 text-transf-cap w-30 
                        ${props.completeBank && props.amount !== null && props.amount !== '' ? 'btn__primary' : 'product__detail__button--stock'}`}
                        name={t('label.confirm')}
                        disabled={props.completeBank && props.amount !== null && props.amount !== '' ? false : true}
                    />
                </form>
            </div>
        </Suspense>
    );
};

export default CommissionWithdrawForm;