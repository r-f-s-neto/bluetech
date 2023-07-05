import React from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../redux/users.js';
import './TableUsuarios-styles.css';

const TableUsuarios = () => {
  const { data, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  // console.log('data: ',data)

  return (
    <Table responsive>
      <thead>
        <tr className="tableHead">
          <th>Nome</th>
          <th>Email</th>
          <th>Função</th>
        </tr>
      </thead>
      <tbody>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {data && data.length
          ? data.map((usuario) => {
              return (
                <tr className="tableBody" key={usuario.id + usuario.name}>
                  <td>{usuario.name}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.role}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </Table>
  );
};

export default TableUsuarios;
