import { store, postLocaleLanguage } from 'modules';

const { dispatch } = store;

export const postLanguage = async (payload = '') => {
    await dispatch(postLocaleLanguage(payload));
    return payload;
};