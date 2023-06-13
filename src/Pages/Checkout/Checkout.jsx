import React from 'react';
import CartCard from '../../components/CartCard';
import './Checkout-styles.scss';
import { Outlet, useLocation } from 'react-router-dom';

/*const freteOptions = [
  {
    name: 'Frete Express',
    time: '5-10 dias úteis',
  },
  {
    name: 'Frete Padrão',
    time: '7-15 dias úteis',
  },
];
*/

const Checkout = () => {
  // const [freteOpt, setFreteOpt] = React.useState('Frete Padrão');
  const path = useLocation();

  return (
    <article className="checkoutContainner">
      <section className="checkoutContainner__content">
        <h1>Checkout</h1>
        <div className="checkoutPath">
          <span
            className={
              path.pathname.includes('endereco') ? 'checkoutPath--active' : ''
            }
          >
            Endereço
          </span>
          <span
            className={
              path.pathname.includes('frete') ? 'checkoutPath--active' : ''
            }
          >
            Frete
          </span>
          <span
            className={
              path.pathname.includes('pagamento') ? 'checkoutPath--active' : ''
            }
          >
            Pagamento
          </span>
        </div>
        <Outlet />
      </section>
      <section className="checkoutContainner__cart">
        <CartCard />
      </section>
    </article>
  );
};

export default Checkout;
