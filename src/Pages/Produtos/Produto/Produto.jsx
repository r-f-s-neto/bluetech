import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Produto-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemDois } from '../../../redux/cart';
import { listProducts } from '../../../redux/products';
import LoadingComp from '../../../components/LoadingComp';
import Alert from 'react-bootstrap/Alert';

/**const produtos = [
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

const Produto = () => {
  const param = useParams();
  const [prodData, setProdData] = React.useState(null);
  const [quantidade, setQuantidade] = React.useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const {
    data: produtos,
    loading,
    error: errorListProduct,
  } = useSelector((state) => state.products);
  const userData = useSelector((state) => state.userData.data);
  const [logado, setLogado] = React.useState(true);

  React.useEffect(() => {
    if (userData) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, [userData]);

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  React.useEffect(() => {
    // filtrando os dados do id correspondente
    setProdData(
      produtos?.find((produto) => {
        return produto.id === +param.id;
      }),
    );
  }, [param, produtos]);

  function handleClickCart(event) {
    event.preventDefault();

    if (logado) {
      function getNewState(state, id, quantidade) {
        if (state.data) {
          const verify = state.data.filter((item) => {
            if (item.id === id) {
              return true;
            } else {
              return false;
            }
          });
          if (verify.length) {
            return state.data.map((element) => {
              if (element.id === +id) {
                const quant = element.quantidade + +quantidade;
                return { id: +id, quantidade: quant };
              } else {
                return element;
              }
            });
          } else {
            return [...state.data, { id: +id, quantidade: +quantidade }];
          }
        } else {
          return [{ id: +id, quantidade: +quantidade }];
        }
      }

      const newState = getNewState(state, +param.id, +quantidade);
      dispatch(addItemDois(newState));
    } else {
      navigate('/login');
    }
  }

  function handleClickPurshase() {
    if (logado) {
      function getNewState(state, id, quantidade) {
        if (state.data) {
          const verify = state.data.filter((item) => {
            if (item.id === id) {
              return true;
            } else {
              return false;
            }
          });
          if (verify.length) {
            return state.data.map((element) => {
              if (element.id === +id) {
                const quant = element.quantidade + +quantidade;
                return { id: +id, quantidade: quant };
              } else {
                return element;
              }
            });
          } else {
            return [...state.data, { id: +id, quantidade: +quantidade }];
          }
        } else {
          return [{ id: +id, quantidade: +quantidade }];
        }
      }

      const newState = getNewState(state, +param.id, +quantidade);
      dispatch(addItemDois(newState));

      navigate('/carrinho');
    } else {
      navigate('/login');
    }
  }

  return (
    <main className="productContainner">
      <div className="productCarrousel">
        <img
          className="productCarrousel__img"
          src="https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg"
          alt={prodData?.name}
        />
      </div>
      <div className="information">
        <h1 className="information__title">{prodData?.name}</h1>
        <p className="information__price">
          {Number(prodData?.price).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        <p className="information__description">{prodData?.description}</p>
        <form className="ProductForm">
          <input
            id="quantidade"
            name="quantidade"
            value={quantidade}
            onChange={({ target }) => {
              setQuantidade(target.value);
            }}
            type="number"
          />
          <span className="ProductForm__estoque">{`estoque: ${prodData?.inventory}`}</span>
          <div className="ProductForm__button buttonForm">
            <button
              className="buttonForm__cart buttonForm--active"
              onClick={(event) => {
                handleClickCart(event);
              }}
            >
              add ao carrinho
            </button>
            <button
              className="buttonForm__buy buttonForm--active"
              onClick={handleClickPurshase}
            >
              comprar
            </button>
          </div>
        </form>
      </div>
      {loading && <LoadingComp />}
      {errorListProduct && (
        <Alert>
          Não foi possível carregar os dados do produto, tente novamente mais
          tarde
        </Alert>
      )}
    </main>
  );
};

export default Produto;
