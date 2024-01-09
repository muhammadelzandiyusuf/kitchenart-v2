import actionType from "./actionType";
import { updateObject } from 'utils';

const initialState = {
    vendors: [],
};

const getShipmentVendor = (state, action) => {
    return updateObject(state, {
        vendors: action.data?.axiosResponse?.data
    });
};

const shipmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_SHIPMENT_VENDOR: return getShipmentVendor(state, action);
        default: return state;
    };
};

export default shipmentReducer;