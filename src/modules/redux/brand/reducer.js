import actionType from "./actionType";
import { updateObject, getIdentityFromHref } from 'utils';

const initialState = {
    brands: [],
    topBrand: [],
    logoBrand: '',
    slugBrand: '',
    category: [],
};

const getBrand = (state, action) => {
    return updateObject(state, {
        brands: action.data?.axiosResponse?.data
    });
};

const getTopBrand = (state, action) => {
    if (action.data?.axiosResponse?.data?.length > 0) {
        return updateObject(state, {
            topBrand: action.data?.axiosResponse?.data,
            logoBrand: action.data?.axiosResponse?.data[0]['logoImage'],
            slugBrand: getIdentityFromHref(action.data?.axiosResponse?.data[0]['href'])
        });
    }
    else {
        return state;
    };
};

const getBrandCategory = (state, action) => {
    return updateObject(state, {
        category: action.data?.axiosResponse?.data
    });
};

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_BRAND: return getBrand(state, action);
        case actionType.GET_BRAND_CATEGORY: return getBrandCategory(state, action);
        case actionType.GET_TOP_BRAND: return getTopBrand(state, action);
        default: return state;
    }
};

export default brandReducer;