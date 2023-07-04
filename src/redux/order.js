import createAsyncSlice from './createAsyncSlice';

const slice = createAsyncSlice({
  name: 'order',
  fetchConfig: (payload) => ({
    url: 'https://e-commerce-api-bluetech-production.up.railway.app/order',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ; charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    },
  }),
});

const fetchOrder = slice.asyncAction;

export const createOrder = (payload) => async (dispatch) => {
  try {
    await dispatch(fetchOrder(payload));
  } catch {}
};

const reducer = slice.reducer;

export default reducer;
