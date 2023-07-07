import React from 'react';
import './PurshCard-styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/products';
import { listClientOrders } from '../../redux/pedidosClient';
import LoadingComp from '../LoadingComp';
import Alert from 'react-bootstrap/Alert';

const PurshCard = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = React.useState(null);
  const [errorUserData, setErrorUserData] = React.useState(false);
  const {
    data: comprasObj,
    loading: loadingCompras,
    error: errorCompras,
  } = useSelector((state) => state.pedidosClient);
  const {
    data: produtosObj,
    loading: loadingProdutos,
    error: errorProdutos,
  } = useSelector((state) => state.products);

  React.useEffect(() => {
    try {
      const data = JSON.parse(window.localStorage.getItem('blueDataUser'));
      setUserData(data);
    } catch {
      setErrorUserData(true);
    }
  }, []);

  React.useEffect(() => {
    if (!produtosObj) {
      dispatch(listProducts());
    }
  }, [produtosObj, dispatch]);

  React.useEffect(() => {
    if (userData && !comprasObj) {
      dispatch(listClientOrders(userData.id));
    }
  }, [userData, comprasObj, dispatch]);

  //const comprasObj = JSON.parse(compras);
  //const produtosObj = JSON.parse(produtos);
  return (
    <section className="PurshCard">
      {comprasObj?.length
        ? comprasObj.map((compra, index) => {
            return (
              <div key={index + 'PurshCard'} className="PurshCard__item">
                <h3>{`Pedido ${index + 1}`}</h3>

                <ul className="purshCardList">
                  {compra.products?.map((produto, index) => {
                    return (
                      <li
                        key={index + 'purshCardList'}
                        className="purshCardList__item"
                      >
                        <div>{`Produto: ${
                          produtosObj?.find((produtoObj) => {
                            return produtoObj.id === produto.productId;
                          }).name
                        }`}</div>
                        <div>{`Quantidade: ${produto.quantity}`}</div>
                      </li>
                    );
                  })}
                </ul>
                <span>{`Valor do pedido: ${Number(compra.total).toLocaleString(
                  'pt-BR',
                  { style: 'currency', currency: 'BRL' },
                )}`}</span>
              </div>
            );
          })
        : null}
      {loadingCompras && loadingProdutos && <LoadingComp />}
      {errorCompras && <Alert variant="danger">{errorCompras}</Alert>}
      {errorProdutos && <Alert variant="danger">{errorProdutos}</Alert>}
      {errorUserData && (
        <Alert variant="danger">
          Não foi possível acessar seus dados, por favor, refaça o login
        </Alert>
      )}
    </section>
  );
};

export default PurshCard;
