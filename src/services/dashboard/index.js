import { API } from 'configs';
import { handleAsync } from 'utils';

export const getAnnouncements = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getAnnouncement(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const getHistoryProducts = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getProductList(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const getReferralPrograms = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getReferralProgram(payload));
    if(err) throw err;

    const data = res;

    return data;
};

export const getHistoryOrder = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getHistoryOrder(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const headHistoryOrder = async (payload = {}) => {
    const [res, err] = await handleAsync(API.headHistoryOrder(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getCommissions = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getCommission(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getCommissionHistories = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getCommissionHistory(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const postCommissionWithdraws = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postCommissionWithdraw(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getHistoryOrderItem = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getHistoryOrderItem(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const optionsHistoryOrderItem = async (payload = {}) => {
    const [res, err] = await handleAsync(API.optionHistoryOrderItem(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const postProductReview = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postProductReview(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getOrderComplaint = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getOrderComplaint(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const optionsOrderComplaint = async (payload = {}) => {
    const [res, err] = await handleAsync(API.optionOrderComplaint(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getOrderCancellation = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getOrderCancellation(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const postOrderComplaint = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postOrderComplaint(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const postOrderCancellations = async (payload = {}) => {
    const [res, err] = await handleAsync(API.postOrderCancel(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getOrders = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getOrder(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const headOrderCancellation = async (payload = {}) => {
    const [res, err] = await handleAsync(API.headOrderCancellation(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const optionHistoryOrderItem = async (payload = {}) => {
    const [res, err] = await handleAsync(API.optionHistoryOrderItem(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const optionOrderCancellation = async (payload = {}) => {
    const [res, err] = await handleAsync(API.optionOrderCancellation(payload));
    if (err) throw err;

    const data = res;

    return data;
};

export const getTrackingOrder = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getTrackingOrder(payload));
    if (err) throw err;

    const data = res;

    return data;
};