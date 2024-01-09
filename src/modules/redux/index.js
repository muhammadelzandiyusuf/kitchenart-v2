import { combineReducers, createStore, thunk, applyMiddleware, compose } from 'libraries';
import customerReducer from "./customer/reducer";
import languageReducer from "./language/recuder";
import menuReducer from "./menu/reducer";
import categoryReducer from "./category/reducer";
import productReducer from "./product/reducer";
import brandReducer from "./brand/reducer";
import paymentReducer from "./payment/reducer";
import shipmentReducer from "./shipment/reducer";
import bannerReducer from "./banner/reducer";
import tradeInReducer from "./tradein/reducer";
import cartReducer from "./cart/reducer";
import wishlistReducer from "./wishlist/reducer";

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] : null) || compose;

/**
 * reducer
 */
export const reducer = combineReducers({
    customer: customerReducer,
    language: languageReducer,
    menu: menuReducer,
    category: categoryReducer,
    product: productReducer,
    brand: brandReducer,
    payment: paymentReducer,
    shipment: shipmentReducer,
    banner: bannerReducer,
    tradein: tradeInReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
});

/**
 * store
 */
export const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

/**
 * dispatcher
 */
export * from './customer/action';
export * from './language/action';
export * from './menu/action';
export * from './category/action';
export * from './product/action';
export * from './brand/action';
export * from './payment/action';
export * from './shipment/action';
export * from './banner/action';
export * from './tradein/action';
export * from './cart/action';
export * from './checkout/action';
export * from './wishlist/action';

/**
 * selector
 */
export * from './customer/selector';
export * from './language/selector';
export * from './menu/selector';
export * from './category/selector';
export * from './product/selector';
export * from './brand/selector';
export * from './payment/selector';
export * from './shipment/selector';
export * from './banner/selector';
export * from './tradein/selector';
export * from './cart/selector';
export * from './wishlist/selector';