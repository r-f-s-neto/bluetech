import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
    removeItem(state, action) {
      state = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            id: item.id,
            quantidade: item.quantidade - action.payload.quantidade,
          };
        } else {
          return item;
        }
      });
    },
  },
});

export const { addItem, removeItem } = slice.actions;
const cart = slice.reducer;
export default cart;
