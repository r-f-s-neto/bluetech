import React from 'react';
import TableProducts from '../../../components/TableProducts';
import './AdmProdutos-styles.scss';

const AdmProdutos = () => {
  return (
    <article className="admContent">
      <button className="admContent__addNew">adicionar novo</button>
      <TableProducts />
    </article>
  );
};

export default AdmProdutos;
