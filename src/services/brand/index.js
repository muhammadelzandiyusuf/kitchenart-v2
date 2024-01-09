import { API } from 'configs';
import { handleAsync } from 'utils';
import {store, getBrand, getTopBrand, getBrandCategory} from 'modules';

const { dispatch } = store;

export const getBrands = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getBrand(payload));
    if (err) throw err;

    dispatch(getBrand(res));
    return res;
};

export const getTopBrands = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getBrand(payload));
    if (err) throw err;

    dispatch(getTopBrand(res));
    return res;
};

export const getBrandCategories = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getBrand(payload));
    if (err) throw err;

    dispatch(getBrandCategory(res));
    return res;
};

export const getBrandDetails = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getBrand(payload));
    if (err) throw err;

    return res;
};