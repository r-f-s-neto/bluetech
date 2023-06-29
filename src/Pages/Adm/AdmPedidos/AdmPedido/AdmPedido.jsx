import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import LoadingComp from '../../../../components/LoadingComp';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../../../redux/products';
import './AdmPedido-styles.scss';
import { Link } from 'react-router-dom';


const AdmPedido = () => {
  const dispatch = useDispatch();
  const {data:products, loading, error} = useSelector(state => state.products);
  const [pedido, setPedido] = React.useState(null);
  const [erroPedido, setErroPedido] = React.useState(false);
  React.useEffect(() => {
    if (!products) {
      dispatch(listProducts());
    }
  }, [dispatch, products])

  React.useEffect(() => {
    let localStorageData =null;
    try {
      localStorageData = JSON.parse(window.localStorage.getItem('admClickedPedido'));
      setErroPedido(false);
    } catch {
      setErroPedido(true);
    }
    setPedido(localStorageData)
  }, [])


  return (
    <div className='AdmPedido'>
    <div className="AdmPedido__header">
        <Link to="/adm/pedidos">{'< voltar'}</Link>
        <h1>Informações do pedido</h1>
      </div>
    {error && <Alert variant='danger'>Não foi possível encontrar os produtos do pedido, tente mais tarde !</Alert>}
    {erroPedido && <Alert variant='danger'>Não foi possível carregar os dados do pedido, tente mais tarde</Alert>}
    <Table responsive>
      <thead>
        <tr className="tableHead">
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {pedido?.products.map((produto) => {
          return (
              <tr className="tableBody" key={produto.productId + 'tablePedidos'}>
                {products?<td>{products.find((element)=>produto.productId===element.id).name}</td>:<td><LoadingComp /></td>}
                <td>{produto?.quantity}</td>
                {products?<td>{(Number(products.find((element)=>produto.productId===element.id).price)*produto.quantity).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</td>:<td><LoadingComp /></td>}
              </tr>
          );
        })}
        <tr className="tableBody">
          <td>Valor Total do Pedido</td>
          <td></td>
          <td>{Number(pedido?.total).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</td>
        </tr>
      </tbody>
    </Table>
    {loading&& <LoadingComp />}
    </div>
  );
}

export default AdmPedido