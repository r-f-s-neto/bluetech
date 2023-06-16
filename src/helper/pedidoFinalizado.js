import { addItemDois } from '../redux/cart';
import {
  addCktFrete,
  addCktList,
  addCktPedidos,
  addCktValue,
} from '../redux/checkoutValue';

const pedidoFinalizado = (total) => (dispatch, getState) => {
  const state = getState();
  const produtos = state.cart.data;
  const pedido = {
    produtos,
    valor: total,
  };
  dispatch(addCktPedidos(pedido));
  dispatch(addCktFrete(0));
  dispatch(addCktValue(0));
  dispatch(addCktList(null));
  dispatch(addItemDois(null));
};

export default pedidoFinalizado;
