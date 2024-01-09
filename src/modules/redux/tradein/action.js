import actionType from "./actionType";

export const getTradeInContent = (tradeIn) => ({
    type: actionType.GET_TRADEIN_CONTENT,
    data: tradeIn
});
