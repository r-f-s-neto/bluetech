import React from 'react';
import './PurshCard-styles.scss';

const PurshCard = ({ compras, produtos }) => {
  const comprasObj = JSON.parse(compras);
  const produtosObj = JSON.parse(produtos);
  return (
    <section className="PurshCard">
      {comprasObj.length
        ? comprasObj.map((compra, index) => {
            return (
              <div className="PurshCard__item">
                <h3>{`Pedido ${index + 1}`}</h3>
                {console.log(compra)}
                <ul className="purshCardList">
                  {compra.produtos?.map((produto) => {
                    return (
                      <li className="purshCardList__item">
                        <div>{`Produto: ${
                          produtosObj?.find((produtoObj) => {
                            return produtoObj.id === produto.id;
                          }).name
                        }`}</div>
                        <div>{`Quantidade: ${produto.quantidade}`}</div>
                      </li>
                    );
                  })}
                </ul>
                <span>{`Valor do pedido: ${compra.valor.toLocaleString(
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
