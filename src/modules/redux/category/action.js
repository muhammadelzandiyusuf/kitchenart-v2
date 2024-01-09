import actionType from "./actionType";

export const getCategoryParent = (category) => ({
    type: actionType.GET_CATEGORY_PARENT,
    data: category
});

export const getCategoryByParent = (category, slug) => ({
    type: actionType.GET_CATEGORY_BY_PARENT,
    data: category,
    slug: slug
});

export const getCategorySubChild = (category) => ({
    type: actionType.GET_CATEGORY_SUB_CHILD,
    data: category
});

export const getCategoryDetail = (url) => ({
    type: actionType.GET_CATEGORY_DETAIL,
    data: url
});

export const getCategoryList = (category) => ({
    type: actionType.GET_CATEGORY_LIST,
    data: category
})