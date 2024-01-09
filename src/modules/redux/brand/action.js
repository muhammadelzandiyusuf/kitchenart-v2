import actionType from "./actionType";

export const getBrand = (brand) => ({
    type: actionType.GET_BRAND,
    data: brand
});

export const getTopBrand = (topBrand) => ({
    type: actionType.GET_TOP_BRAND,
    data: topBrand
});

export const getBrandCategory = (category) => ({
    type: actionType.GET_BRAND_CATEGORY,
    data: category
});

