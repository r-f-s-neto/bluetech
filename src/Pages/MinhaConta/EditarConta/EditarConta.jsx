import React from 'react';
import LoadingComp from '../../../components/LoadingComp';
import Alert from 'react-bootstrap/Alert';
import './EditarConta-styles.css';

const EditarConta = () => {
  const [loadingUpdateUser, setLoadingUpdateUser] = React.useState(false);
  const [errorUpdateUser, setErrorUpdateUser] = React.useState(false);
  const [sucessUpdateUser, setSucessUpdateUser] = React.useState(null);
  const [errorUpdateMensage, setErrorUpdateMensage] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    try {
      const user = JSON.parse(window.localStorage.getItem('blueDataUser'));
      setEmail(user.email);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const url =
      'https://e-commerce-api-bluetech-production.up.railway.app/user/' + email;
    const data = JSON.stringify({
      name: name,
      password: password,
    });
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include',
      body: data,
    };
    setLoadingUpdateUser(true);
    setSucessUpdateUser(false);
    setErrorUpdateUser(false);
    setErrorUpdateMensage(null);
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        setSucessUpdateUser('Cadastro Atualizado');
        setErrorUpdateUser(false);
        setErrorUpdateMensage(null);
        const newUserData = JSON.parse(
          window.localStorage.getItem('blueDataUser'),
        );
        newUserData.name = name ? name : newUserData.name;
        window.localStorage.setItem(
          'blueDataUser',
          JSON.stringify(newUserData),
        );
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
      }
    } catch (error) {
      setErrorUpdateUser(true);
      setErrorUpdateMensage('Tente novamente mais tarde');
    } finally {
      setLoadingUpdateUser(false);
    }
  }

  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <h1>Atualização Cadastral</h1>
      </div>
      {error && (
        <Alert variant="danger">
          Não foi possível identificar o usuário, faça o login novamente
        </Alert>
      )}
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
          placeholder="Nome de Usuário"
          required
        />
        <input
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          type="password"
          name="descricao"
          id="descricao"
          rows="5"
          placeholder="Senha"
          required
        />
        <button
          className={!email || loadingUpdateUser ? 'updateUserBtn-disable' : ''}
        >
          Salvar
        </button>
        {loadingUpdateUser && <LoadingComp />}
        {errorUpdateUser && (
          <Alert variant="danger">{errorUpdateMensage}</Alert>
        )}
        {sucessUpdateUser && (
          <Alert variant="success">Categoria criada com sucesso</Alert>
        )}
      </form>
    </div>
  );
};

export default EditarConta;
