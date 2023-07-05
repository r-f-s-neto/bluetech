import React from 'react';
import CartCard from '../../components/CartCard';
import './Checkout-styles.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const navigate = useNavigate();
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
    if (!logado) {
      navigate('/login');
    }
  }, [logado, navigate]);

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
