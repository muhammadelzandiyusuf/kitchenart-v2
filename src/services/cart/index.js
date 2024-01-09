import { API } from 'configs';
import { handleAsync } from 'utils';
import {store, getCart} from 'modules';

const { dispatch } = store;

export const postCartItem = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postCartItem(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const getCarts = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getCart(payload));
    if(err) throw err;

    const data = res;
    dispatch(getCart(data));

    return data;
};

export const deleteCartItem = async (payload = {}) => {
    const [res, err] = await handleAsync(API.deleteCartItem(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const updateCartItems = async (payload = {}) => {
    const [res, err] = await handleAsync(API.updateCartItem(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const deleteCarts = async (payload = {}) => {
    const [res, err] = await handleAsync(API.deleteCart(payload));
    if(err) throw err;

    const data = res;
    return data;
};