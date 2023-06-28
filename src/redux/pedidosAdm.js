import createAsyncSlice from './createAsyncSlice'

const slice = createAsyncSlice({
  name:"pedidosAdm",
  fetchConfig: ()=>({
    url:"https://e-commerce-api-bluetech-production.up.railway.app/order",
    options: {
      method: "GET",
      credentials: "include"
    }
  })
});

const fetchListProductAdm = slice.asyncAction;

export const listProductAdm = () => async (dispatch) => {
  try {
    await dispatch(fetchListProductAdm())
  } catch {}
}

const reducer = slice.reducer;

export default reducer;