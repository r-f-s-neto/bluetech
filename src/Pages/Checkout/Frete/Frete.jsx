import React from 'react';
import './Frete-styles.scss';
import ButtonCheckout from '../../../components/ButtonCheckout';
import { useNavigate } from 'react-router-dom';

const freteOptions = [
  {
    name: 'Frete Express',
    time: '5-10 dias úteis',
  },
  {
    name: 'Frete Padrão',
    time: '7-15 dias úteis',
  },
];

const Frete = () => {
  const [freteOpt, setFreteOpt] = React.useState('Frete Padrão');
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
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
      <ButtonCheckout text="Próximo" handleClick={handleClick} />
    </form>
  );
};

export default Frete;
