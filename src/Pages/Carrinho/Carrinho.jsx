import React from 'react';
// import { useSelector } from 'react-redux';
import CartCard from '../../components/CartCard';

const Carrinho = () => {
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

  return (
    <>
      <CartCard />
    </>
  );
};

export default Carrinho;
