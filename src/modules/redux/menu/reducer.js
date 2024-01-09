import actionType from "./actionType";
import { updateObject } from 'utils';

const initialState = {
    menu: false,
    mobileMenuPrimary: false,
    mobileMenuSecondary: false,
    mobileMenuChild: false,
    mobileMenuSubChild: false,
    title: null,
    titleChild: null,
    titleSubChild: null,
};

const postShowMenu = (state, action) => {
    return updateObject(state, {
        menu: !state.menu
    });
};

const postCloseMenu = (state, action) => {
    return updateObject(state, {
        menu: false
    });
};

const postShowMenuMobilePrimary = (state, action) => {
    return updateObject(state, {
        mobileMenuPrimary: true,
        mobileMenuChild: false,
        mobileMenuSecondary: false,
        mobileMenuSubChild: false
    });
};

const postShowMenuMobileSecondary = (state, action) => {
    return updateObject(state, {
        mobileMenuSecondary: true,
        mobileMenuChild: false,
        mobileMenuPrimary: false,
        mobileMenuSubChild: false,
        title: action.data
    });
};

const postShowMenuMobileChild = (state, action) => {
    return updateObject(state, {
        mobileMenuChild: true,
        mobileMenuPrimary: false,
        mobileMenuSecondary: false,
        mobileMenuSubChild: false,
        titleChild: action.data,
    });
};

const postShowMenuMobileSubChild = (state, action) => {
    return updateObject(state, {
        mobileMenuSubChild: true,
        mobileMenuChild: false,
        mobileMenuPrimary: false,
        mobileMenuSecondary: false,
        titleSubChild: action.data,
    });
};

const postCloseMenuMobile = (state, action) => {
    return updateObject(state, {
        mobileMenuPrimary: false,
        mobileMenuSecondary: false,
        mobileMenuChild: false,
        mobileMenuSubChild: false,
    });
};

const postBackMenuMobileSecondary = (state, action) => {
    return updateObject(state, {
        mobileMenuSecondary: true,
        mobileMenuChild: false,
        mobileMenuPrimary: false,
        mobileMenuSubChild: false,
        titleChild: state.titleChild
    });
};

const postBackMenuMobilePrimary = (state, action) => {
    return updateObject(state, {
        mobileMenuSecondary: true,
        mobileMenuChild: false,
        mobileMenuPrimary: false,
        mobileMenuSubChild: false,
        title: state.title
    });
};

const postBackMenuMobileChild = (state, action) => {
    return updateObject(state, {
        mobileMenuChild: true,
        mobileMenuSubChild: false,
        mobileMenuSecondary: false,
        mobileMenuPrimary: false,
        titleSubChild: state.titleSubChild
    });
};

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.POST_MENU_SHOW: return postShowMenu(state, action);
        case actionType.POST_MENU_CLOSE: return postCloseMenu(state, action);
        case actionType.POST_MENU_SHOW_MOBILE_PRIMARY: return postShowMenuMobilePrimary(state, action);
        case actionType.POST_MENU_SHOW_MOBILE_SECONDARY: return postShowMenuMobileSecondary(state, action);
        case actionType.POST_MENU_SHOW_MOBILE_CHILD: return postShowMenuMobileChild(state, action);
        case actionType.POST_MENU_CLOSE_MOBILE: return postCloseMenuMobile(state, action);
        case actionType.POST_MENU_SHOW_MOBILE_SUB_CHILD: return postShowMenuMobileSubChild(state, action);
        case actionType.POST_BACK_SECONDARY_MENU: return postBackMenuMobileSecondary(state, action);
        case actionType.POST_BACK_PRIMARY_MENU: return postBackMenuMobilePrimary(state, action);
        case actionType.POST_BACK_CHILD_MENU: return postBackMenuMobileChild(state, action);
        default: return state;
    }
};

export default menuReducer;