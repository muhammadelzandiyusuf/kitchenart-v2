import {React, Suspense, useState, useEffect, useForm, useTranslation, useHistory} from 'libraries';
import {getTradeInContents, postTradeInRequests} from 'services';
import {fileToBase64} from "utils";

import 'assets/scss/form/form.scss';
import 'assets/scss/tradein/tradein.scss';
import "assets/scss/button/button.scss";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BannerAtom = React.lazy(() => import('components/atoms/BannerAtom'));
const TradeInOrganism = React.lazy(() => import('components/organisms/TradeInOrganism'));
const ButtonRegister = React.lazy(() => import('components/atoms/ButtonAtom'));
const DialogMolecule = React.lazy(() => import('components/molecules/DialogMolecule'));

const TradeinRequest = () => {

    const t = useTranslation();
    const history = useHistory();
    const acceess = localStorage.getItem('access');
    const [meta] = useState({
        title: 'KitchenArt - Tradein Request',
        keyword: 'tradein',
        description: 'tradein'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [banner, setBanner] = useState({
        type: null,
        image: null,
        alt: null
    });
    const [contact, setContact] = useState([]);
    const [termCondition, setTermCondition] = useState('');
    const [agree, setAgree] = useState(false);
    const [productPhotoTradein, setProductPhotoTradein] = useState([]);
    const [imageTradein, setImageTradein] = useState([]);
    const [tradeinQuote, setTradeinQuote] = useState([]);
    const [showTradeinQuote, setShowTradeinQuote] = useState(false);
    const [openDialog, setDialog] = useState(false);
    const [content] = useState({
        data: `${t('message.successTradein')}`
    });
    const [buttonLoading, setButtonLoading] = useState(false);

    const { register, handleSubmit, control } = useForm();

    useEffect(() => {
        getTradeInContents({}).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setContact(data?.properties?.contact);
                setBanner({
                    type: 'banner-fluid',
                    image: data?.bannerImage,
                    alt: 'banner-tradein'
                });
                setTermCondition(data?.termCondition);
            };
        });
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handleUploadImage = event => {
        const file = event.target.files[0];
        let arrayImages = [...productPhotoTradein];
        let arrayPost = [...imageTradein];
        if (file !== undefined) {
            if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
                if (file.size > 500000) {
                    setSnackbar({type: 'warning', message: t('label.formatImage')});
                    setOpen(true);
                }
                else{
                    if (arrayImages?.length < 5) {
                        fileToBase64(file).then(result => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = function() {
                                arrayImages.push({
                                    selectedFile: reader.result,
                                    style: "uploaded-file",
                                    photosTradeIn: result
                                });
                                setProductPhotoTradein(arrayImages);
                            };
                            arrayPost.push(result);
                            setImageTradein(arrayPost);
                        });
                    }
                    else{
                        setSnackbar({type: 'warning', message: t('message.uploadTooManyPhotos')});
                        setOpen(true);
                    };
                };
            }
            else{
                setSnackbar({type: 'warning', message: t('label.formatImage')});
                setOpen(true);
            };
        }
        else{
            setSnackbar({type: 'error', message: t('message.photosUndefined')});
            setOpen(true);
        };
    };

    const handleSubmitTradeInQuote = (data) => {
        let array = [...tradeinQuote];
        if (imageTradein?.length > 0) {
            array.push({
                category: data.category?.value,
                productExchange: data.productExchange,
                productTarget: data.productTarget?.value,
                condition: data.condition?.value,
                description: data.description,
                media: imageTradein,
                productName: `${data.productTarget?.name}`,
                image: data.productTarget?.image,
                labelCondition: data.condition?.label
            });
            setTradeinQuote(array);
            setShowTradeinQuote(true);
            setImageTradein([]);
            setProductPhotoTradein([]);
        }
        else{
            setSnackbar({type: 'error', message: t('message.photoMustUploaded')});
            setOpen(true);
        };
    };

    const handleAnotherTradeIn = () => {
        setShowTradeinQuote(false);
    };

    const handleAgreeTerms = (event) => {
        setAgree(event.target.checked);
    };

    const handleSubmitTradein = () => {
        setButtonLoading(true);
        const payload = {
            headers: {'Authorization': acceess},
            body: tradeinQuote
        };
        postTradeInRequests(payload).then(response => {
            if (response.status === 201) {
                setDialog(true);
                setButtonLoading(false);
            }
            else if (response.status === 401) {
                setSnackbar({type: 'error', message: t('message.notProvider')});
                setOpen(true);
                setButtonLoading(false);
            };
        });
    };

    const handleCloseDialog = () => {
        setDialog(false);
    };

    const handleButton = () => {
        setDialog(false);
        history.push('/');
    };

    const handleDeleteTradeQuote = (index) => {
        let array = [...tradeinQuote];
        array.splice(index, 1);
        setTradeinQuote(array);
        if (array?.length === 0) {
            setShowTradeinQuote(false);
        };
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <BannerAtom {...banner} />
            <TradeInOrganism
                contact={contact}
                termCondition={termCondition}
                register={register}
                control={control}
                acceess={acceess}
                handleSubmit={handleSubmit}
                handleSubmitTradeInQuote={handleSubmitTradeInQuote}
                productPhotoTradein={productPhotoTradein}
                handleUploadImage={handleUploadImage}
                tradeinQuote={tradeinQuote}
                showTradeinQuote={showTradeinQuote}
                handleAnotherTradeIn={handleAnotherTradeIn}
                handleAgreeTerms={handleAgreeTerms}
                handleDeleteTradeQuote={handleDeleteTradeQuote}
            />
            <div className={'ta-c mt-30 mb-32'}>
                {buttonLoading ? (
                    <ButtonRegister
                        variant="contained"
                        color="secondary"
                        name={'Submit'}
                        styleView={`text-transf-cap pt-10 pb-10 pl-24 pr-24 fs-18 w-25 btn__primary`}
                        type={'button-loading'}
                        styleImage={'w-10'}
                    />
                ):(
                    <ButtonRegister
                        variant="contained"
                        color="secondary"
                        name={'Submit'}
                        styleView={`text-transf-cap pt-10 pb-10 pl-24 pr-24 fs-18 w-25 ${agree && tradeinQuote.length > 0 ? "btn__primary" : " "}`}
                        disabled={agree && tradeinQuote.length > 0 ? false : true }
                        clicked={handleSubmitTradein}
                    />
                )}
            </div>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <DialogMolecule
                handleOpen={openDialog}
                handleClose={handleCloseDialog}
                title={`${t('message.thankYou')},`}
                styleTitle={'fs-28 fw-b'}
                content={content.data}
                styleContent={'fs-24'}
                styleIcon="fs-3rem"
                buttonName={t('label.backToHome')}
                btnType={'tradein'}
                handleButton={handleButton}
            />
        </Suspense>
    );
};

export default TradeinRequest;