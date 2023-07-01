import createAsyncSlice from './createAsyncSlice';

const slice = createAsyncSlice({
  name: 'pedidosClient',
  fetchConfig: (payload) => ({
    url:
      'https://e-commerce-api-bluetech-production.up.railway.app/order/user/' +
      payload,
    options: {
      method: 'GET',
      credentials: 'include',
    },
  }),
});

const fetchPedidosClient = slice.asyncAction;

export const listClientOrders = (id) => async (dispatch) => {
  await dispatch(fetchPedidosClient(id));
};

const reducer = slice.reducer;

export default reducer;
