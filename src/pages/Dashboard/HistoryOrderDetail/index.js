import {React, Suspense, useEffect, useHistory, useParams, useState, useTranslation} from "libraries";

import 'assets/scss/dashboard/historyOrder.scss';
import {getHistoryOrder, optionsHistoryOrderItem, postOrderCancellations, postOrderComplaint} from "services";
import {fileToBase64} from "utils";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const HistoryOrderDetailOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/HistoryOrderDetail'));

const HistoryOrderDetail = () => {
    const history = useHistory();
    const access = localStorage.getItem('access');
    const params = useParams();
    const t = useTranslation();

    const [meta] = useState({
        title: 'KitchenArt - History Order Detail'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });

    const [historyOrder, setHistoryOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openOrderComplaint, setOpenOrderComplaint] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [photoComplaint, setPhotoComplaint] = useState([]);
    const [imageComplaint, setImageComplaint] = useState([]);
    const [href, setHref] = useState('');
    const [formCancelOrder, setFormCancelOrder] = useState(false);
    const [condition, setCondition] = useState('');
    const [formCancelOrderSuccess, setFormCancelOrderSuccess] = useState(false);
    const [optionStatus, setOptionStatus] = useState([]);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: params.code
            };
            getHistoryOrder(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setHistoryOrder(data);
                    const payloadOptions = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        }
                    };
                    optionsHistoryOrderItem(payloadOptions).then(options => {
                        if (options?.axiosResponse?.status === 200) {
                            const dataOptions = options?.axiosResponse?.data;
                            setOptionStatus(dataOptions?.actions?.POST?.status?.choices);
                            setLoading(false);
                        };
                    });
                } else if (result?.axiosResponse?.status === 401) {
                    history.push('/login');
                };
            });
        }
        else {
            history.push('/login');
        }
    }, [access, history, params, refresh]);

    const handleGetHistoryOrder = () => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: params.code
        };
        getHistoryOrder(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setHistoryOrder(data);
                setLoading(false);
            } else if (result?.axiosResponse?.status === 401) {
                history.push('/login');
            };
        });
    };

    const handleUploadImage = event => {
        const file = event.target.files[0];
        let arrayImages = [...photoComplaint];
        let arrayPost = [...imageComplaint];
        if (file !== undefined) {
            if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
                if (file.size > 500000) {
                    setSnackbar({type: 'warning', message: t('label.formatImage')});
                    setOpen(true);
                }
                else{
                    if (arrayImages?.length < 4) {
                        fileToBase64(file).then(result => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = function() {
                                arrayImages.push({
                                    image: reader.result
                                });
                                setPhotoComplaint(arrayImages);
                            };
                            arrayPost.push(result);
                            setImageComplaint(arrayPost);
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

    const handleSubmitComplaint = (data) => {
        setButtonLoading(true);
        data.media = photoComplaint;
        if (photoComplaint.length > 0) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                body: data
            }
            postOrderComplaint(payload).then(result => {
                if (result.message) {
                    setSnackbar({ type: 'error', message: result.message });
                    setOpen(true);
                } else {
                    setSnackbar({ type: 'success', message: "Your complaint has been recorded" });
                    setOpen(true);
                    setOpenOrderComplaint(false);
                    setRefresh(!refresh);
                    setPhotoComplaint([]);
                    setImageComplaint([]);
                }
                setButtonLoading(false);
            });
        } else {
            setSnackbar({type: 'error', message: t('message.photoMustUploaded')});
            setOpen(true);
            setButtonLoading(false);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleTrackingOrder = (orderNumber) => {
        history.push(`/profile/history-order/track-order/${orderNumber}`);
    }

    const handleCompletePayment = (orderNumber) => {
        history.push(`/payment/virtual-account/${orderNumber}`);
    }

    const handleProductReview = (orderItemNumber) => {
        history.push(`/profile/history-order/review/${orderItemNumber}`);
    }

    const handleCloseOrderComplaint = () => {
        setOpenOrderComplaint(false);
        setPhotoComplaint([]);
        setImageComplaint([]);
    };

    const handleShowOrderComplaint = (href) => {
        setHref(href)
        setOpenOrderComplaint(true);
    };

    const handleShowFormCancelOrder = () => {
        setFormCancelOrder(!formCancelOrder);
    };

    const handleSubmitFormCancel = (data) => {
        setButtonLoading(true);
        if (data.condition !== '') {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                body: {
                    order: {
                        href: historyOrder?.href
                    },
                    problem: data.condition,
                    reason: data.notes
                }
            };
            postOrderCancellations(payload).then(response => {
                let dataResponse = null;
                setButtonLoading(false);
                if (response?.axiosResponse?.status === 400) {
                    dataResponse = response?.axiosResponse?.data;
                    setSnackbar({type: 'error', message: dataResponse?.order});
                    setOpen(true);
                }
                else if (response?.axiosResponse?.status === 201) {
                    handleGetHistoryOrder();
                    setFormCancelOrder(false);
                    setFormCancelOrderSuccess(true);
                };
            });
        }
        else {
            setSnackbar({type: 'error', message: t('message.selectReasonForCancellation')});
            setOpen(true);
        };
    };

    const handleChangeCondition = (event) => {
        setCondition(event.target.value);
    };

    const handleShowFormCancelOrderSuccess = () => {
        setFormCancelOrderSuccess(!formCancelOrderSuccess);
    };

    const handleBuyAgain = (href, structure) => {
        if (structure === 'stand_alone') {
            history.push(`/product/${href}`);
        }
        else{
            history.push(`/product/package-deal/${href}`);
        };
    };

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <MenuDashboard>
                <HistoryOrderDetailOrganism
                    handleTrackingOrder={handleTrackingOrder}
                    handleCompletePayment={handleCompletePayment}
                    historyOrder={historyOrder}
                    loading={loading}
                    handleProductReview={handleProductReview}
                    openOrderComplaint={openOrderComplaint}
                    handleCloseOrderComplaint={handleCloseOrderComplaint}
                    handleShowOrderComplaint={handleShowOrderComplaint}
                    handleUploadImage={handleUploadImage}
                    photoComplaint={photoComplaint}
                    handleSubmitComplaint={handleSubmitComplaint}
                    buttonLoading={buttonLoading}
                    href={href}
                    handleShowFormCancelOrder={handleShowFormCancelOrder}
                    formCancelOrder={formCancelOrder}
                    handleSubmitFormCancel={handleSubmitFormCancel}
                    handleChangeCondition={handleChangeCondition}
                    condition={condition}
                    handleShowFormCancelOrderSuccess={handleShowFormCancelOrderSuccess}
                    formCancelOrderSuccess={formCancelOrderSuccess}
                    optionStatus={optionStatus}
                    handleBuyAgain={handleBuyAgain}
                />
            </MenuDashboard>
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
        </Suspense>
    )
}

export default HistoryOrderDetail;