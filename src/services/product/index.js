import { API } from 'configs';
import { handleAsync } from 'utils';
import {
    store,
    postProductView,
    getProductList,
    getProductDetail,
    getProductLink,
    getProductDiscussion,
    getProductPackage
} from 'modules';

const { dispatch } = store;

export const postProductViewList = async (payload = 0) => {
    await dispatch(postProductView(payload));
    return payload;
};

export const getProductLists = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProduct(payload));
    if (err) throw err;

    dispatch(getProductList(res));

    return res;
};

export const getProductDetails = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProductList(payload));
    if (err) throw err;

    dispatch(getProductDetail(res));

    return res;
};

export const postRequestStockAlert = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postProduct(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const postReportProduct = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postProduct(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const getProductLinks = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProductList(payload));
    if (err) throw err;

    const data = res;
    dispatch(getProductLink(data));

    return data;
};

export const getProductDiscussions = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProductDiscussion(payload));
    if (err) throw err;

    const data = res;
    dispatch(getProductDiscussion(data));

    return data;
};

export const postProductDiscussion = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postProductDiscussion(payload));
    if(err) throw err;

    const data = res;
    return data;
};

export const getProductPackages = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProductPackage(payload));
    if (err) throw err;

    const data = res;
    dispatch(getProductPackage(data));

    return data;
};

export const getProductAvailablePromotions = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProductPromotion(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const getOptionProductLists = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProductList(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const postShortLinks = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postShortLink(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getProductReviews = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProductReview(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const postCalculatePrice = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postProduct(payload));
    if(err) throw err;

    const data = res;
    return data;
};