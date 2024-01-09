import {
    Close, Dialog,
    Grid,
    DialogContent,
    DialogTitle,
    IconButton,
    React,
    Suspense, useForm,
    useMediaQuery,
    useTheme,
    useTranslation, TextField, useState, PlusImage, FormControlLabel, Radio, RadioGroup, Input
} from "libraries";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const OrderComplaint = (props) => {
    const { openOrderComplaint, handleCloseOrderComplaint, handleUploadImage, photoComplaint, handleSubmitComplaint,
        buttonLoading, href } = props;
    const theme = useTheme();
    const t = useTranslation();
    const { register, watch, handleSubmit } = useForm();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [maxLengthNotes] = useState(300);
    const notesWatch = watch("content");
    const [valueGender, setValueGender] = useState('male');

    const handleChangeGender = (event) => {
        setValueGender(event.target.value);
    };

    return(
        <Dialog
            fullScreen={fullScreen}
            open={openOrderComplaint}
            onClose={handleCloseOrderComplaint}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={'ps-ab top-right'}>
                <IconButton aria-label="close" onClick={handleCloseOrderComplaint}>
                    <Close/>
                </IconButton>
            </div>
            <DialogTitle id="responsive-dialog-title" className={'c-black fw-b ta-c'}>
                <div>{t('label.complaint')}</div>
            </DialogTitle>
            <DialogContent>
                <Suspense fallback={null}>
                    <p>{t('label.questionComplaint')}</p>
                    <form onSubmit={handleSubmit(handleSubmitComplaint)}>
                        <Grid container spacing={0} direction="row">
                            <Input type="hidden" value={href} name="orderItem.href" inputRef={register} />
                            <Input type="hidden" value="pending" name="status" inputRef={register} />
                            <RadioGroup row name="problem" value={valueGender} onChange={handleChangeGender}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel value={t('form.productNotComplete')} control={<Radio />}
                                                      inputRef={register} className="tx-l"
                                                      label={t('form.productNotComplete')} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel value={t('form.productNotWorking')} control={<Radio />}
                                                      inputRef={register} className="tx-l"
                                                      label={t('form.productNotWorking')} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel value={t('form.defectiveProduct')} control={<Radio />}
                                                      inputRef={register} className="tx-l"
                                                      label={t('form.defectiveProduct')} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel value={t('form.others')} control={<Radio />}
                                                      inputRef={register} className="tx-l"
                                                      label={t('form.others')} />
                                </Grid>
                            </RadioGroup>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={"mb-10 mt-30"}>{t('label.describeProblem')}</div>
                                <TextField
                                    id={"reason"}
                                    name={"reason"}
                                    multiline
                                    variant="outlined"
                                    rowsMax={4}
                                    inputRef={register}
                                    inputProps={{
                                        maxLength: maxLengthNotes
                                    }}
                                    className={'w-100 fs-14'}
                                />
                                <div className={'fs-11 tx-c ta-r mt-16'}>
                                    {notesWatch !== undefined ? notesWatch.length : 0}/{maxLengthNotes}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                {t('label.evidence')}
                                <p>{t('label.evidenceNote')}</p>
                                <Grid container spacing={2}>
                                    {photoComplaint?.length > 0 &&
                                        photoComplaint.map((item, index) => (
                                            <Grid item xs={12} sm={12} md={12} lg={2} key={index}>
                                                <div className={'border-radius-5px'}>
                                                    <img src={item.image} className={`w-100`} alt="img-id" />
                                                </div>
                                            </Grid>
                                        ))
                                    }
                                    <Grid item xs={12} sm={12} md={12} lg={2}>
                                        <label htmlFor="review-photos">
                                            <div className={'p-16 border-cicle border-radius-5px'}>
                                                <img src={PlusImage} className={`pointer w-100`} alt="img-id" />
                                            </div>
                                        </label>
                                        <input accept="image/*" id="review-photos" className="ds-n" type="file"
                                               onChange={handleUploadImage} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className={'ta-r'}>
                            <ButtonAtom variant="contained" color="secondary"
                                        styleView={'btn__default text-transf-cap'}
                                        name={t('label.cancel')}
                                        // clicked={handleCancelReview}
                            />
                            {' '}
                            {buttonLoading ? (
                                <ButtonAtom
                                    type={'button-loading'}
                                    styleView={'w-10 text-transf-cap fw-b tc-white bgc-primary'}
                                    styleImage={'w-40'}
                                />
                            ) : (
                                <ButtonAtom
                                    variant="contained"
                                    type="submit"
                                    styleView={'btn__primary text-transf-cap'}
                                    name={t('label.send')}
                                />
                            )}
                        </div>
                    </form>
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}

export default OrderComplaint;