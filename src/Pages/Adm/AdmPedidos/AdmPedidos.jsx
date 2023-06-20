import React from 'react';
import './AdmPedidos-styles.scss';
import TablePedidos from '../../../components/TablePedidos';

const AdmPedidos = () => {
  return (
    <article className="admContent">
      <button className="admContent__addNew">adicionar novo</button>
      <TablePedidos />
    </article>
  );
};

export default AdmPedidos;
