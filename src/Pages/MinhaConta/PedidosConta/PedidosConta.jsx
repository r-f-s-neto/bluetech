import React from 'react';
import PurshCard from '../../../components/PurshCard';
import './PedidosConta-styles.css';

const PedidosConta = () => {
  return (
    <div className="PedidosConta">
      <div className="PedidosConta__title">
        <h1>Meus Pedidos</h1>
      </div>
      <div className="PedidosConta__cards">
        <PurshCard />
      </div>
    </div>
  );
};

export default PedidosConta;
