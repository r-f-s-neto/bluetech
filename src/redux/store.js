import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cart from './cart';
import cupom from './cupom';
import checkoutValue from './checkoutValue';
import userData from './userData';
import users from './users';
import products from './products';
import categories from './categories';
import pedidosAdm from './pedidosAdm';
import search from './search';
import pedidosClient from './pedidosClient';
import order from './order';

const reducer = combineReducers({
  cart,
  cupom,
  checkoutValue,
  userData,
  users,
  products,
  categories,
  pedidosAdm,
  search,
  pedidosClient,
  order,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
