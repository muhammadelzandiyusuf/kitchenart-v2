import actionType from "./actionType";

export const postProductView = (view) => ({
    type: actionType.POST_PRODUCT_VIEW,
    data: view
});

export const getProductList = (product) => ({
    type: actionType.GET_PRODUCT_LIST,
    data: product
});

export const getProductDetail = (product) => ({
    type: actionType.GET_PRODUCT_DETAIL,
    data: product
});

export const getProductLink = (product) => ({
    type: actionType.GET_PRODUCT_LINK,
    data: product
});

export const getProductDiscussion = (product) => ({
    type: actionType.GET_PRODUCT_DISCUSSION,
    data: product
});

export const getProductPackage = (product) => ({
    type: actionType.GET_PRODUCT_PACKAGE,
    data: product
});