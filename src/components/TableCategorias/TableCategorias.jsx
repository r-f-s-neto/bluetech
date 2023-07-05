import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../../redux/categories';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import './TableCategorias-styles.scss';

const TableCategorias = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [loadingDelete, setLoadingDelete] = React.useState(null);
  const [errorDelete, setErrorDelete] = React.useState(false);
  const [errorDeleteMensage, setErrorDeleteMensage] = React.useState(null);
  const [sucessDelete, setSucessDelete] = React.useState(false);

  async function handleClickDelete(categoria) {
    setLoadingDelete(true);
    try {
      const response = await fetch(
        'https://e-commerce-api-bluetech-production.up.railway.app/category/' +
          categoria.id,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );
      if (response.ok) {
        setSucessDelete(true);
        setErrorDelete(false);
        dispatch(listCategories());
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
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <>
      {errorDelete && <Alert variant="danger">{errorDeleteMensage}</Alert>}
      {sucessDelete && (
        <Alert variant="success">Categoria deletada com sucesso</Alert>
      )}
      <Table responsive>
        <thead>
          <tr className="tableHead">
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length
            ? data.map((categoria) => {
                return (
                  <tr className="tableBody" key={categoria.id + categoria.name}>
                    <td>{categoria.name}</td>
                    <td>{categoria.description}</td>
                    <td className="TableProducts__Buttons">
                      <button
                        onClick={() => {
                          window.localStorage.setItem(
                            'admClickedCategorie',
                            JSON.stringify(categoria),
                          );
                          navigate(
                            `/adm/categorias/${encodeURIComponent(
                              categoria.id,
                            )}`,
                          );
                        }}
                      >
                        ver detalhes
                      </button>
                      <button
                        className={
                          loadingDelete ? 'admProductDelete-active' : ''
                        }
                        onClick={() => {
                          handleClickDelete(categoria);
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
    </>
  );
};

export default TableCategorias;
