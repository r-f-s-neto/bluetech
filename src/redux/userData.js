import { createSlice } from '@reduxjs/toolkit';

function dataLocalStorage(key, def) {
  if (window.localStorage.getItem(key)) {
    return JSON.parse(window.localStorage.getItem(key));
  } else {
    return def;
  }
}

const slice = createSlice({
  name: 'userData',
  initialState: {
    data: dataLocalStorage('blueDataUser', null),
  },
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addData } = slice.actions;

export default slice.reducer;
