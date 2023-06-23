import createAsyncSlice from './createAsyncSlice';

const user = createAsyncSlice({
  name: 'user',
  fetchConfig: (payload) => ({
    url: 'https://e-commerce-api-bluetech-production.up.railway.app/user/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  }),
});

export const fetchUser = user.asyncAction;

const reducer = user.reducer;

export default reducer;
