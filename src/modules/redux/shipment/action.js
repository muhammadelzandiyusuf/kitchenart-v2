import actionType from "./actionType";

export const getShipmentVendor = (vendor) => ({
    type: actionType.GET_SHIPMENT_VENDOR,
    data: vendor
});