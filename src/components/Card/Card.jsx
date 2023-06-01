import React from 'react';
import './Card-styles.scss';

const Card = ({ produtos }) => {
  return (
    <article className="cardContainner">
      {JSON.parse(produtos).map((produto) => {
        return (
          <div className="productCard" key={produto.id + produto.name + 'card'}>
            <img
              className="productCard__image"
              src={produto.src}
              alt={produto.alt}
            />
            <div className="productCard__description">
              <div className="containnerText">
                <h3 className="containnerText__title">{produto.name}</h3>
                <span className="containnerText__cat">{produto.categoria}</span>
              </div>
              <h3 className="containnerPrice">{produto.preco}</h3>
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default Card;
