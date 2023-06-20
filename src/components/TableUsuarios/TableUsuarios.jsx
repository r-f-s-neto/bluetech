import React from 'react';
import Table from 'react-bootstrap/Table';
import './TableUsuarios-styles.scss';

const usuarios = [
  {
    id: 1,
    name: 'usuário 1',
  },
  {
    id: 2,
    name: 'usuario 2',
  },
];

const TableUsuarios = () => {
  return (
    <Table responsive>
      <thead>
        <tr className="tableHead">
          <th>Id</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        {usuarios?.map((usuario) => {
          return (
            <tr className="tableBody" key={usuario.id + usuario.name}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableUsuarios;
