import {
    EmptyProduct,
    Grid,
    Input,
    PlusImage,
    React, Skeleton,
    Suspense,
    TextField,
    useForm,
    useState,
    useTranslation
} from "libraries";
import {convertDate} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const RateAtom = React.lazy(() => import('components/atoms/RateAtom'));

const ProductReview = (props) => {
    const { historyOrder, handleUploadImage, photoReview, handleSubmitReview, handleCancelReview, buttonLoading,
        loading } = props;

    const t = useTranslation();
    const created = convertDate(historyOrder?.created, 'DD MMM yyyy kk:mm:ss');
    const finished = convertDate(historyOrder?.finished, 'DD MMM yyyy kk:mm:ss');

    const { register, watch, handleSubmit } = useForm();

    const [maxLengthNotes] = useState(300);
    const notesWatch = watch("content");
    const [rating, setRating] = useState('');

    return(
        <Suspense fallback={null}>
            <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                <Grid container spacing={0}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40} />
                            :
                            <div>
                                {created}
                            </div>
                        }
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40} />
                            :
                            <div>
                                {t('label.orderNumber')}: {historyOrder.orderItemNumber}
                            </div>
                        }
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <div className={'ta-c'}>
                            {loading ?
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                                :
                                <div>
                                    {t('label.finished')} : {finished}
                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={'p-16 fs-16 tx-c'}>
                <form onSubmit={handleSubmit(handleSubmitReview)}>
                    <Grid container spacing={0} direction="row">
                        <Grid item xs={12} sm={3} md={3} lg={2}>
                            {loading ?
                                <Skeleton variant={'text'} width={'80%'} height={100} />
                                :
                                <img src={historyOrder.productImage !== null ? historyOrder.productImage : EmptyProduct}
                                     alt={"img"} className={"w-100"} />
                            }
                        </Grid>
                        <Grid item xs={12} sm={9} md={9} lg={10}>
                            <div className={'ml-16 mt-10'}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'80%'} height={40} />
                                    :
                                    <div>
                                        <div className={'fw-400'}>{historyOrder.productBrand}</div>
                                        {`${historyOrder.productName} ${historyOrder.productCode}`}
                                    </div>
                                }
                            </div>
                            <div className={'ml-16 mt-20'}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'80%'} height={40} />
                                    :
                                    <div>
                                        <div className={"mb-10"}>{t('label.rateProduct')}</div>
                                        <RateAtom rate={setRating} name={"rate"} />
                                    </div>
                                }
                                <Input type="hidden" value={rating} name="rate" inputRef={register} />
                                <Input type="hidden" value={historyOrder.href} name="orderItem.href" inputRef={register} />
                            </div>
                            <div className={'ml-16 mt-20'}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'80%'} height={40} />
                                    :
                                    <div>
                                        <div className={"mb-10"}>{t('label.writeReview')}</div>
                                        <TextField
                                            id={"content"}
                                            name={"content"}
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
                                    </div>
                                }
                            </div>
                            <div className={'ml-16 mt-20'}>
                                <div className={"mb-10"}>{t('label.productPhoto')}</div>
                                <Grid container spacing={2}>
                                    {photoReview?.length > 0 &&
                                        photoReview.map((item, index) => (
                                            <Grid item xs={12} sm={12} md={12} lg={2} key={index}>
                                                <div className={'border-radius-5px'}>
                                                    <img src={item.image} className={`w-100`} alt="img-id" />
                                                </div>
                                            </Grid>
                                        ))
                                    }
                                    <Grid item xs={12} sm={12} md={12} lg={2}>
                                        <label htmlFor="review-photos">
                                            {loading ?
                                                <Skeleton variant={'text'} width={'80%'} height={40} />
                                                :
                                                <div className={'p-16 border-cicle border-radius-5px'}>
                                                    <img src={PlusImage} className={`pointer w-100`} alt="img-id" />
                                                </div>
                                            }
                                        </label>
                                        <input accept="image/*" id="review-photos" className="ds-n" type="file"
                                               onChange={handleUploadImage} />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={'ml-16'}>
                                {loading ?
                                    <Skeleton variant={'text'} width={'80%'} height={40} />
                                    :
                                    <CheckBoxAtom label={t('label.hideName')} name="isAnonymous" id="isAnonymous"
                                                  color="default" reg={register} styleCheckbox={'fs-14'}
                                                  value={props.href}
                                    />
                                }
                            </div>
                        </Grid>
                    </Grid>

                    <div className={'ta-r'}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40}/>
                            :
                            <ButtonAtom variant="contained" color="secondary"
                                        styleView={'btn__default text-transf-cap'}
                                        name={t('label.cancel')}
                                        clicked={handleCancelReview}
                            />
                        }
                        {' '}
                        {buttonLoading ? (
                            <ButtonAtom
                                type={'button-loading'}
                                styleView={'w-10 text-transf-cap fw-b tc-white bgc-primary'}
                                styleImage={'w-40'}
                            />
                        ):(
                            loading ?
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                                :
                                <ButtonAtom
                                    variant="contained"
                                    type="submit"
                                    styleView={'btn__primary text-transf-cap'}
                                    name={t('label.send')}
                                />
                        )}
                    </div>
                </form>
            </div>
        </Suspense>
    )
}

export default ProductReview;