import { API } from 'configs';
import { handleAsync } from 'utils';

export const getBanners = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getBanner(payload));
    if (err) {
        throw err;
    }

    const data = res;

    return data;
};