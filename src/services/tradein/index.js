import { API } from 'configs';
import { handleAsync } from 'utils';

export const getTradeInContents = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getTradeinContent(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const optionsTradeInRequests = async (payload = {}) => {
    const [res, err] = await handleAsync(API.optionTradeinRequest(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const postTradeInRequests = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postTradeinRequest(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const getTradeInRequests = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getTradeinRequest(payload));
    if (err) throw err;

    const data = res;
    return data;
};