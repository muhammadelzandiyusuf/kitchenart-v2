import actionType from "./actionType";
import { updateObject } from 'utils';

const initialState = {
    locale: localStorage.getItem('language') ? localStorage.getItem('language') : 'id'
};

const postLocaleLanguage = (state, action) => {
    if (action.data) {
        localStorage.setItem('language', action.data);
    };
    return updateObject(state, {
        locale: action.data
    });
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.POST_LOCALE_LANGUAGE: return postLocaleLanguage(state, action);
        default: return state;
    };
};

export default languageReducer;