import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cart',
  initialState: { data: null },
  reducers: {
    removeItem(state, action) {},
    addItemDois(state, action) {
      state.data = action.payload;
    },
  },
});

export const { removeItem, addItemDois } = slice.actions;
const cart = slice.reducer;
export default cart;
