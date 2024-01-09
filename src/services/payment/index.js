import { API } from 'configs';
import { handleAsync } from 'utils';
import {store, getSimulationInstallment, getCalculateInstallment} from 'modules';

const { dispatch } = store;

export const getSimulationInstallments = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getPayment(payload));
    if (err) throw err;

    const data = res;
    dispatch(getSimulationInstallment(data));

    return data;
};

export const getCalculateInstallments = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getPayment(payload));
    if (err) throw err;

    const data = res;
    dispatch(getCalculateInstallment(data));

    return data;
};
