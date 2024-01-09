import actionType from "./actionType";

export const getCart = (cart) => ({
    type: actionType.GET_CART,
    data: cart
});