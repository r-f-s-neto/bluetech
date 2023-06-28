import createAsyncSlice from "./createAsyncSlice";

const slice = createAsyncSlice({
  name: 'categories',
  fetchConfig: () => ({
    url: 'https://e-commerce-api-bluetech-production.up.railway.app/category',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
  })
})

const fetchCategories = slice.asyncAction;

const reducer = slice.reducer;

export const listCategories = () => async (dispatch) => {
  try {
    await dispatch(fetchCategories())
  } catch {

  }
}

export default reducer;