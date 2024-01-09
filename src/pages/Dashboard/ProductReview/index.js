import {React, Suspense, useEffect, useHistory, useParams, useState, useTranslation} from "libraries";
import {getHistoryOrderItem, postProductReview} from "services";
import {fileToBase64} from "utils";

import 'assets/scss/dashboard/historyOrder.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const ProductReviewOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/ProductReviewOrganism'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const DialogMolecule = React.lazy(() => import('components/molecules/DialogMolecule'));

const ProductReview = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');
    const params = useParams();
    const t = useTranslation();

    const [meta] = useState({
        title: 'KitchenArt - Product Review'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [historyOrder, setHistoryOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [photoReview, setPhotoReview] = useState([]);
    const [imageReview, setImageReview] = useState([]);
    const [openSuccessDialog, setSuccessDialog] = useState(false);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: params.code
            }

            getHistoryOrderItem(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setHistoryOrder(data);
                    setLoading(false);
                } else if (result?.axiosResponse?.status === 401) {
                    history.push('/login');
                } else {
                    history.push('/404');
                }
            })
        }
        else {
            history.push('/login');
        }
    }, [access, history, params]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleUploadImage = event => {
        const file = event.target.files[0];
        let arrayImages = [...photoReview];
        let arrayPost = [...imageReview];
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
                                    image: reader.result
                                });
                                setPhotoReview(arrayImages);
                            };
                            arrayPost.push(result);
                            setImageReview(arrayPost);
                        });
                    }
                    else{
                        setSnackbar({type: 'warning', message: t('message.uploadTooManyPhotos')});
                        setOpen(true);
                    }
                }
            }
            else{
                setSnackbar({type: 'warning', message: t('label.formatImage')});
                setOpen(true);
            }
        }
        else{
            setSnackbar({type: 'error', message: t('message.photosUndefined')});
            setOpen(true);
        }
    };

    const handleSubmitReview = (data) => {
        setButtonLoading(true);
        data.media = photoReview;
        if (photoReview.length > 0) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                body: data
            }
            postProductReview(payload).then(result => {
                if (result.message) {
                    setSnackbar({ type: 'error', message: result.message });
                    setOpen(true);
                } else {
                    setSuccessDialog(true);
                }
                setButtonLoading(false);
            });
        } else {
            setSnackbar({type: 'error', message: t('message.photoMustUploaded')});
            setOpen(true);
            setButtonLoading(false);
        }
    }

    const handleCloseSuccessDialog = () => {
        setSuccessDialog(false);
        history.push('/profile/history-order');
    }

    const handleCancelReview = () => {
        const orderItemNumber = historyOrder.orderItemNumber.split("-");
        history.push(`/profile/history-order/${orderItemNumber[0]}`);
    }

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <ProductReviewOrganism
                    historyOrder={historyOrder}
                    loading={loading}
                    handleUploadImage={handleUploadImage}
                    photoReview={photoReview}
                    handleSubmitReview={handleSubmitReview}
                    handleCancelReview={handleCancelReview}
                    buttonLoading={buttonLoading}
                />
            </MenuDashboard>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <DialogMolecule handleOpen={openSuccessDialog} handleClose={handleCloseSuccessDialog}
                            content={t('message.reviewRecorded')} title={t('message.thankyou!')}
                            buttonName={t('form.continue')} />
        </Suspense>
    )
}

export default ProductReview;