import actionType from "./actionType";
import { updateObject } from 'utils';

const initialState = {
    banners: [],
};

const getBanner = (state, action) => {
    return updateObject(state, {
        banners: action.data
    });
};

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_BANNER: return getBanner(state, action);
        default: return state;
    }
};

export default bannerReducer;