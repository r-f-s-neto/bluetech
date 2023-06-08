import React from 'react';
import { useSelector } from 'react-redux';
import CartCard from '../../components/CartCard';
import './Carrinho-styles.scss';

const produtos = [
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
];

const Carrinho = () => {
  const [cupom, setCupom] = React.useState('');
  const [subtotal, setSubtotal] = React.useState(0);
  const cartList = useSelector((state) => state.cart.data);
  const cupomList = useSelector((state) => state.cupom.data);
  const [discount, setDiscount] = React.useState(0);
  const [error, setError] = React.useState(null);

  // const [listProd, setListProd] = React.useState(null);
  // const cartProducts = useSelector((state) => state);

  /* React.useEffect(() => {
    const ids = cartProducts?.map((item) => {
      return item.id;
    });
    const uniqueId = [...new Set(ids)];
    const res = uniqueId.map((id) => {
      const filteredProducts = cartProducts?.filter((prod) => {
        return prod.id === id;
      });
      const quantidade = filteredProducts?.reduce((acc, curr) => {
        return acc + curr.quantidade;
      }, 0);
      return { id: id, quantidade: quantidade };
    });
    setListProd(res);
  }, [cartProducts]); **/

  React.useEffect(() => {
    setSubtotal(
      cartList
        ? cartList.reduce((accCart, currCart) => {
            return (
              accCart +
              produtos.reduce((accProd, currProd) => {
                if (currProd.id === currCart.id) {
                  return accProd + currProd.preco * currCart.quantidade;
                } else {
                  return accProd + 0;
                }
              }, 0)
            );
          }, 0)
        : 0,
    );
  }, [cartList]);

  function handleBlur({ target }) {
    const valor = target.value;
    if (valor === '') {
      setError(null);
      setDiscount(0);
      return;
    }
    const filteredCupom = cupomList.filter((cupom) => {
      return cupom.name === valor;
    });
    if (filteredCupom.length) {
      setDiscount((filteredCupom[0].percentOff / 100) * subtotal);
      setError(null);
    } else {
      setDiscount(0);
      setError('Este cupom é invalido');
    }
  }

  return (
    <>
      <article className="CarrinhoContainner">
        <div>
          <h1 className="CarrinhoContainner__title">Meu carrinho</h1>
          {cartList && <CartCard />}
        </div>
        <div className="orderInfo">
          <h2 className="orderInfo__title">Resumo do Pedido</h2>
          <input
            className={
              !error
                ? 'orderInfo__cupom'
                : 'orderInfo__cupom orderInfo__cupom--error'
            }
            id="cupom"
            name="cupom"
            type="text"
            placeholder="insira seu cupom"
            value={cupom}
            onChange={({ target }) => {
              setCupom(target.value);
            }}
            onBlur={handleBlur}
          />
          {error && <p className="cartError">{error}</p>}
          <div className="orderInfo__subtotal">
            <p>Subtotal dos produtos</p>
            <p>{subtotal}</p>
          </div>
          <div className="orderInfo__ship">
            <p>Frete</p>
            <p>será calculado no próximo passo</p>
          </div>
          <div className="orderInfo__cupomValue">
            <p>Cupom</p>
            <p>{`-${discount}`}</p>
          </div>
          <div className="orderInfo__total">
            <p>Total</p>
            <p>{subtotal - discount}</p>
          </div>
          <button className="orderInfo__btn">Continue Para o Checkout</button>
        </div>
      </article>
    </>
  );
};

export default Carrinho;
