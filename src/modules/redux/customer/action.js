import actionType from "./actionType";

export const postLogin = (customer) => ({
    type: actionType.POST_LOGIN,
    data: customer
});

export const getAccess = () => ({
   type: actionType.GET_ACCESS
});

export const postRegister = (customer) => ({
    type: actionType.POST_REGISTER,
    data: customer
});

export const postNewsletter = (customer) => ({
    type: actionType.POST_NEWSLETTER,
    data: customer
});