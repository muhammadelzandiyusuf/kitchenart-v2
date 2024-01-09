import {React, Suspense, useTranslation, useEffect, useHistory, useState, useForm, Helmet} from 'libraries';
import {
    getVouchers,
    getGiftVouchers,
    getCarts,
    postShipmentTariffs,
    getShipmentVendors,
    getShippingAddresses,
    patchCheckouts,
    postShippingAddress,
    updateShippingAddress,
    postCheckouts, postPayments
} from 'services';
import {getIdentityFromHref, setErrorValidation} from "utils";

import 'assets/scss/checkout/checkout.scss';
import 'assets/scss/checkout/shippingAddress.scss';

const CheckoutOrganism = React.lazy(() => import('components/organisms/OderOrganism/CheckoutOrganism'));
const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const Checkout = () => {

    const t = useTranslation();
    const access = localStorage.getItem('access');
    const history = useHistory();

    const midtransScriptUrl = process.env.REACT_APP_MIDTRANS_SCRIPT_URL;
    const midtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    const midtransEnvironment = process.env.REACT_APP_MIDTRANS_ENV;

    const [meta] = useState({
        title: 'KitchenArt - Checkout',
        keyword: 'checkout',
        description: 'checkout'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [courier, setCourier] = useState('');
    const [courierService, setCourierService] = useState('');
    const [courierServices, setCourierServices] = useState([]);
    const [shippingInsurance, setShippingInsurance] = useState(false);
    const [cashback, setCashback] = useState(false);
    const [openShippingAddress, setOpenShippingAddress] = useState(false);
    const [openChooseShippingAddress, setOpenChooseShippingAddress] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [shippingAddress, setShippingAddress] = useState([]);
    const [actionShippingAddress, setActionShippingAddress] = useState('create');
    const [defaultShippingAddress, setDefaultShippingAddress] = useState([]);
    const [vendorShipment, setVendorShipment] = useState([]);
    const [insurance, setInsurance] = useState(0);
    const [voucherDiscount, setVoucherDiscount] = useState([]);
    const [voucherCashback, setVoucherCashback] = useState([]);
    const [voucherShipping, setVoucherShipping] = useState([]);
    const [giftVoucher, setGiftVoucher] = useState([]);
    const [promo, setPromo] = useState('');
    const [openVoucher, setOpenVoucher] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [casbackPrice, setCashbackPrice] = useState({
        discountType: 'amount_off',
        amount: 0
    });
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shoppingSummary, setShoppingSummary] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [activeVoucherDiscount, setActiveVoucherDiscount] = useState([]);
    const [activeVoucherCashback, setActiveVoucherCashback] = useState(null);
    const [activeVoucherShipping, setActiveVoucherShipping] = useState(null);
    const [activeVoucherGift, setActiveVoucherGift] = useState(null);
    const [activeCoupon, setActiveCoupon] = useState(null);
    const [paramVouchers, setParamVouchers] = useState(null);
    const [shippingMethod, setShippingMethod] = useState(null);
    const [shippingMethodEtd, setShippingMethodEtd] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [openBilingDetail, setOpenBilingDetail] = useState(false);
    const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
    const [openPaymentVirtualAccount, setOpenPaymentVirtualAccount] = useState(false);
    const [virtualAccount, setVirtualAccount] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [openPaymentCreditCard, setOpenPaymentCreditCard] = useState(false);
    const [creditCardMethod, setCreditCardMethod] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [openFrame, setOpenFrame] = useState(false);
    const [orderNumberPayment, setOrderNumberPayment] = useState(null);
    const [openPaymentInstallment, setOpenPaymentInstallment] = useState(false);
    const [installmentBank, setInstallmentBank] = useState([]);
    const [installmentTenor, setInstallmentTenor] = useState(null);
    const [openPaymentInstallmentForm, setOpenPaymentInstallmentForm] = useState(false);
    const [codeCouponPromo, setCodeCouponPromo] = useState(null);
    const [lineItems, setLineItems] = useState([]);
    const [mustInsurance, setMustInsurance] = useState(false);

    const [validation] = useState({
        name: [null],
        email: [null],
        phoneNumber: [null],
        birthDate: [null],
        password: [null],
        passwordConfirm: [null]
    });

    const { errors, setError } = useForm();

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            };
            getShippingAddresses(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data
                    setShippingAddresses(data);
                    setDefaultShippingAddress(data[0]);
                    getCarts(payload).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data;
                            setCarts(data);
                            if (data?.lineItems?.length > 0) {
                                let cartLineItems = [];
                                data?.lineItems.forEach(lineItem => {
                                    cartLineItems.push({
                                        price: lineItem.price,
                                        height: lineItem.height,
                                        length: lineItem.length,
                                        width: lineItem.width,
                                        weight: lineItem.weight
                                    })
                                });
                                setLineItems(cartLineItems);
                                const payloadVendor = {
                                    path: 'rate-type',
                                };
                                getShipmentVendors(payloadVendor).then(response => {
                                    if (response?.axiosResponse?.status === 200) {
                                        const dataVendor = response?.axiosResponse?.data;
                                        setVendorShipment(dataVendor);
                                        const payloadCheckout = {
                                            headers: {
                                                'Authorization': access,
                                                'Cache-Control': 'no-cache'
                                            },
                                            path: 'summary',
                                        };
                                        patchCheckouts(payloadCheckout).then(response => {
                                            setLoading(false);
                                            if (response?.axiosResponse?.status === 200) {
                                                const dataSummary = response?.axiosResponse?.data;
                                                setShoppingSummary(dataSummary);
                                            }
                                            else if (response?.message) {
                                                setSnackbar({type: 'error', message: response.message});
                                                setOpen(true);
                                                setTimeout(() => {
                                                    history.push('/cart');
                                                }, 3000);
                                            };
                                        });
                                    };
                                });
                            }
                            else {
                                history.push('/cart');
                            };
                        }
                        else if (result?.axiosResponse?.status === 401) {
                            history.push('/login');
                        }
                        else{
                            history.push('/404');
                        };
                    });
                }
                else if (result?.axiosResponse?.status === 401) {
                    history.push('/login');
                };
            });
        }
        else{
            history.push('/login');
        }
    }, [access, history]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handleChangeCourier = (event) => {
        setBackDrop(true);
        if (event.target.checked === true) {
            const courier = event.target.name;
            setCourier(courier);
            const payload = {
                path: 'domestic-price',
                body: {
                    rateType: courier,
                    destination: {
                        code: defaultShippingAddress.areaCode,
                        latitude: defaultShippingAddress.latitude,
                        longitude: defaultShippingAddress.latitude
                    },
                    lineItems: lineItems
                }
            };
            postShipmentTariffs(payload).then(response => {
                setBackDrop(false);
                if (response.message) {
                    setSnackbar({ type: 'error', message: response.message });
                    setOpen(true);
                }
                else if (response?.axiosResponse?.status === 200){
                    const dataService = response?.axiosResponse?.data;
                    setCourierServices(dataService);
                }
            });
        }
        else{
            const payload = {
                body: {
                    shippingAddress: defaultShippingAddress,
                    ...paramVouchers,
                    ...codeCouponPromo,
                },
                path: 'summary'
            };
            patchCheckout(payload);
            setCourier('');
            setCourierService('');
            setInsurance(0);
            setShippingInsurance(false);
            setBackDrop(false);
        }
    };

    const handleChangeValueCourierService = (event) => {
        setBackDrop(true);
        const valueCourierService = event.target.value;
        const service = valueCourierService.split('/');
        const shippingService = {
            shippingService: {
                serviceId: Math.floor(service[0]),
                vendorName: service[1],
                vendorCode: service[2],
                serviceName: service[3],
                useInsurance: service[4] === 'true' ? true : false,
                price: Math.floor(service[5]),
                insuranceFee: Math.floor(service[6]),
                finalPrice: Math.floor(service[7]),
                pricingChecksum: service[8]
            }
        };
        const shippingEtd = {
            etdFrom: service[9],
            etdTo: service[10]
        };
        setInsurance(Math.floor(service[5]));
        setShippingInsurance(service[4] === 'true' ? true : false);
        const payload = {
            shippingAddress: defaultShippingAddress,
            ...shippingService,
            ...paramVouchers,
            ...codeCouponPromo
        };
        setMustInsurance(service[4] === 'true' ? true : false);
        patchCheckout(payload);
        setCourierService(valueCourierService);
        setShippingMethod(shippingService);
        setShippingMethodEtd(shippingEtd);
    };

    const handleShippingInsurance = (event) => {
        const checkedShippingInsurance = event.target.checked;
        if (shippingMethod) {
            setBackDrop(true);
            shippingMethod.shippingService.useInsurance = checkedShippingInsurance;
            shippingMethod.shippingService.insuranceFee = insurance;
            const payload = {
                shippingAddress: defaultShippingAddress,
                ...shippingMethod,
                ...paramVouchers,
                ...codeCouponPromo
            }
            patchCheckout(payload);
        }
        setShippingInsurance(checkedShippingInsurance);
        setShippingMethod(shippingMethod);
    };

    const handleCodePromo = (data) => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: 'summary',
            body: {
                shippingAddress: defaultShippingAddress,
                ...shippingMethod,
                ...paramVouchers,
                couponCode: data.codePromo
            }
        };
        setCodeCouponPromo({
            couponCode: data.codePromo
        });
        if (data.codePromo !== '') {
            setBackDrop(true);
            patchCheckouts(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const dataSummary = response?.axiosResponse?.data;
                    setShoppingSummary(dataSummary);
                    setActiveCoupon(null);
                    setBackDrop(false);
                }
                else if (response?.axiosResponse?.status === 400) {
                    const dataSummary = response?.axiosResponse?.data;
                    setActiveCoupon(dataSummary?.detail?.couponCode);
                    setBackDrop(false);
                };
            });
        }
        else{
            setSnackbar({type: 'error', message: t('message.emptyCoupon')});
            setOpen(true);
        };

    };

    const handleChangeCashback = (event) => {
        setCashback(event.target.checked);
    };

    const handleGetPromoVoucher = (promo) => {
        setBackDrop(true);
        setPromo(promo);
        if (promo !== 'gift') {
            const payload = {
                params: {
                    voucher_type: promo,
                    is_available: true,
                    ordering: 'name'
                }
            };
            getVouchers(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    if (promo === 'discount') {
                        setVoucherDiscount(data);
                    }
                    else if (promo === 'cashback') {
                        setVoucherCashback(data);
                    }
                    else {
                        setVoucherShipping(data);
                    };
                    setBackDrop(false);
                    setOpenVoucher(true);
                };
            });
        }
        else {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                params: {
                    is_available: true,
                }
            };
            getGiftVouchers(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setGiftVoucher(data);
                    setBackDrop(false);
                    setOpenVoucher(true);
                };
            });
        };
    };

    const handleChooseVoucher = (event, href, promo, discountType, amount, name) => {
        let array = [...vouchers];
        let index = null;
        if (promo === 'discount') {
            index = array.findIndex((item) => item.href === href && item.promo === promo);
        }
        else{
            index = array.findIndex((item) => item.promo === promo);
        };
        if (promo === 'cashback') {
            setCashbackPrice({
                discountType: discountType,
                amount: amount
            })
        };
        if (index !== -1) {
            if (promo === 'discount') {
                array.splice(index, 1);
            }
            else {
                if (event.target.checked === true) {
                    array.splice(index, 1);
                    const data = {href: href, promo: promo, fullHref: event.target.value, name: name, amount: amount};
                    array.push(data);
                }
                else {
                    array.splice(index, 1);
                }
            };
        }
        else{
            const data = {href: href, promo: promo, fullHref: event.target.value, name: name, amount: amount};
            array.push(data);
        };
        setVouchers(array);
    };

    const handleCancelVoucher = (promo) => {
        const array = [...vouchers];
        let data = {
            shippingAddress: defaultShippingAddress,
            ...shippingMethod
        };
        if (array.length > 0) {
            const obj = array.filter(item => item.promo !== promo);
            if (obj !== undefined) {
                if (obj.length > 0) {
                    setVouchers(obj);
                    let voucherDiscounts = [];
                    let voucherCashback = null;
                    let voucherShipping = null;
                    let giftVoucher = null;
                    obj.forEach(result => {
                        const data = {href: result.fullHref};
                        if (result.promo === 'discount') {
                            voucherDiscounts.push(data);
                        }
                        else if (result.promo === 'cashback') {
                            voucherCashback = data;
                        }
                        else if (result.promo === 'shipping') {
                            voucherShipping = data;
                        }
                        else if (result.promo === 'gift') {
                            giftVoucher = data;
                        }
                    });
                    if (voucherDiscounts.length > 0) {
                        data.voucherDiscounts = voucherDiscounts;
                    }
                    else{
                        if (data !== null) {
                            delete data.voucherDiscounts;
                        };
                    };
                    if (voucherCashback !== null) {
                        data.voucherCashback = voucherCashback;
                    }
                    else {
                        if (data !== null) {
                            delete data.voucherCashback;
                        };
                    };
                    if (voucherShipping !== null) {
                        data.voucherShipping = voucherShipping;
                    }
                    else {
                        if (data !== null) {
                            delete data.voucherShipping;
                        };
                    };
                    if (giftVoucher !== null) {
                        data.giftVoucher = giftVoucher;
                    }
                    else {
                        if (data !== null) {
                            delete data.giftVoucher;
                        };
                    };
                    patchCheckout(data);
                }
                else {
                    patchCheckout(data);
                    setVouchers([]);
                }
            }
            else {
                patchCheckout(data);
                setBackDrop(true);
                setVouchers([]);
            };
            setOpenVoucher(false);
        }
        else {
            patchCheckout(data);
            setBackDrop(true);
            setOpenVoucher(false);
        };
    };

    const patchCheckout = (data) => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: 'summary',
            body: {
                ...data
            }
        };
        patchCheckouts(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const dataSummary = response?.axiosResponse?.data;
                setShoppingSummary(dataSummary);
                setActiveVoucherGift(null);
                setActiveVoucherShipping(null);
                setActiveVoucherCashback(null);
                setActiveVoucherDiscount([]);
            };
            setBackDrop(false);
        });
    };

    const handleToDetailVoucher = (url) => {
        history.push(`/voucher/${url}`);
    };

    const handleAddVoucher = (promo) => {
        setButtonLoading(true);
        let voucherDiscounts = [];
        let voucherCashback = null;
        let voucherShipping = null;
        let giftVoucher = null;
        if (vouchers.length > 0) {
            vouchers.forEach(result => {
                const data = {href: result.fullHref};
                if (result.promo === 'discount') {
                    voucherDiscounts.push(data);
                }
                else if (result.promo === 'cashback') {
                    voucherCashback = data;
                }
                else if (result.promo === 'shipping') {
                    voucherShipping = data;
                }
                else if (result.promo === 'gift') {
                    giftVoucher = data;
                }
            });
            let data = {};
            if (voucherDiscounts.length > 0) {
                data.voucherDiscounts = voucherDiscounts;
            }
            else{
                delete data.voucherDiscounts;
            };
            if (voucherCashback !== null) {
                data.voucherCashback = voucherCashback;
            }
            else {
                delete data.voucherCashback;
            };
            if (voucherShipping !== null) {
                data.voucherShipping = voucherShipping;
            }
            else {
                delete data.voucherShipping;
            };
            if (giftVoucher !== null) {
                data.giftVoucher = giftVoucher;
            }
            else {
                delete data.giftVoucher;
            };
            setParamVouchers(data);
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: 'summary',
                body: {
                    shippingAddress: defaultShippingAddress,
                    ...shippingMethod,
                    ...data
                }
            };
            patchCheckouts(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const dataSummary = response?.axiosResponse?.data;
                    setShoppingSummary(dataSummary);
                    setOpenVoucher(false);
                    setActiveVoucherGift(null);
                    setActiveVoucherShipping(null);
                    setActiveVoucherCashback(null);
                    setActiveVoucherDiscount([]);
                    setButtonLoading(false);
                }
                else if (response?.axiosResponse?.status === 400) {
                    const dataSummary = response?.axiosResponse?.data;
                    if (promo === 'discount') {
                        setActiveVoucherDiscount(dataSummary?.detail?.voucherDiscounts);
                    }
                    else if (promo === 'cashback') {
                        setActiveVoucherCashback(dataSummary?.detail?.voucherCashback);
                    }
                    else if (promo === 'shipping') {
                        setActiveVoucherShipping(dataSummary?.detail?.voucherShipping);
                    }
                    else if (promo === 'gift') {
                        setActiveVoucherGift(dataSummary?.detail?.giftVoucher);
                    };
                    setButtonLoading(false);
                };
            });
        }
        else{
            setButtonLoading(false);
            setSnackbar({type: 'error', message: t('message.noVoucherSelected')});
            setOpen(true);
        };
    };

    const handleCloseShippingAddress = () => {
        setOpenShippingAddress(false);
        setShowLocation(false);
    };

    const handleShowShippingAddress = () => {
        setOpenShippingAddress(true);
        setShippingAddress([]);
        setActionShippingAddress('create');
    };

    const handleCloseChooseShippingAddress = () => {
        setOpenChooseShippingAddress(false);
    };

    const handleShowChooseShippingAddress = () => {
        setOpenChooseShippingAddress(true);
    };

    const handleUpdateShippingAddress = (href) => {
        const slug = getIdentityFromHref(href);
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: slug
            };
            getShippingAddresses(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data
                    setShippingAddress(data);
                    setActionShippingAddress('update');
                    setOpenShippingAddress(true);
                    setLoading(false);
                }
            });
        } else {
            history.push('/login');
        }
    }

    const handleChooseShippingAddress = (href) => {
        const slug = getIdentityFromHref(href);
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: slug
            };
            getShippingAddresses(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data
                    setDefaultShippingAddress(data);
                    setOpenChooseShippingAddress(false)

                    setBackDrop(true);
                    const payload = {
                        shippingAddress: defaultShippingAddress,
                        ...paramVouchers
                    };
                    patchCheckout(payload);
                    setCourier('');
                    setCourierService('');
                    setInsurance(0);
                    setShippingInsurance(false);
                }
            });
        } else {
            history.push('/login');
        }
    }

    const onSubmitShippingAddress = data => {
        setButtonLoading(true);
        if (actionShippingAddress === 'create') {
            delete data.href;
            const payload = {
                headers: {
                    'Authorization': access,
                },
                body: data
            };
            postShippingAddress(payload).then(result => {
                setErrorValidation(validation, false, setError);
                if (result.message) {
                    setErrorValidation(result, true, setError);
                    setSnackbar({ type: 'error', message: result.message });
                    setOpen(true);
                } else {
                    setOpenShippingAddress(false);
                    setShowLocation(false);
                    setRefresh(!refresh);
                    const payloadShippingAddress = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                    };
                    getShippingAddresses(payloadShippingAddress).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data
                            setShippingAddresses(data);
                            setDefaultShippingAddress(data[0]);
                        }
                    });
                }
                setButtonLoading(false);
            });
        } else {
            const slug = getIdentityFromHref(data.href);
            const payload = {
                headers: {
                    'Authorization': access,
                },
                body: data,
                path: slug
            };
            updateShippingAddress(payload).then(result => {
                setErrorValidation(validation, false, setError);
                if (result.message) {
                    setErrorValidation(result, true, setError);
                    setSnackbar({ type: 'error', message: result.message });
                    setOpen(true);
                } else {
                    setOpenShippingAddress(false);
                    setShowLocation(false);
                    setRefresh(!refresh);
                    const payloadShippingAddress = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                    };
                    getShippingAddresses(payloadShippingAddress).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data
                            setShippingAddresses(data);
                            setDefaultShippingAddress(data[0]);
                        }
                    });
                }
                setButtonLoading(false);
            });
        }
    };

    const handleClosePayment = () => {
        setOpenPayment(false);
    };

    const handleOpenPayment = () => {
        setBackDrop(true);
        if (defaultShippingAddress) {
            if (shippingMethod !== null) {
                const shoppingSummaryDefault = shoppingSummary?.payments;
                if (shoppingSummaryDefault?.length > 0) {
                      if (shoppingSummaryDefault[0]?.paymentType === 'bank_transfer') {
                            const paymentBank = shoppingSummaryDefault[0]?.paymentMethods[0];
                            const paymenntMethods = {
                                paymentMethod: {
                                    href: paymentBank?.href,
                                    tenor: null,
                                    tokenId: null
                                }
                            };
                            setPaymentMethod(paymenntMethods);
                      };
                };
                setOpenPayment(true);
                setBackDrop(false);
            }
            else{
                setBackDrop(false);
                setSnackbar({type: 'error', message: t('message.pleaseSelectShipping')});
                setOpen(true);
            };
        }
        else{
            setBackDrop(false);
            setSnackbar({type: 'error', message: t('message.pleaseSelectShippingAddress')});
            setOpen(true);
        };
    };

    const handleCloseBillingDetail = () => {
        setOpenBilingDetail(false);
    };

    const handleOpenBillingDetail = () => {
        setOpenBilingDetail(true);
    };

    const handleClosePaymentMethod = () => {
        setOpenPaymentMethod(false);
    };

    const handleOpenPaymentMethod = () => {
        setOpenPaymentMethod(true);
    };

    const handleClosePaymentVirtualAccount = () => {
        setOpenPaymentVirtualAccount(false);
    };

    const handleOpenPaymentVirtualAccount = (data) => {
        setOpenPaymentVirtualAccount(true);
        setVirtualAccount(data);
        const payment = {
            paymentMethod: {
                href: data.href,
                tenor: null,
                tokenId: null
            }
        };
        setPaymentMethod(payment);
    };

    const handlePay = () => {
        setButtonLoading(true);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            body: {
                shippingAddress: defaultShippingAddress,
                ...shippingMethod,
                ...paramVouchers,
                ...paymentMethod
            }
        };
        postCheckouts(payload).then(response => {
            if (response?.axiosResponse?.status === 201) {
                const location = response?.axiosResponse?.headers?.location;
                const orderNumber = getIdentityFromHref(location);
                const payloadPay = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    path: 'charge',
                    body: {
                        orderNumber: orderNumber
                    }
                };
                postPayments(payloadPay).then(result => {
                    setButtonLoading(false);
                    if (result?.axiosResponse?.status === 200) {
                        history.push(`/payment/virtual-account/${orderNumber}`);
                    };
                });
            };
        });
    };

    const handleClosePaymentCreditCard = () => {
        setOpenPaymentCreditCard(false);
    };

    const handleOpenPaymentCreditCard = (href) => {
        setOpenPaymentCreditCard(true);
        setCreditCardMethod(href);
    };

    const handlePayCreditCard = (data) => {
        setButtonLoading(true);
        const cardNumberDedfault = data.cardNumber.replace('-', '');
        const cardNumber = cardNumberDedfault.replace('-', '');
        const cardData = {
            "card_number": cardNumber,
            "card_exp_month": data.month,
            "card_exp_year": data.year,
            "card_cvv": data.cvv,
        };
        window.MidtransNew3ds.getCardToken(cardData, {
            onSuccess: function(response){
                const tokenId = response.token_id;
                const paymentCreditMethod = {
                    paymentMethod: {
                        href: creditCardMethod,
                        tenor: null,
                        tokenId: tokenId
                    }
                };
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    body: {
                        shippingAddress: defaultShippingAddress,
                        ...shippingMethod,
                        ...paramVouchers,
                        ...paymentCreditMethod
                    }
                };
                postCheckouts(payload).then(responseCheckouts => {
                    if (responseCheckouts?.axiosResponse?.status === 201) {
                        const location = responseCheckouts?.axiosResponse?.headers?.location;
                        const orderNumber = getIdentityFromHref(location);
                        setOrderNumberPayment(orderNumber);
                        const payloadPay = {
                            headers: {
                                'Authorization': access,
                                'Cache-Control': 'no-cache'
                            },
                            path: 'charge',
                            body: {
                                orderNumber: orderNumber
                            }
                        };
                        postPayments(payloadPay).then(result => {
                            setButtonLoading(false);
                            if (result?.axiosResponse?.status === 200) {
                                const url = result?.axiosResponse?.data?.redirectUrl;
                                setRedirectUrl(url);
                                setButtonLoading(false);
                                setOpenFrame(true);
                            }
                            else{
                                setButtonLoading(false);
                            };
                        });
                    };
                });
            },
            onFailure: function(response){
                setButtonLoading(false);
                setSnackbar({type: 'error', message: t('message.pleaseCheckTheDataCardAgain')});
                setOpen(true);
            }
        });
    };

    const handleClosePaymentInstallment = () => {
        setOpenPaymentInstallment(false);
    };

    const handleOpenPaymentInstallment = () => {
        setOpenPaymentInstallment(true);
    };

    const handleConfirmInstallmentBank = (event, href, index, name) => {
        if (event.target.checked === true) {
            setInstallmentBank({
                href: href,
                index: index,
                name: name
            });
        }
        else{
            setInstallmentBank([]);
            setInstallmentTenor(null);
        };
    };

    const handleConfirmInstallmentTenor = (event, data) => {
        if (event.target.checked === true) {
            setInstallmentTenor({
                tenor: data.tenor,
                bankInterest: data.bankInterest,
                installmentAmount: data.installmentAmount
            });
        }
        else {
            setInstallmentTenor(null);
        };
    };

    const handleConfirmInstallment = () => {
        setOpenPaymentInstallmentForm(true);
    };

    const handleClosePaymentInstallmentForm = () => {
        setOpenPaymentInstallmentForm(false);
    };

    const handlePayInstallment = (data) => {
        setButtonLoading(true);
        const cardData = {
            "card_number": data.cardNumber,
            "card_exp_month": data.month,
            "card_exp_year": data.year,
            "card_cvv": data.cvv,
        };
        window.MidtransNew3ds.getCardToken(cardData, {
            onSuccess: function(response){
                const tokenId = response.token_id;
                const paymentCreditMethod = {
                    paymentMethod: {
                        href: installmentBank?.href,
                        tenor: installmentTenor?.tenor,
                        tokenId: tokenId
                    }
                };
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    body: {
                        shippingAddress: defaultShippingAddress,
                        ...shippingMethod,
                        ...paramVouchers,
                        ...paymentCreditMethod
                    }
                };
                postCheckouts(payload).then(responseCheckouts => {
                    if (responseCheckouts?.axiosResponse?.status === 201) {
                        const location = responseCheckouts?.axiosResponse?.headers?.location;
                        const orderNumber = getIdentityFromHref(location);
                        setOrderNumberPayment(orderNumber);
                        const payloadPay = {
                            headers: {
                                'Authorization': access,
                                'Cache-Control': 'no-cache'
                            },
                            path: 'charge',
                            body: {
                                orderNumber: orderNumber
                            }
                        };
                        postPayments(payloadPay).then(result => {
                            setButtonLoading(false);
                            if (result?.axiosResponse?.status === 200) {
                                const url = result?.axiosResponse?.data?.redirectUrl;
                                setRedirectUrl(url);
                                setButtonLoading(false);
                                setOpenFrame(true);
                            }
                            else{
                                setButtonLoading(false);
                            };
                        });
                    };
                });
            },
            onFailure: function(response){
                setButtonLoading(false);
                setSnackbar({type: 'error', message: t('message.pleaseCheckTheDataCardAgain')});
                setOpen(true);
            }
        });
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <Helmet>
                <script id="midtrans-script" type="text/javascript"
                        src={midtransScriptUrl}
                        data-environment={midtransEnvironment}
                        data-client-key={midtransClientKey}>
                </script>
            </Helmet>
            <div className={'product__detail'}>
                <CheckoutOrganism
                    handleChangeCourier={handleChangeCourier}
                    courier={courier}
                    courierService={courierService}
                    handleChangeValueCourierService={handleChangeValueCourierService}
                    shippingInsurance={shippingInsurance}
                    handleShippingInsurance={handleShippingInsurance}
                    handleCodePromo={handleCodePromo}
                    handleChangeCashback={handleChangeCashback}
                    cashback={cashback}
                    handleGetPromoVoucher={handleGetPromoVoucher}
                    openVoucher={openVoucher}
                    promo={promo}
                    voucherDiscount={voucherDiscount}
                    voucherCashback={voucherCashback}
                    voucherShipping={voucherShipping}
                    handleChooseVoucher={handleChooseVoucher}
                    vouchers={vouchers}
                    giftVoucher={giftVoucher}
                    handleCancelVoucher={handleCancelVoucher}
                    handleToDetailVoucher={handleToDetailVoucher}
                    handleAddVoucher={handleAddVoucher}
                    casbackPrice={casbackPrice}
                    loading={loading}
                    carts={carts}
                    shoppingSummary={shoppingSummary}
                    activeVoucherDiscount={activeVoucherDiscount}
                    activeVoucherCashback={activeVoucherCashback}
                    activeVoucherShipping={activeVoucherShipping}
                    activeVoucherGift={activeVoucherGift}
                    activeCoupon={activeCoupon}
                    buttonLoading={buttonLoading}
                    handleCloseShippingAddress={handleCloseShippingAddress}
                    handleShowShippingAddress={handleShowShippingAddress}
                    openShippingAddress={openShippingAddress}
                    showLocation={showLocation}
                    setShowLocation={setShowLocation}
                    shippingAddresses={shippingAddresses}
                    handleCloseChooseShippingAddress={handleCloseChooseShippingAddress}
                    handleShowChooseShippingAddress={handleShowChooseShippingAddress}
                    openChooseShippingAddress={openChooseShippingAddress}
                    errors={errors}
                    shippingAddressSubmit={onSubmitShippingAddress}
                    defaultShippingAddress={defaultShippingAddress}
                    handleChooseShippingAddress={handleChooseShippingAddress}
                    handleUpdateShippingAddress={handleUpdateShippingAddress}
                    shippingAddress={shippingAddress}
                    actionShippingAddress={actionShippingAddress}
                    vendorShipment={vendorShipment}
                    courierServices={courierServices}
                    insurance={insurance}
                    handleClosePayment={handleClosePayment}
                    openPayment={openPayment}
                    handleOpenPayment={handleOpenPayment}
                    openBilingDetail={openBilingDetail}
                    handleCloseBillingDetail={handleCloseBillingDetail}
                    handleOpenBillingDetail={handleOpenBillingDetail}
                    shippingMethod={shippingMethod}
                    openPaymentMethod={openPaymentMethod}
                    handleClosePaymentMethod={handleClosePaymentMethod}
                    handleOpenPaymentMethod={handleOpenPaymentMethod}
                    openPaymentVirtualAccount={openPaymentVirtualAccount}
                    handleClosePaymentVirtualAccount={handleClosePaymentVirtualAccount}
                    handleOpenPaymentVirtualAccount={handleOpenPaymentVirtualAccount}
                    virtualAccount={virtualAccount}
                    shippingMethodEtd={shippingMethodEtd}
                    handlePay={handlePay}
                    handlePayCreditCard={handlePayCreditCard}
                    handleClosePaymentCreditCard={handleClosePaymentCreditCard}
                    openPaymentCreditCard={openPaymentCreditCard}
                    handleOpenPaymentCreditCard={handleOpenPaymentCreditCard}
                    redirectUrl={redirectUrl}
                    openFrame={openFrame}
                    orderNumberPayment={orderNumberPayment}
                    handleClosePaymentInstallment={handleClosePaymentInstallment}
                    openPaymentInstallment={openPaymentInstallment}
                    handleOpenPaymentInstallment={handleOpenPaymentInstallment}
                    handleConfirmInstallmentBank={handleConfirmInstallmentBank}
                    handleConfirmInstallmentTenor={handleConfirmInstallmentTenor}
                    installmentBank={installmentBank}
                    installmentTenor={installmentTenor}
                    openPaymentInstallmentForm={openPaymentInstallmentForm}
                    handleClosePaymentInstallmentForm={handleClosePaymentInstallmentForm}
                    handleConfirmInstallment={handleConfirmInstallment}
                    handlePayInstallment={handlePayInstallment}
                    mustInsurance={mustInsurance}
                />
                <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
                <BackDropLoading open={backDrop} />
            </div>
        </Suspense>
    );
};

export default Checkout;