import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cupom',
  initialState: { data: [{ name: 'cupom10', percentOff: 10, id: 1 }] },
  reducers: {
    createDiscount(state, action) {
      state.data.push(action.payload);
    },
    removeDiscount(state, action) {
      const filteredState = state.data.filter((cupom) => {
        return cupom.id !== action.payload.id;
      });
      state.data = filteredState;
    },
  },
});

export const { createDiscount, removeDiscount } = slice.actions;

export default slice.reducer;
