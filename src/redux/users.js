import createAsyncSlice from './createAsyncSlice';

const slice = createAsyncSlice({
  name: 'users',
  fetchConfig: (payload) => ({
    url: 'https://e-commerce-api-bluetech-production.up.railway.app/user',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
  })
})

export const fetchUsers = slice.asyncAction;

const reducer = slice.reducer;

export const listUsers = () => async (dispatch) => {
  try {
    await dispatch(fetchUsers());
  } catch {

  }
}

export default reducer;