import React from 'react';
import { Link } from 'react-router-dom';
import './Card-styles.scss';

const Card = ({ produtos }) => {
  return (
    <article className="cardContainner">
      {JSON.parse(produtos) &&
        JSON.parse(produtos).map((produto) => {
          return (
            <Link
              to={`/produtos/${encodeURIComponent(produto.id)}`}
              key={produto.id + produto.name + 'card'}
            >
              <div className="productCard">
                <img
                  className="productCard__image"
                  src={
                    produto?.images.length
                      ? produto.images[0].filename
                      : 'https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg'
                  }
                  alt={produto.name}
                />
                <div className="productCard__description">
                  <div className="containnerText">
                    <h3 className="containnerText__title">{produto.name}</h3>
                    <span className="containnerText__cat">
                      {produto.categories.name}
                    </span>
                  </div>
                  <h3 className="containnerPrice">
                    {Number(produto.price).toLocaleString('pt-BR', {
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
