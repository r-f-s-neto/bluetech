import React from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { listProductAdm } from '../../redux/pedidosAdm';
import './TablePedidos-styles.css';
import LoadingComp from '../../components/LoadingComp';
import { useNavigate } from 'react-router-dom';

const TablePedidos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.pedidosAdm);

  React.useEffect(() => {
    dispatch(listProductAdm());
  }, [dispatch]);

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table responsive>
        <thead>
          <tr className="tableHead">
            <th>id do pedido</th>
            <th>id do usuario</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length
            ? data.map((pedido) => {
                return (
                  <tr className="tableBody" key={pedido.id + 'tablePedidos'}>
                    <td>{pedido.id}</td>
                    <td>{pedido.userId}</td>
                    <td>
                      {Number(pedido.total).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td className="TableProducts__Buttons">
                      <button
                        onClick={() => {
                          window.localStorage.setItem(
                            'admClickedPedido',
                            JSON.stringify(pedido),
                          );
                          navigate(
                            `/adm/pedidos/${encodeURIComponent(pedido.id)}`,
                          );
                        }}
                      >
                        ver detalhes
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      {loading && <LoadingComp />}
    </>
  );
};

export default TablePedidos;
