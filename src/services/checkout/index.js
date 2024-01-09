import { API } from 'configs';
import { handleAsync } from 'utils';
import {store, getShippingAddress} from 'modules';

const { dispatch } = store;

export const postShippingAddress = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postShippingAddress(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const getShippingAddresses = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getShippingAddress(payload));
    if (err) throw err;

    const data = res;
    dispatch(getShippingAddress(data));

    return data;
};

export const updateShippingAddress = async (payload = {}) => {
    const [res, err] = await handleAsync(API.updateShippingAddress(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const patchCheckouts = async (payload = {}) => {
    const [res, err] = await handleAsync(API.patchCheckout(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const postCheckouts = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postCheckout(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const postPayments = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postPayment(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const getCustomerOrders = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getCustomerOrder(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const deleteShippingAddress = async (payload = {}) => {
    const [res, err] = await handleAsync(API.deleteShippingAddress(payload));
    if (err) throw err;

    const data = res;

    return data;
}