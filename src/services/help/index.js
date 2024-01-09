import { API } from 'configs';
import { handleAsync } from 'utils';

export const getHelpCategory = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getHelpCategory(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const getHelpContent = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getHelpContent(payload));
    if(err) throw err;

    const data = res;

    return data;
};