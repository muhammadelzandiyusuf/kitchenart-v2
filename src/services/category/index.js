import { API } from 'configs';
import { handleAsync } from 'utils';
import {store, getCategoryParent, getCategoryByParent, getCategorySubChild, getCategoryDetail, getCategoryList} from 'modules';

const { dispatch } = store;

export const getCategoryParents = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getParentCategory(payload));
    if (err) throw err;

    dispatch(getCategoryParent(res));
    return res;
};

export const getCategoriesByParent = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getParentCategory(payload));
    if (err) throw err;

    dispatch(getCategoryByParent(res, payload.slug));
    return res;
};

export const getCategoriesSubChilds = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getParentCategory(payload));
    if (err) throw err;

    dispatch(getCategorySubChild(res));
    return res;
};

export const getCategoryDetails = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getParentCategory(payload));
    if (err) throw err;

    dispatch(getCategoryDetail(res));
    return res;
};

export const getCategoriesList = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getParentCategory(payload));
    if (err) throw err;

    dispatch(getCategoryList(res));
    return res;
};

export const getChildCategories = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getParentCategory(payload));
    if (err) throw err;

    return res;
};