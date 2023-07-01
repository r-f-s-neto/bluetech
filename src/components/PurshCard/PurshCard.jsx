import React from 'react';
import './PurshCard-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/products';
import { listClientOrders } from '../../redux/pedidosClient';

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
              <div className="PurshCard__item">
                <h3>{`Pedido ${index + 1}`}</h3>
                {console.log(compra)}
                <ul className="purshCardList">
                  {compra.products?.map((produto) => {
                    return (
                      <li className="purshCardList__item">
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
    </section>
  );
};

export default PurshCard;
