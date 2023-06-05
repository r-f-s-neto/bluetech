import { configureStore } from '@reduxjs/toolkit';
import cart from './cart';

const store = configureStore({
  reducer: cart,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
