import { API } from 'configs';
import { handleAsync } from 'utils';

export const getVouchers = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getVoucher(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const headVouchers = async (payload = {}) => {
    const [res, err] = await handleAsync(API.headVoucher(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const getVoucherTypes = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getVoucherType(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const getGiftVouchers = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getGiftVoucher(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const headGiftVouchers = async (payload = {}) => {
    const [res, err] = await handleAsync(API.headGiftVoucher(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const getCoupons = async (payload = {}) => {
    const [res, err] = await handleAsync(API.getCoupon(payload));
    if (err) throw err;

    const data = res;
    return data;
};

export const headCoupons = async (payload = {}) => {
    const [res, err] = await handleAsync(API.headCoupon(payload));
    if (err) throw err;

    const data = res;
    return data;
};