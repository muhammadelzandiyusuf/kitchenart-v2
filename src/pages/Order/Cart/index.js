import {React, Suspense, useState, useEffect, useHistory, useTranslation} from 'libraries';
import {
    getCarts,
    deleteCartItem,
    updateCartItems,
    postWishlistProduct,
    deleteCarts,
    headWishlistProduct
} from 'services';
import {getIdentityFromHref} from "utils";

import 'assets/scss/cart/cart.scss';
import 'assets/scss/button/button.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const CartOrganism = React.lazy(() => import('components/organisms/OderOrganism/CartOrganism'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const Cart = () => {

    const t = useTranslation();
    const access = localStorage.getItem('access');
    const history = useHistory();

    const [meta] = useState({
        title: 'KitchenArt - Cart',
        keyword: 'cart',
        description: 'cart'
    });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        type: 'success',
        message: null
    });
    const [isDelete, setIsDelete] = useState(false);
    const [carts, setCarts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [addNotes, setAddNotes] = useState([]);
    const [selectExtendedWarranty, setSelectExtendedWarranty] = useState([]);
    const [selectContractService, setSelectContractService] = useState([]);
    const [properties, setProperties] = useState([]);
    const [checkedExtendedWarranty, setCheckedExtendedWarranty] = useState([]);
    const [checkedContractService, setCheckedContractService] = useState([]);
    const [notesValue, setNotesValue] = useState([]);
    const [selectDelete, setSelectDelete] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            };
            getCarts(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setCarts(data);
                    setLoading(false);
                }
                else if (result?.axiosResponse?.status === 401) {
                    history.push('/login');
                }
                else{
                    history.push('/404');
                };
            });
        }
        else{
            history.push('/login');
        };
    }, [access, history])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };

    const handleSelectToDelete = () => {
        setIsDelete(!isDelete);
        setSelectDelete([]);
    };

    const handleDeleteCartItem = (href) => {
        setBackDrop(true);
        const slug = getIdentityFromHref(href);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: slug
        };
        deleteCartItem(payload).then(response => {
            setSnackbar({type: 'success', message: t('message.successDeleteCartItem')});
            setOpen(true);
            const payloadCart = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            };
            getCarts(payloadCart).then(result => {
                setBackDrop(false);
                if (result?.axiosResponse?.status === 200) {
                    setCarts(result?.axiosResponse?.data);
                };
            });
        });
    };

    const handleQuantity = (type, qty, maxQty, href) => {
        setBackDrop(true);
        const slug = getIdentityFromHref(href);
        if (type === 'plus') {
            if (qty < maxQty) {
                const quantity = qty + 1;
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    path: slug,
                    body: {
                        quantity: quantity
                    }
                };
                updateCartItems(payload).then(response => {
                    const payloadCart = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                    };
                    getCarts(payloadCart).then(result => {
                        setBackDrop(false);
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data
                            setCarts(data);
                        };
                    });
                });
            }
            else{
                setSnackbar({type: 'warning', message: t('message.maxQuantityCart')});
                setOpen(true);
                setBackDrop(false);
            };
        }
        else{
            if (qty !== 1) {
                const quantity = qty - 1;
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    path: slug,
                    body: {
                        quantity: quantity
                    }
                };
                updateCartItems(payload).then(response => {
                    const payloadCart = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                    };
                    getCarts(payloadCart).then(result => {
                        setBackDrop(false);
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data
                            setCarts(data);
                        };
                    });
                });
            }
            else {
                setBackDrop(false);
            };
        };
    };

    const handleMoveToWishlist = (productHref, href) => {
        setBackDrop(true);
        const slug = getIdentityFromHref(href);
        const payload = {
            headers: {
                'Authorization': access
            },
            body: {
                product: `${productHref}`
            }
        };
        postWishlistProduct(payload).then(result => {
            if (result.message) {
                setSnackbar({type: 'error', message: result.message});
                setOpen(true);
                setBackDrop(false);
            }
            else{
                const payloadDelete = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    path: slug
                };
                deleteCartItem(payloadDelete).then(response => {
                    setSnackbar({type: 'success', message: t('message.successWishlist')});
                    setOpen(true);
                    const payloadCart = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                    };
                    getCarts(payloadCart).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            setCarts(result?.axiosResponse?.data);
                            const payloadWishlist = {
                                headers: {
                                    'Authorization': access,
                                    'Cache-Control': 'no-cache'
                                },
                            };
                            headWishlistProduct(payloadWishlist);
                            setBackDrop(false);
                        };
                    });
                });
            };
        });
    };

    const handleAddNotes = (href) => {
        const slug = getIdentityFromHref(href);
        let array = [...addNotes];
        const data = array.find((id) => id === slug);
        if (data === undefined) {
            array.push(slug);
            setAddNotes(array);
        };
    };

    const handleCancelAddNotes = (href) => {
        const slug = getIdentityFromHref(href);
        const array = [...addNotes];
        const currentIndex = array.indexOf(slug);
        array.splice(currentIndex, 1);
        setAddNotes(array);
    };

    const handleCheckedExtendedWarranty = (event, href) => {
        const slug = getIdentityFromHref(href);
        let arrayValue = [...selectExtendedWarranty];
        let array = [...checkedExtendedWarranty];
        let arrayProperties = [...properties];
        if (event.target.checked === true) {
            const data = array.find((item) => item.id === slug);
            if (data === undefined) {
                const warranty = { id: slug, warranty: true };
                const select = {id: slug, value: ''};

                arrayValue.push(select);
                setSelectExtendedWarranty(arrayValue);

                array.push(warranty);
                setCheckedExtendedWarranty(array);
            };
        }
        else{
            const currentIndex = array.findIndex((item) => item.id === slug);
            if (currentIndex !== -1) {
                array.splice(currentIndex, 1);
                setCheckedExtendedWarranty(array);
            };

            const currentSelectIndex = arrayValue.findIndex((item) => item.id === slug);
            if (currentSelectIndex !== -1) {
                arrayValue[currentSelectIndex] = {...arrayValue[currentSelectIndex], value: ''};
                setSelectExtendedWarranty(arrayValue);
            };

            const currentIndexProperty = arrayProperties.findIndex((item) => item.id === slug && item.type === 'extended_warranty');
            if (currentIndexProperty !== -1) {
                arrayProperties.splice(currentIndexProperty, 1);
                setProperties(arrayProperties);

                const filter =  arrayProperties.filter(function(property) {
                    return property.id === slug;
                });
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    path: slug,
                    body: {
                        properties: {
                            services: filter
                        }
                    }
                };
                updateCartItems(payload).then(response => {
                    const payloadCart = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                    };
                    getCarts(payloadCart).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data
                            setCarts(data);
                        };
                    });
                });
            };
        };
    };

    const handleChangeValueExtendedWarranty = (event, href) => {
        setBackDrop(true);
        const slug = getIdentityFromHref(href);
        let arrayProperties = [];
        if (carts?.lineItems?.length > 0) {
            carts.lineItems.forEach(item => {
               if (item?.properties?.services?.length > 0) {
                   item.properties.services.forEach(service => {
                       arrayProperties.push(service);
                   });
               };
            });
        };

        let arrayValue = [...selectExtendedWarranty];
        let array = [...arrayProperties];

        const data = { href: event.target.value, id: slug, type: 'extended_warranty' };
        const warranty = array.find((item) => item.id === slug && item.type === 'extended_warranty');
        if (warranty !== undefined) {
            const indexProperties = array.findIndex((item) => item.id === slug && item.type === 'extended_warranty');
            array[indexProperties] = {...array[indexProperties], href: event.target.value};
        }
        else{
            array.push(data);
        };

        const index = arrayValue.findIndex((item) => item.id === slug);
        arrayValue[index] = {...arrayValue[index], value: event.target.value};
        setSelectExtendedWarranty(arrayValue);
        setProperties(array);

        const filter =  array.filter(function(property) {
            return property.id === slug;
        });
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: slug,
            body: {
                properties: {
                    services: filter
                }
            }
        };
        updateCartItems(payload).then(response => {
            const payloadCart = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            };
            getCarts(payloadCart).then(result => {
                setBackDrop(false);
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setCarts(data);
                };
            });
        });
    };

    const handleChangeValueContractService = (event, href) => {
        setBackDrop(true);
        const slug = getIdentityFromHref(href);
        let arrayProperties = [];
        if (carts?.lineItems?.length > 0) {
            carts.lineItems.forEach(item => {
                if (item?.properties?.services?.length > 0) {
                    item.properties.services.forEach(service => {
                        arrayProperties.push(service);
                    });
                };
            });
        };

        let arrayValue = [...selectContractService];
        let array = [...arrayProperties];

        const data = { href: event.target.value, id: slug, type: 'contract_service' };
        const service = array.find((item) => item.id === slug  && item.type === 'contract_service');
        if (service !== undefined) {
            const indexProperties = array.findIndex((item) => item.id === slug && item.type === 'contract_service');
            array[indexProperties] = {...array[indexProperties], href: event.target.value};
        }
        else{
            array.push(data);
        };

        const index = arrayValue.findIndex((item) => item.id === slug);
        arrayValue[index] = {...arrayValue[index], value: event.target.value};
        setSelectContractService(arrayValue);
        setProperties(array);

        const filter =  array.filter(function(property) {
            return property.id === slug;
        });
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: slug,
            body: {
                properties: {
                    services: filter
                }
            }
        };
        updateCartItems(payload).then(response => {
            const payloadCart = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            };
            getCarts(payloadCart).then(result => {
                setBackDrop(false);
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data
                    setCarts(data);
                };
            });
        });
    };

    const handleCheckedContractService = (event, href) => {
        const slug = getIdentityFromHref(href);
        let arrayValue = [...selectContractService];
        let array = [...checkedContractService];
        let arrayProperties = [...properties];
        if (event.target.checked === true) {
            const data = array.find((item) => item.id === slug);
            if (data === undefined) {
                const service = { id: slug, warranty: true };
                const select = {id: slug, value: ''};

                arrayValue.push(select);
                setSelectContractService(arrayValue);

                array.push(service);
                setCheckedContractService(array);
            };
        }
        else{
            const currentIndex = array.findIndex((item) => item.id === slug);
            array.splice(currentIndex, 1);
            setCheckedContractService(array);

            const currentSelectIndex = arrayValue.findIndex((item) => item.id === slug);
            arrayValue[currentSelectIndex] = {...arrayValue[currentSelectIndex], value: ''};
            setSelectContractService(arrayValue);

            const currentIndexProperty = arrayProperties.findIndex((item) => item.id === slug && item.type === 'contract_service');
            if (currentIndexProperty !== -1) {
                arrayProperties.splice(currentIndexProperty, 1);
                setProperties(arrayProperties);

                const filter =  arrayProperties.filter(function(property) {
                    return property.id === slug;
                });
                const payload = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                    path: slug,
                    body: {
                        properties: {
                            services: filter
                        }
                    }
                };
                updateCartItems(payload).then(response => {
                    const payloadCart = {
                        headers: {
                            'Authorization': access,
                            'Cache-Control': 'no-cache'
                        },
                    };
                    getCarts(payloadCart).then(result => {
                        if (result?.axiosResponse?.status === 200) {
                            const data = result?.axiosResponse?.data
                            setCarts(data);
                        };
                    });
                });
            };
        };
    };

    const handleUncheckedWarranty = (type, item) => {
        setBackDrop(true);
        let arrayValue = null;
        let arrayChecked = null;
        if (type === 'extended_warranty') {
            arrayValue = [...selectExtendedWarranty]
            arrayChecked = [...checkedExtendedWarranty];
        }
        else{
            arrayValue = [...selectContractService];
            arrayChecked = [...checkedContractService];
        };
        let arrayProperties = [...properties];

        let array = [...item];
        const data = array.find((warranty) => warranty.type === type);
        const index = array.findIndex((warranty) => warranty.type === type);
        if (index !== -1) {
            array.splice(index, 1);
            const payload = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
                path: data?.id,
                body: {
                    properties: {
                        services: array
                    }
                }
            };
            updateCartItems(payload).then(response => {
                const payloadCart = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                };
                getCarts(payloadCart).then(result => {
                    setBackDrop(false);
                    if (result?.axiosResponse?.status === 200) {
                        const dataCart = result?.axiosResponse?.data
                        setCarts(dataCart);

                        const currentIndex = arrayChecked.findIndex((item) => item.id === data?.id);
                        const currentSelectIndex = arrayValue.findIndex((item) => item.id === data?.id);
                        const currentIndexProperty = arrayProperties.findIndex((item) => item.id === data?.id && item.type === type);
                        if (type === 'extended_warranty') {
                            if (currentIndex !== -1) {
                                arrayChecked.splice(currentIndex, 1);
                                setCheckedExtendedWarranty(arrayChecked);
                            };
                            if (currentSelectIndex !== -1) {
                                arrayValue[currentSelectIndex] = {...arrayValue[currentSelectIndex], value: ''};
                                setSelectExtendedWarranty(arrayValue);
                            };
                        }
                        else{
                            if (currentIndex !== -1) {
                                arrayChecked.splice(currentIndex, 1);
                                setCheckedContractService(arrayChecked);
                            };
                            if (currentSelectIndex !== -1) {
                                arrayValue[currentSelectIndex] = {...arrayValue[currentSelectIndex], value: ''};
                                setSelectContractService(arrayValue);
                            };
                        };
                        if (currentIndexProperty !== -1) {
                            arrayProperties.splice(currentIndexProperty, 1);
                            setProperties(arrayProperties);
                        };
                    };
                });
            });
        };
    };

    const handleSubmitNotes = (data) => {
        setBackDrop(true);
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: data.id,
            body: {
                properties: {
                    notes: data[`notes${data.id}`] !== '' ? data[`notes${data.id}`] : null
                }
            }
        };
        updateCartItems(payload).then(response => {
            const payloadCart = {
                headers: {
                    'Authorization': access,
                    'Cache-Control': 'no-cache'
                },
            };
            getCarts(payloadCart).then(result => {
                setBackDrop(false);
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data
                    setCarts(data);

                    const array = [...addNotes];
                    const currentIndex = array.indexOf(data.id);
                    array.splice(currentIndex, 1);
                    setAddNotes(array);
                };
            });
        });
    };

    const handleChangeNotes = (id, notes) => {
        let array = [...notesValue];
        const data = { notes: notes, id: id };
        const note = array.find((item) => item.id === id );
        if (note !== undefined) {
            const indexProperties = array.findIndex((item) => item.id === id);
            array[indexProperties] = {...array[indexProperties], notes: notes};
        }
        else{
            array.push(data);
        };
        setNotesValue(array);

        let arrayShow = [...addNotes];
        const dataShow = arrayShow.find((item) => item === id);
        if (dataShow === undefined) {
            arrayShow.push(id);
            setAddNotes(arrayShow);
        };
    };

    const handleSelectAll = (event) => {
        let array = [...selectDelete];
        if (event.target.checked === true) {
            if (carts.lineItems?.length > 0) {
                carts.lineItems?.forEach(cart => {
                   const data = {href: cart.href};
                   array.push(data);
                   setSelectDelete(array);
                });
            };
        }
        else {
            setSelectDelete([]);
        };
    };

    const handleDeleteDialog = () => {
        if (selectDelete?.length > 0) {
            setOpenDialog(true);
        }
        else {
            setSnackbar({type: 'warning', message: t('message.noProductSelected')});
            setOpen(true);
        };
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteCarts = () => {
        const payload = {
            headers: {
                'Authorization': access,
                'Cache-Control': 'no-cache'
            },
            path: 'delete-item',
            body: selectDelete
        };
        deleteCarts(payload).then(response => {
            if (response.message) {
                setSnackbar({type: 'error', message: response.message});
                setOpen(true);
            }
            else{
                setSnackbar({type: 'success', message: t('message.successDeleteProduct')});
                setOpen(true);
                const payloadCart = {
                    headers: {
                        'Authorization': access,
                        'Cache-Control': 'no-cache'
                    },
                };
                getCarts(payloadCart).then(result => {
                    if (result?.axiosResponse?.status === 200) {
                        const data = result?.axiosResponse?.data
                        setCarts(data);
                        setIsDelete(false);
                        setOpenDialog(false);
                    };
                });
            };
        });
    };

    const handleSelectProductToDelete = (href) => {
        const array = [...selectDelete];
        const index = array.findIndex((item) => item.href === href);
        if (index !== -1) {
            array.splice(index, 1);
        }
        else{
            const data = {href: href};
            array.push(data);
        };
        setSelectDelete(array);
    };

    const handleToCheckout = () => {
        setBackDrop(true);
        let valid = true;
        let message = null;
        if (carts?.lineItems?.length > 0) {
            carts?.lineItems.forEach(item => {
                if (item.isValid === false) {
                    valid = false;
                    message = item.message;
                };
            });
            if (!valid) {
                setBackDrop(false);
                setSnackbar({type: 'error', message: message});
                setOpen(true);
            }
            else {
                history.push('/checkout');
            }
        }
        else {
            setBackDrop(false);
            setSnackbar({type: 'error', message: t('message.thereIsNoProduct')});
            setOpen(true);
        };
    };

    const handleToProductDetail = (structure, href) => {
        if (structure === 'stand_alone') {
            history.push(`/product/${href}`);
        }
        else {
            history.push(`/product/package-deals/${href}`);
        }
    };

    return (
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <div className={'product__detail'}>
                <CartOrganism
                    cart={carts}
                    isDelete={isDelete}
                    handleSelectToDelete={handleSelectToDelete}
                    handleDeleteCartItem={handleDeleteCartItem}
                    handleQuantity={handleQuantity}
                    openDialog={openDialog}
                    handleCloseDialog={handleCloseDialog}
                    handleMoveToWishlist={handleMoveToWishlist}
                    addNotes={addNotes}
                    handleAddNotes={handleAddNotes}
                    handleCancelAddNotes={handleCancelAddNotes}
                    selectExtendedWarranty={selectExtendedWarranty}
                    selectContractService={selectContractService}
                    handleChangeValueExtendedWarranty={handleChangeValueExtendedWarranty}
                    handleCheckedExtendedWarranty={handleCheckedExtendedWarranty}
                    handleChangeValueContractService={handleChangeValueContractService}
                    handleCheckedContractService={handleCheckedContractService}
                    checkedExtendedWarranty={checkedExtendedWarranty}
                    checkedContractService={checkedContractService}
                    handleUncheckedWarranty={handleUncheckedWarranty}
                    handleSubmitNotes={handleSubmitNotes}
                    handleChangeNotes={handleChangeNotes}
                    notesValue={notesValue}
                    selectDelete={selectDelete}
                    handleSelectAll={handleSelectAll}
                    handleDeleteDialog={handleDeleteDialog}
                    handleDeleteCarts={handleDeleteCarts}
                    handleSelectProductToDelete={handleSelectProductToDelete}
                    loading={loading}
                    handleToCheckout={handleToCheckout}
                    handleToProductDetail={handleToProductDetail}
                />
            </div>
            <BackDropLoading open={backDrop} />
        </Suspense>
    );
};

export default Cart;