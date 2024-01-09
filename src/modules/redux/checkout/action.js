import actionType from "./actionType";

export const getShippingAddress = (shippingAddress) => ({
    type: actionType.GET_SHIPPING_ADDRESS,
    data: shippingAddress
});