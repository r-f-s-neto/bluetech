import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemDois } from '../../redux/cart';
import './CartCard-styles.scss';
import LoadingComp from '../LoadingComp';
import Alert from 'react-bootstrap/Alert';

/** const produtos = [
  {
    id: 1,
    src: 'https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg',
    alt: 'alt da imagem',
    name: 'produto 1',
    shortDescription: 'Descrição curta 1',
    categoria: 'Componentes',
    preco: 1000,
  },
  {
    id: 2,
    src: 'https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Legends-Preta-e-Vermelha-1468-858274-12-zoom.jpg',
    alt: 'alt da imagem',
    name: 'produto 2',
    shortDescription: 'Descrição curta 2',
    categoria: 'Cadeiras',
    preco: 2000,
  },
  {
    id: 3,
    src: 'https://www.pichauarena.com.br/wp-content/uploads/2022/04/dddd.png',
    alt: 'alt da imagem',
    name: 'produto 3',
    shortDescription: 'Descrição curta 3',
    categoria: 'Gabinetes',
    preco: 500,
  },
  {
    id: 4,
    src: 'https://images.samsung.com/is/image/samsung/br-c49hg90-lc49hg90dmlxzd-black-308057473?$650_519_PNG$',
    alt: 'alt da imagem',
    name: 'produto 4',
    shortDescription: 'Descrição curta 4',
    categoria: 'Monitores',
    preco: 5000,
  },
  {
    id: 5,
    src: 'https://www.pichauarena.com.br/wp-content/uploads/2022/04/dddd.png',
    alt: 'alt da imagem',
    name: 'produto 5',
    shortDescription: 'Descrição curta 5',
    categoria: 'Gabinetes',
    preco: 900,
  },
]; */

const CartCard = () => {
  const {
    data: produtos,
    loading,
    error: errorListProduct,
  } = useSelector((state) => state.products);
  const products = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  function handleClickRemove(event, productId) {
    event.preventDefault();
    const filteredProducts = products?.filter((product) => {
      return product.id !== productId;
    });
    dispatch(addItemDois(filteredProducts));
  }
  return (
    <ul className="CartCard">
      {products?.map((product) => {
        const produto = produtos?.find((produto) => produto.id === product.id);
        return (
          <li className="CartCardContainner" key={product.id + 'CartCard'}>
            <div className="CartCardContainner__aux">
              <img
                className="CartCardContainner__img"
                src={
                  produto?.images.length
                    ? produto.images[0].filename
                    : 'https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg'
                }
                alt={produto.name}
              />
              <div className="CartCardContainner__info info">
                <h2 className="info__title">{produto.name}</h2>
                <span className="info__qnt">
                  {'Quantidade: ' + product.quantidade}
                </span>
                <h2 className="info__price">
                  {produto.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </h2>
              </div>
            </div>
            <button
              className="CartCardContainner__btn"
              onClick={(event) => {
                handleClickRemove(event, product.id);
              }}
            >
              Remover
            </button>
          </li>
        );
      })}
      {loading && <LoadingComp />}
      {errorListProduct && (
        <Alert variant="danger">
          Ocorreu um erro ao carregar os dados do prroduto, tente novamente mais
          tarde
        </Alert>
      )}
    </ul>
  );
};

export default CartCard;
