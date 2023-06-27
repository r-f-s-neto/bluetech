import React from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import './TableProducts-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/products';
import Alert from 'react-bootstrap/Alert';

const TableProducts = () => {
  const {data, loading, error} = useSelector(state=>state.products);
  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(listProducts())
  }, [dispatch])

  const navigate = useNavigate();
  return (
    <Table responsive>
      <thead>
        <tr className="tableHead">
          <th>Nome</th>
          <th>Estoque</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {loading && <div>Loading...</div>}
        {error && <Alert variant='danger'>{error}</Alert>}
        {data?.map((produto) => {
          return (
            <tr
              className="tableBody"
              key={produto.id + produto.name}
            >
              <td>{produto.name}</td>
              <td>{produto.inventory}</td>
              <td>
                {produto.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td className="TableProducts__Buttons">
                <button
                  onClick={() => {
                    window.localStorage.setItem('admClickedProduct', JSON.stringify(produto));
                    navigate(`/adm/produtos/${encodeURIComponent(produto.id)}`);
                    
                  }}
                >
                  ver detalhes
                </button>
                <button>excluir</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableProducts;
