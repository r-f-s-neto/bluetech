import React from 'react'
import TableCategorias from '../../../components/TableCategorias';
import { useNavigate } from 'react-router-dom';
import './AdmCategorias-styles.scss'

const AdmCategorias = () => {
  const navigate = useNavigate();

  return (
    <article className="admContent">
      <button
        className="admContent__addNew"
        onClick={() => {
          navigate('/adm/categorias/add');
        }}
      >
        adicionar novo
      </button>
      <TableCategorias />
    </article>
  );
}

export default AdmCategorias