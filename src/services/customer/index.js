import { API } from 'configs';
import { handleAsync } from 'utils';
import {store, postLogin, postRegister, postNewsletter} from 'modules';

const { dispatch } = store;

export const loginCustomer = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postLoginCustomer(payload));
    if(err) throw err;

    const data = res;

    dispatch(postLogin(data));
    return data;
};

export const registerCustomer = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postRegisterCustomer(payload));
    if (err) throw err;

    const data = res;

    dispatch(postRegister(data));
    return data;
};

export const newsletter = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postNewsletter(payload));
    if (err) throw err;

    const data = res;

    dispatch(postNewsletter(data));
    return data;
};

export const forgotPasswordCustomer = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postForgotPassword(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const registerLoginGoogle = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postRegisterLoginGoogle(payload));
    if(err) throw err;

    const data = res;
    dispatch(postLogin(data));

    return data;
};

export const registerLoginFacebook = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postRegisterLoginFacebook(payload));
    if(err) throw err;

    const data = res;
    dispatch(postLogin(data));

    return data;
};

export const verifyAccount = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postVerifyAccount(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getOtpVerification = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getOtpVerification(payload));
    if (err) throw err;

    const data = res;

    return data;
}

export const postOtpVerification = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postOtpVerification(payload));
    if (err) throw err;

    const data = res;

    return data;
}

export const businessPartner = async (payload = {}) => {
    const [res, err] = await handleAsync(API.optionsBusinessPartner(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const addressDestination = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getAddressDestination(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const registerBusinessPartner = async (payload = {}) => {
    if (payload.body.profile && payload.body.profile.documentIdentityFile === "") {
        delete payload.body.profile.documentIdentityFile
    }
    if (payload.body.profile && payload.body.profile.otherDocumentFile === "") {
        delete payload.body.profile.otherDocumentFile
    }
    const [res, err] = await handleAsync(API.postBusinessPartner(payload));
    if (err) throw err;

    const data = res;

    dispatch(postRegister(data));
    return data;
};

export const postProfileCustomers = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postCustomerProfile(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getProfileCustomers = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getCustomerProfile(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const optionProfileCustomers = async (payload = {}) => {
    const [res, err] = await handleAsync(API.optionCustomerProfile(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const patchProfileCustomers = async (payload = {}) => {
    const [res, err] = await handleAsync(API.patchCustomerProfile(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const putChangePasswordCustomer = async (payload = {}) => {
    const [res, err] = await handleAsync(API.putChangePassword(payload));
    if(err) throw err;

    const data = res;

    return data;
};