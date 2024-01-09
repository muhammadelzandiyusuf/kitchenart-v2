import actionType from "./actionType";

export const postShowMenu = (menu) => ({
    type: actionType.POST_MENU_SHOW,
    data: menu,
});

export const postCloseMenu = () => ({
    type: actionType.POST_MENU_CLOSE,
});

export const postShowMenuMobilePrimary = () => ({
    type: actionType.POST_MENU_SHOW_MOBILE_PRIMARY,
});

export const postShowMenuMobileSecondary = (title) => ({
    type: actionType.POST_MENU_SHOW_MOBILE_SECONDARY,
    data: title,
});

export const postShowMenuMobileChild = (title) => ({
    type: actionType.POST_MENU_SHOW_MOBILE_CHILD,
    data: title,
});

export const postShowMenuMobileSubChild = (title) => ({
    type: actionType.POST_MENU_SHOW_MOBILE_SUB_CHILD,
    data: title,
});

export const postCloseMenuMobile = () => ({
    type: actionType.POST_MENU_CLOSE_MOBILE,
});

export const postBackMenuSecondary = () => ({
    type: actionType.POST_BACK_SECONDARY_MENU,
});

export const postBackMenuPrimary = () => ({
    type: actionType.POST_MENU_SHOW_MOBILE_PRIMARY,
});

export const postBackMenuChild= () => ({
    type: actionType.POST_BACK_CHILD_MENU,
});