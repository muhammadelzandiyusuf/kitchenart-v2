import actionType from "./actionType";
import {getIdentityFromHref, updateObject} from 'utils';

const initialState = {
    productView: 15,
    products: {
        data: [],
        meta: {
            filtering: [],
            ordering: [],
            paginating: {
                links: []
            }
        }
    },
    productDetail: [],
    etag: localStorage.getItem('etag') ? localStorage.getItem('etag') : null,
    productLinks: [],
    productDiscussions: [],
    productPackage: [],
};

const postProductView = (state, action) => {
    return updateObject(state, {
        productView: action.data
    });
};

const getProductList = (state, action) => {
    return updateObject(state, {
        products: action.data?.axiosResponse?.data
    });
};

const getProductDetail = (state, action) => {
    return updateObject(state, {
        productDetail: action.data['data'],
    });
};

const getProductLink = (state, action) => {
    return updateObject(state, {
        productLinks: action.data?.axiosResponse?.data
    });
};

const getProductDiscussion = (state, action) => {
    return updateObject(state, {
        productDiscussions: action.data?.axiosResponse?.data
    });
};

const getProductPackage = (state, action) => {
    const href = getIdentityFromHref(action.data?.href);
    localStorage.setItem('product', href);
    return updateObject(state, {
        productPackage: action.data?.axiosResponse?.data
    });
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.POST_PRODUCT_VIEW: return postProductView(state, action);
        case actionType.GET_PRODUCT_LIST: return getProductList(state, action);
        case actionType.GET_PRODUCT_DETAIL: return getProductDetail(state, action);
        case actionType.GET_PRODUCT_LINK: return getProductLink(state, action);
        case actionType.GET_PRODUCT_DISCUSSION: return getProductDiscussion(state, action);
        case actionType.GET_PRODUCT_PACKAGE: return getProductPackage(state, action);
        default: return state;
    };
};

export default productReducer;