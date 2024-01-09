import actionType from "./actionType";
import {updateObject} from "utils";

const initialState = {
    totalWishlist: localStorage.getItem('totalWishlist') ? localStorage.getItem('totalWishlist') : 0,
};

const headWishlist = (state, action) => {
    let total = 0;
    if (action.data?.axiosResponse?.status === 200) {
        const data = action.data?.axiosResponse?.headers;
        total = data['x-total-results'];
        localStorage.setItem('totalWishlist', total);
    };
    return updateObject(state, {
        totalWishlist: total
    });
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.HEAD_WISHLIST: return headWishlist(state, action);
        default: return state;
    }
};

export default wishlistReducer;