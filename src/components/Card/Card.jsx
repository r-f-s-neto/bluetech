import React from 'react';
import { Link } from 'react-router-dom';
import './Card-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/products';

const Card = () => {
  const dispatch = useDispatch();
  const { data: produtos } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <article className="cardContainner">
      {produtos &&
        produtos.map((produto) => {
          return (
            <Link
              to={`/produtos/${encodeURIComponent(produto.id)}`}
              key={produto.id + produto.name + 'card'}
            >
              <div className="productCard">
                <img
                  className="productCard__image"
                  src="https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg"
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
