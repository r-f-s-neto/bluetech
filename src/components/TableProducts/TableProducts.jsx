import React from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import './TableProducts-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/products';
import Alert from 'react-bootstrap/Alert';

const TableProducts = () => {
  const { data, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [loadingDelete, setLoadingDelete] = React.useState(null);
  const [errorDelete, setErrorDelete] = React.useState(false);
  const [errorDeleteMensage, setErrorDeleteMensage] = React.useState(null);
  const [sucessDelete, setSucessDelete] = React.useState(false);

  async function handleClickDelete(event, produto) {
    setLoadingDelete(true);
    try {
      const response = await fetch(
        'https://e-commerce-api-bluetech-production.up.railway.app/products/' +
          produto.id,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (response.ok) {
        setSucessDelete(true);
        setErrorDelete(false);
        dispatch(listProducts());
      }
    } catch (erro) {
      setErrorDelete(true);
      setSucessDelete(false);
      setErrorDeleteMensage(erro);
    } finally {
      setLoadingDelete(false);
    }
  }

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <>
      {errorDelete && <Alert variant="danger">{errorDeleteMensage}</Alert>}
      {sucessDelete && (
        <Alert variant="success">Produto deletado com sucesso</Alert>
      )}
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
          {data && data.length
            ? data.map((produto) => {
                return (
                  <tr className="tableBody" key={produto.id + produto.name}>
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
                          window.localStorage.setItem(
                            'admClickedProduct',
                            JSON.stringify(produto),
                          );
                          navigate(
                            `/adm/produtos/${encodeURIComponent(produto.id)}`,
                          );
                        }}
                      >
                        ver detalhes
                      </button>
                      <button
                        className={
                          loadingDelete ? 'admProductDelete-active' : ''
                        }
                        onClick={(event) => {
                          handleClickDelete(event, produto);
                        }}
                      >
                        excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      {loading && <div>Loading...</div>}
      {error && <Alert variant="danger">{error}</Alert>}
      {errorDelete && (
        <Alert variant="danger">
          Erro ao tentar excluir o produto, tente mais tarde
        </Alert>
      )}
    </>
  );
};

export default TableProducts;
