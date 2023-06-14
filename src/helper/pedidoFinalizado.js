import { addItemDois } from '../redux/cart';
import {
  addCktFrete,
  addCktList,
  addCktPedidos,
  addCktValue,
} from '../redux/checkoutValue';

const pedidoFinalizado = (total) => (dispatch, getState) => {
  const state = getState();
  console.log(state);
  const pedido = {
    produtos: state.checkoutValue.data,
    valor: total,
  };
  dispatch(addCktPedidos(pedido));
  dispatch(addCktFrete(0));
  dispatch(addCktValue(0));
  dispatch(addCktList(null));
  dispatch(addItemDois(null));
  console.log(state);
};

export default pedidoFinalizado;
