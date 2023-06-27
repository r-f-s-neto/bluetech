import createAsyncSlice from "./createAsyncSlice";

const slice = createAsyncSlice({
  name: 'products',
  fetchConfig: (payload) => ({
    url: 'https://e-commerce-api-bluetech-production.up.railway.app/products',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  })
})

const fetchProducts = slice.asyncAction;

export const listProducts = () => async (dispatch) => {
  try {
    await dispatch(fetchProducts())
  } catch {

  }
}


const reducer = slice.reducer;

export default reducer;