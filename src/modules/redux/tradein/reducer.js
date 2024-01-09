import actionType from "./actionType";
import { updateObject } from 'utils';

const initialState = {
    tradeInContent: [],
};

const getTradeInContent = (state, action) => {
    return updateObject(state, {
        tradeInContent: action.data
    });
};

const tradeInReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_TRADEIN_CONTENT: return getTradeInContent(state, action);
        default: return state;
    }
};

export default tradeInReducer;