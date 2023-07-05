import React from 'react';
import './Frete-styles.css';
import ButtonCheckout from '../../../components/ButtonCheckout';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCktFrete } from '../../../redux/checkoutValue';
import { listProducts } from '../../../redux/products';

const freteOptions = [
  {
    name: 'Frete Express',
    time: '5-10 dias úteis',
    price: 0,
  },
  {
    name: 'Frete Padrão',
    time: '7-15 dias úteis',
    price: 0,
  },
];

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
];*/

const Frete = () => {
  const [freteOpt, setFreteOpt] = React.useState('Frete Padrão');
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = React.useState(0);
  const cartList = useSelector((state) => state.cart.data);
  const discount = useSelector((state) => state.checkoutValue.value);
  const [freteValue, setFreteValue] = React.useState(0);
  const dispatch = useDispatch();
  const { data: produtos } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  React.useEffect(() => {
    setFreteValue(
      freteOptions?.find((frete) => {
        return frete.name === freteOpt;
      }).price,
    );
  }, [freteOpt]);

  React.useEffect(() => {
    setSubtotal(
      cartList
        ? cartList.reduce((accCart, currCart) => {
            return (
              accCart +
              produtos?.reduce((accProd, currProd) => {
                if (currProd.id === currCart.id) {
                  return accProd + currProd.price * currCart.quantidade;
                } else {
                  return accProd + 0;
                }
              }, 0)
            );
          }, 0)
        : 0,
    );
  }, [cartList, produtos]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(
      addCktFrete(
        freteOptions?.find((frete) => {
          return frete.name === freteOpt;
        }).price,
      ),
    );
    navigate('/checkout/pagamento');
  }
  return (
    <form className="checkoutForm">
      {freteOptions.map((frete) => {
        return (
          <div
            className={
              freteOpt === frete.name
                ? 'checkoutForm__item checkoutForm__item--active'
                : 'checkoutForm__item'
            }
            key={frete.name + frete.time}
          >
            <input
              id={frete.name}
              type="radio"
              value={frete.name}
              checked={freteOpt === frete.name}
              onChange={({ target }) => {
                setFreteOpt(target.value);
              }}
            />
            <label htmlFor={frete.name}>
              <h2>{frete.name}</h2>
              <span>{frete.time}</span>
            </label>
          </div>
        );
      })}
      <span>{`Total: ${(1 - discount) * subtotal + freteValue}`}</span>
      <ButtonCheckout text="Próximo" handleClick={handleClick} />
    </form>
  );
};

export default Frete;
