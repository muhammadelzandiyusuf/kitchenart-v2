import { API } from 'configs';
import { handleAsync } from 'utils';
import {store, headWishlist} from 'modules';

const { dispatch } = store;

export const getWishlistProduct = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getWishlist(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const headWishlistProduct = async (payload = {}) => {
    const [res, err] = await handleAsync(API.headWishlist(payload));
    if(err) throw err;

    const data = res;
    dispatch(headWishlist(data));

    return data;
};

export const postWishlistProduct = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postWishlist(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const deleteWishlistProduct = async (payload = {}) => {
    const [res, err] = await handleAsync(API.deleteWishlist(payload));
    if(err) throw err;

    const data = res;
    return data;
};