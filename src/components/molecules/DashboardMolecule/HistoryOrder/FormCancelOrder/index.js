import {
    React,
    Suspense,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    useTranslation,
    IconButton, Close, useForm, FormControl, RadioGroup, FormControlLabel, Radio, TextField, useState
} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const FormCancelOrder = (props) => {

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { register, watch, handleSubmit } = useForm();

    const [maxLengthNotes] = useState(300);
    const notesWatch = watch('notes');

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={props.formCancelOrder}
                onClose={props.handleShowFormCancelOrder}
                aria-labelledby="form-cancel-order"
            >
                <DialogTitle id="form-cancel-order">
                    <div className={'ps-ab top-right'}>
                        <IconButton aria-label="close" onClick={props.handleShowFormCancelOrder}>
                            <Close/>
                        </IconButton>
                    </div>
                    <div className={'fs-28 ta-c tx-c'}>{t('label.cancelConfirmation')}</div>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(props.handleSubmitFormCancel)}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="condition"
                                name="condition"
                                value={props.condition}
                                onChange={props.handleChangeCondition}
                                aria-required={true}
                            >
                                <FormControlLabel
                                    value={t('label.wantToChangeProducts')}
                                    control={<Radio />}
                                    label={t('label.wantToChangeProducts')}
                                    className={'fs-16 tx-c'}
                                    inputRef={register}
                                />
                                <FormControlLabel
                                    value={t('label.theBookingProcessIsTooLong')}
                                    control={<Radio />}
                                    label={t('label.theBookingProcessIsTooLong')}
                                    className={'fs-16 tx-c'}
                                    inputRef={register}
                                />
                                <FormControlLabel
                                    value={t('label.deliveryIssues')}
                                    control={<Radio />}
                                    label={t('label.deliveryIssues')}
                                    className={'fs-16 tx-c'}
                                    inputRef={register}
                                />
                                <FormControlLabel
                                    value={t('form.others')}
                                    control={<Radio />}
                                    label={t('form.others')}
                                    className={'fs-16 tx-c'}
                                    inputRef={register}
                                />
                            </RadioGroup>
                        </FormControl>
                        <div className={'mt-32'}>
                            <div className={'fs-16 tx-c mb-8'}>
                                {t('message.tellUsWhyYouWouldLikeToCanncel')}
                            </div>
                            <TextField
                                id={"notes"}
                                name={"notes"}
                                multiline
                                variant="outlined"
                                rows={6}
                                inputRef={register}
                                inputProps={{
                                    maxLength: maxLengthNotes
                                }}
                                className={'w-100 fs-16'}
                                required={true}
                            />
                            <div className={'fs-14 tx-c ta-r mt-8'}>
                                {notesWatch !== undefined ? notesWatch.length : 0}/{maxLengthNotes}
                            </div>
                        </div>
                        <div className={'p-24 ta-c'}>
                            <ButtonAtom
                                styleView={'btn__default text-transf-cap fs-18 w-30 mr-8'}
                                name={t('label.cancel')}
                                clicked={props.handleShowFormCancelOrder}
                            />
                            {props.buttonLoading ? (
                                <ButtonAtom
                                    type={'button-loading'}
                                    styleView={'btn__primary text-transf-cap fs-18 w-30'}
                                    styleImage={'w-23'}
                                />
                            ):(
                                <ButtonAtom
                                    styleView={'btn__primary text-transf-cap fs-18 w-30'}
                                    name={t('label.confirm')}
                                    typeButton={'submit'}
                                    type={'button-text'}
                                />
                            )}
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default FormCancelOrder;