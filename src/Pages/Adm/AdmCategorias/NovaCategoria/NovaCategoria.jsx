import React from 'react';
import './NovaCategoria-styles.css';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../../components/LoadingComp';

const NovaCategoria = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const userData = useSelector((state) => state.userData.data);
  const [logadoAsAdm, setLogadoAsAdm] = React.useState(true);
  const [loadingCreate, setLoadingCreate] = React.useState(null);
  const [errorCreate, setErrorCreate] = React.useState(false);
  const [errorCreateMensage, setErrorCreateMensage] = React.useState(null);
  const [sucessCreate, setSucessCreate] = React.useState(false);

  React.useEffect(() => {
    if (userData) {
      if (userData.role === 'admin') {
        setLogadoAsAdm(true);
      }
    } else {
      setLogadoAsAdm(false);
    }
  }, [userData]);

  React.useEffect(() => {
    if (!logadoAsAdm) {
      navigate('/login');
    }
  }, [logadoAsAdm, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = JSON.stringify({
      name: name,
      description: desc,
    });

    const url =
      'https://e-commerce-api-bluetech-production.up.railway.app/category';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ; charset=utf-8',
      },
      credentials: 'include',
      body: data,
    };

    setLoadingCreate(true);

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        setSucessCreate(true);
        setErrorCreate(false);
        setName('');
        setDesc('');
      }
    } catch (error) {
      setErrorCreate(true);
      setSucessCreate(false);
      setErrorCreateMensage(error);
    } finally {
      setLoadingCreate(false);
    }
  }

  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <Link to="/adm/categorias">{'< voltar'}</Link>
        <h1>Cadastro de categoria</h1>
      </div>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="NovoProduto__form"
      >
        <input
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          type="text"
          id="productName"
          name="productName"
          placeholder="Nome da categoria"
          required
        />
        <textarea
          value={desc}
          onChange={({ target }) => {
            setDesc(target.value);
          }}
          name="descricao"
          id="descricao"
          rows="5"
          placeholder="Descrição"
          required
        />
        <button>Salvar</button>
        {loadingCreate && <LoadingComp />}
        {errorCreate && <Alert variant="danger">{errorCreateMensage}</Alert>}
        {sucessCreate && (
          <Alert variant="success">Categoria criada com sucesso</Alert>
        )}
      </form>
    </div>
  );
};

export default NovaCategoria;
