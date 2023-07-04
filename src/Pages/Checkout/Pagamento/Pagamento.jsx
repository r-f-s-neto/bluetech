import React from 'react';
import ButtonCheckout from '../../../components/ButtonCheckout';
import { useDispatch, useSelector } from 'react-redux';
import pedidoFinalizado from '../../../helper/pedidoFinalizado';
import { listProducts } from '../../../redux/products';

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

const Pagamento = () => {
  const [ativar, setAtivar] = React.useState(true);
  const [subtotal, setSubtotal] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const discount = useSelector((state) => state.checkoutValue.value);
  const frete = useSelector((state) => state.checkoutValue.frete);
  const cartList = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);
  const { data: produtos } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

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

  React.useEffect(() => {
    setTotal((1 - discount) * subtotal + frete);
  }, [subtotal, discount, frete]);
  function handleClick() {
    const userEmail = userData.email;
    console.log('o email é: ', userEmail);
    console.log('o carrinho é: ', cartList);
    dispatch(pedidoFinalizado(total));
    setAtivar(false);
  }
  return (
    <>
      {ativar && (
        <ButtonCheckout text="Simular pagamento" handleClick={handleClick} />
      )}
      {ativar && <span>{`Valor total: ${total}`}</span>}
      {!ativar && <h1>Pagamento efetuado com sucesso</h1>}
    </>
  );
};

export default Pagamento;
