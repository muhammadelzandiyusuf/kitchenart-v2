import actionType from "./actionType";

export const getBanner = (banner) => ({
    type: actionType.GET_BANNER,
    data: banner
});