import createAsyncSlice from './createAsyncSlice';

const slice = createAsyncSlice({
  name: 'search',
  fetchConfig: (payload) => ({
    url:
      'https://e-commerce-api-bluetech-production.up.railway.app/products/search/' +
      payload,
    options: {
      method: 'GET',
      credentials: 'include',
    },
  }),
});

const fetchSearch = slice.asyncAction;

export const listSearch = (keyword) => async (dispatch) => {
  try {
    await dispatch(fetchSearch(keyword));
  } catch {}
};

const reducer = slice.reducer;

export default reducer;
