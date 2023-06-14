import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'checkoutValue',
  initialState: {
    data: null,
    value: 0,
    frete: 0,
    pedidos: [],
  },
  reducers: {
    addCktValue(state, action) {
      state.value = action.payload;
    },
    addCktList(state, action) {
      state.data = action.payload;
    },
    addCktFrete(state, action) {
      state.frete = action.payload;
    },
    addCktPedidos(state, action) {
      state.pedidos = [...state.pedidos, action.payload];
    },
  },
});

export const { addCktValue, addCktList, addCktFrete, addCktPedidos } =
  slice.actions;

export default slice.reducer;
