import React from 'react';
import TableProducts from '../../../components/TableProducts';
import './AdmProdutos-styles.css';
import { useNavigate } from 'react-router-dom';

const AdmProdutos = () => {
  const navigate = useNavigate();

  return (
    <article className="admContent">
      <button
        className="admContent__addNew"
        onClick={() => {
          navigate('/adm/produtos/add');
        }}
      >
        adicionar novo
      </button>
      <TableProducts />
    </article>
  );
};

export default AdmProdutos;
