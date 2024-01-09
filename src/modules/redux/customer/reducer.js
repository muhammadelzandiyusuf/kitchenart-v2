import actionType from "./actionType";
import { updateObject } from 'utils';

const initialState = {
    customer: [],
    dataLogin: null,
    dataRegister: []
};

const postLoginCustomer = (state, action) => {
    if (action.data.hasOwnProperty('access')) {
        localStorage.setItem('access', `Bearer ${action.data.access}`);
        localStorage.setItem('refresh', action.data.refresh);
    }
    return updateObject(state, {
        dataLogin: action.data
    });
};

const getAccessCustomer = (state) => {
    const data = {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh')
    };
    return updateObject(state, {
        dataLogin: data
    });
};

const postRegisterCustomer = (state, action) => {
    return updateObject(state, {
        dataRegister: action.data
    });
};

const postNewsletter = (state, action) => {
    return updateObject(state, {
        dataNewsletter: action.data
    });
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.POST_LOGIN: return postLoginCustomer(state, action);
        case actionType.GET_ACCESS: return getAccessCustomer(state);
        case actionType.POST_REGISTER: return postRegisterCustomer(state, action);
        case actionType.POST_NEWSLETTER: return postNewsletter(state, action);
        default: return state;
    }
};

export default customerReducer;