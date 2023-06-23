import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'userData',
  initialState: {
    data: null,
  },
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addData } = slice.actions;

export default slice.reducer;
