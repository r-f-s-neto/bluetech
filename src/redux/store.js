import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cart from './cart';
import cupom from './cupom';

const reducer = combineReducers({ cart, cupom });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
