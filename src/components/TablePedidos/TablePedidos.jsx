import React from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import './TablePedidos-styles.scss';

const TablePedidos = () => {
  const pedidos = useSelector((state) => state.checkoutValue.pedidos);
  return (
    <Table responsive>
      <thead>
        <tr className="tableHead">
          <th>id</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {pedidos?.map((pedido, index) => {
          return (
            <tr className="tableBody" key={index + 'tablePedidos'}>
              <td>{index}</td>
              <td>
                {pedido.valor.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td className="TableProducts__Buttons">
                <button>ver detalhes</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TablePedidos;
