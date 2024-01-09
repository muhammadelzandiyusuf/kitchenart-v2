import { API } from 'configs';
import { handleAsync } from 'utils';
import {store, getShipmentVendor} from 'modules';

const { dispatch } = store;

export const getShipmentVendors = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getShipment(payload));
    if (err) throw err;

    const data = res;
    dispatch(getShipmentVendor(data));

    return data;
};

export const postShipmentTariffs = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postShipment(payload));
    if (err) throw err;

    const data = res;

    return data;
};

