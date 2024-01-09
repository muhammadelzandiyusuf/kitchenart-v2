import {
    store,
    postShowMenu,
    postCloseMenu,
    postShowMenuMobilePrimary,
    postShowMenuMobileSecondary,
    postShowMenuMobileChild,
    postShowMenuMobileSubChild,
    postCloseMenuMobile,
    postBackMenuSecondary,
    postBackMenuPrimary,
    postBackMenuChild
} from 'modules';

const { dispatch } = store;

export const postShowMenuNavbar = async () => {
    await dispatch(postShowMenu());
};

export const postCloseMenuNavbarPrimary = async () => {
    await dispatch(postCloseMenu());
};

export const postShowMenuNavbarPrimary = async () => {
    await dispatch(postShowMenuMobilePrimary());
};

export const postShowMenuNavbarSecondary = async (title = '') => {
    await dispatch(postShowMenuMobileSecondary(title));
    return title;
};

export const postShowMenuNavbarChild = async (title = '') => {
    await dispatch(postShowMenuMobileChild(title));
    return title;
};

export const postShowMenuNavbarSubChild = async (title = '') => {
    await dispatch(postShowMenuMobileSubChild(title));
    return title;
};

export const postCloseMenuNavbar = async () => {
    await dispatch(postCloseMenuMobile());
};

export const postBackMenuNavbarSecondary = async () => {
    await dispatch(postBackMenuSecondary());
};

export const postBackMenuNavbarPrimary = async () => {
    await dispatch(postBackMenuPrimary());
};

export const postBackMenuNavbarChild = async () => {
    await dispatch(postBackMenuChild());
};