import actionType from "./actionType";
import {updateObject} from "utils";

const initialState = {
    totalCart: localStorage.getItem('totalCart') ? localStorage.getItem('totalCart') : 0,
};

const getCart = (state, action) => {
    let total = 0;
    if (action.data?.axiosResponse?.status === 200) {
        const data = action.data?.axiosResponse?.data;
        total = data?.quantity;
        localStorage.setItem('totalCart', total);
    };
    return updateObject(state, {
        totalCart: total
    });
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_CART: return getCart(state, action);
        default: return state;
    }
};

export default cartReducer;