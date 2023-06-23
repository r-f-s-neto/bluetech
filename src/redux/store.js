import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cart from './cart';
import cupom from './cupom';
import checkoutValue from './checkoutValue';
import userData from './userData';

const reducer = combineReducers({ cart, cupom, checkoutValue, userData });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
