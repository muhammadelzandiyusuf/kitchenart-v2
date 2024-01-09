import actionType from "./actionType";

export const headWishlist = (wishlist) => ({
    type: actionType.HEAD_WISHLIST,
    data: wishlist
});