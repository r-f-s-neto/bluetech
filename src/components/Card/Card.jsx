import React from 'react';
import { Link } from 'react-router-dom';
import './Card-styles.scss';

const Card = ({ produtos }) => {
  return (
    <article className="cardContainner">
      {JSON.parse(produtos).map((produto) => {
        return (
          <Link
            to={`/produtos/${encodeURIComponent(produto.id)}`}
            key={produto.id + produto.name + 'card'}
          >
            <div className="productCard">
              <img
                className="productCard__image"
                src={produto.src}
                alt={produto.alt}
              />
              <div className="productCard__description">
                <div className="containnerText">
                  <h3 className="containnerText__title">{produto.name}</h3>
                  <span className="containnerText__cat">
                    {produto.categoria}
                  </span>
                </div>
                <h3 className="containnerPrice">
                  {produto.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </h3>
              </div>
            </div>
          </Link>
        );
      })}
    </article>
  );
};

export default Card;
