import actionType from "./actionType";
import { updateObject } from 'utils';

const initialState = {
    categoryParent: [],
    categoryChild: [],
    categorySubChild: [],
    categoryDetail: [],
    slugParent: '',
};

const getCategoryParent = (state, action) => {
    return updateObject(state, {
        categoryParent: action.data?.axiosResponse?.data,
        slugParent: action.data?.axiosResponse?.data?.length > 0 ? action.data?.axiosResponse?.data[0]['fullSlug'] : ''
    });
};

const getCategoryByParent = (state, action) => {
    return updateObject(state, {
        categoryChild: action.data?.axiosResponse?.data?.children,
        slugParent: action.slug
    });
};

const getCategorySubChild = (state, action) => {
    return updateObject(state, {
        categorySubChild: action.data?.axiosResponse?.data?.children
    });
};

const getCategoryDetail = (state, action) => {
    return updateObject(state, {
        categoryDetail: action.data?.axiosResponse?.data
    });
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_CATEGORY_PARENT: return getCategoryParent(state, action);
        case actionType.GET_CATEGORY_BY_PARENT: return getCategoryByParent(state, action);
        case actionType.GET_CATEGORY_SUB_CHILD: return getCategorySubChild(state, action);
        case actionType.GET_CATEGORY_DETAIL: return getCategoryDetail(state, action);
        default: return state;
    }
};

export default categoryReducer;