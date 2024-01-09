import actionType from "./actionType";

export const postLocaleLanguage = (locale) => ({
    type: actionType.POST_LOCALE_LANGUAGE,
    data: locale
});