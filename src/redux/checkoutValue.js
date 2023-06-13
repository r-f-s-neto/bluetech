import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'checkoutValue',
  initialState: {
    data: null,
    value: 0,
  },
  reducers: {
    addCktValue(state, action) {
      state.value = action.payload;
    },
    addCktList(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addCktValue, addCktList } = slice.actions;

export default slice.reducer;
