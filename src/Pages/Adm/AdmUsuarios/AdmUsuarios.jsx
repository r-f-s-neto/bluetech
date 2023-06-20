import React from 'react';
import TableUsuarios from '../../../components/TableUsuarios';
import './AdmUsuarios-styles.scss';

const AdmUsuarios = () => {
  return (
    <article className="admContent">
      <button className="admContent__addNew">adicionar novo</button>
      <TableUsuarios />
    </article>
  );
};

export default AdmUsuarios;
