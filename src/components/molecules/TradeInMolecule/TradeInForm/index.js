import {
    React,
    Suspense,
    Grid,
    AsyncSelect,
    Controller,
    useTranslation,
    useEffect,
    useState,
    SelectUi,
    Input,
    FormHelperText, Button, EmptyProduct, PlusImage
} from 'libraries';
import {getChildCategories, optionsTradeInRequests, getOptionProductLists} from 'services';
import {getHostUrl} from "utils";

const TextFieldAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));

const TradeInForm = (props) => {

    const t = useTranslation();
    const [options, setOptions] = useState([]);

    const [descriptionText] = useState(
        {
            typeForm: 'text-multiline',
            name: 'description',
            reg: props.register,
            margin: 'normal',
            id: 'description',
            variant: 'outlined',
            required: true,
            rows: 6
        }
    );

    const [brandName] = useState(
        {
            typeForm: 'text-field',
            name: 'productExchange',
            reg: props.register,
            id: 'productExchange',
            variant: 'outlined',
            required: true,
        }
    );

    useEffect(() => {
        const payload = {headers: {'Authorization': props.acceess}};
        optionsTradeInRequests(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                  const data = response?.axiosResponse?.data;
                  const choices = data?.actions?.POST?.condition?.choices;
                  let result = [];
                  if (choices?.length > 0) {
                      choices.forEach(item => {
                          result.push({
                              label: item.displayName,
                              value: item.value
                          });
                      });
                      setOptions(result);
                  };
            };
        });
    }, [props.acceess]);

    const fetchChildGategories = async (inputValue) => {
        let result = [];
        const payload = {
            params: {
                q: inputValue,
                level: 2,
                is_active: true
            }
        };
        await getChildCategories(payload).then(response => {
            if (response.axiosResponse?.status === 200) {
                const categories = response.axiosResponse?.data;
                if (categories?.length > 0) {
                    categories.forEach(category => {
                        result.push({
                           label: category.name,
                            value: category.href
                        });
                    })
                };
            };
        });
        return result;
    };

    const loadOptionCategories = (inputValue) => {
        return fetchChildGategories(inputValue);
    };

    const fetchProductLists = async (inputValue) => {
        let result = [];
        const payload = {
            params: {
                q: inputValue,
                is_active: true
            }
        };
        await getOptionProductLists(payload).then(response => {
            if (response.axiosResponse?.status === 200) {
                const products = response.axiosResponse?.data;
                if (products?.length > 0) {
                    products.forEach(product => {
                        let image = null;
                        if (product.media?.length > 0) {
                            image = getHostUrl(product.media[0]?.image);
                        };
                        result.push({
                            label: <div className={'tradein__product'}>
                                        <img src={image !== null ? image : EmptyProduct} className={'w-4'}
                                             alt={'imageproduct'} />
                                        <span className={'ps-ab ml-8 mt-4'}> {product.brand?.name} {product.name} ({product.code})</span>
                                    </div>,
                            value: product.href,
                            image: image,
                            name: `${product.brand?.name} ${product.name} (${product.code})`
                        });
                    })
                };
            };
        });
        return result;
    };

    const loadOptionProducts = (inputValue) => {
        return fetchProductLists(inputValue);
    };


    return (
        <Suspense fallback={null}>
            <div className={'tradein__contact'}>
                <div className={'border-cicle mt-30 mb-64'}>
                    <div className={'bgc-black fs-22 tc-white p-16'}>Trade in Form</div>
                    <div className={'p-32'}>
                        <form onSubmit={props.handleSubmit(props.handleSubmitTradeInQuote)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={4}>
                                    <Controller
                                        name="category"
                                        control={props.control}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        as={<AsyncSelect
                                            defaultOptions
                                            loadOptions={loadOptionCategories}
                                            inputRef={props.register}
                                            placeholder={`${t('form.productCategory')}*`}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={4}>
                                    <TextFieldAtom {...brandName} label={t('form.brandProductName')} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={4}>
                                    <Controller
                                        name="condition"
                                        control={props.control}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        as={<SelectUi
                                            className="basic-single"
                                            placeholder={`${t('form.productCondition')}*`}
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={true}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="condition"
                                            options={options}
                                            inputRef={props.register}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextFieldAtom {...descriptionText} label={t('form.description')} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <div className={'fs-18 tx-c'}>{t('form.productPhotos')}*</div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={12} lg={2}>
                                            <div className={'mt-10'}>
                                                <input accept="image/*" id="product-photos" className="ds-n" type="file" onChange={props.handleUploadImage} />
                                                <Input type="hidden" name="productPhotos" inputRef={props.register} />
                                                <label htmlFor="product-photos">
                                                    <div className={'p-16 border-cicle border-radius-5px'}>
                                                        <img src={PlusImage} className={`pointer w-100`} alt="img-id" />
                                                    </div>
                                                </label>
                                                <FormHelperText className="helper-text-error">{props.error?.productPhotos ? props.error?.productPhotos?.message : ""}</FormHelperText>
                                                <FormHelperText><i>{t('label.formatImage')}</i></FormHelperText>
                                            </div>
                                        </Grid>
                                        {props.productPhotoTradein?.length > 0 &&
                                            props.productPhotoTradein.map((item, index) => (
                                                <Grid item xs={12} sm={12} md={12} lg={2} key={index}>
                                                    <div className={'p-16 border-cicle border-radius-5px'}>
                                                        <img src={item.selectedFile} className={`w-100`} alt="img-id" />
                                                    </div>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                    <div className={'mt-20 mb-10 fs-22 tx-c fw-b'}>{t('label.selectProductYouWant')}</div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={8}>
                                    <Controller
                                        name="productTarget"
                                        control={props.control}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        as={<AsyncSelect
                                            defaultOptions
                                            loadOptions={loadOptionProducts}
                                            inputRef={props.register}
                                            placeholder={`${t('form.productName')}*`}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={4}>
                                    <div className={'ta-c'}>
                                        <Button
                                            type={'submit'}
                                            variant="outlined"
                                            className={'btn text-transf-cap pr-24 pl-24 pt-10 pb-10 fs-18 product__detail__button--stock'}>
                                            {t('form.addTradeInQuote')}
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default TradeInForm;