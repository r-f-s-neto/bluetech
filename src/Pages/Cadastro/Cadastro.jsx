import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import './Cadastro-styles.css';
import LoadingComp from '../../components/LoadingComp';
import title from '../../helper/title';
import validatePassword from '../../helper/validatePassword';

const Cadastro = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState(false);
  const [sucess, setSucess] = React.useState(false);
  const [errorMensage, setErrorMensage] = React.useState(null);
  const userData = useSelector((state) => state.userData.data);
  const [logado, setLogado] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);

  React.useEffect(() => {
    if (userData) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, [userData]);

  React.useEffect(() => {
    if (logado) {
      navigate('/');
    }
  }, [logado, navigate]);

  React.useEffect(() => {
    title('BlueTech | Cadastro');
  }, []);

  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <Link to="/login">{'< voltar'}</Link>
        <h1>Cadastro do Cliente</h1>
      </div>
      <form
        className="NovoProduto__form"
        onSubmit={async (event) => {
          event.preventDefault();
          const data = {
            name: name,
            email: email,
            password: senha,
            role: 'client',
          };

          const url =
            'https://e-commerce-api-bluetech-production.up.railway.app/user';
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          };

          const validation = validatePassword(senha);

          if (!validation) {
            setErrorPassword(true);
          } else {
            setLoading(true);
            try {
              const response = await fetch(url, options);
              //const data = await response.json();

              if (response.ok) {
                setErro(false);
                setSucess(true);
                navigate('/login');
              } else {
                setErrorMensage(
                  'Não foi possivel efetuar o cadastro, tente mais tarde',
                );
                setErro(false);
              }
            } catch (error) {
              setErro(true);
              setSucess(false);
            } finally {
              setLoading(false);
            }
          }
        }}
      >
        <input
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          type="text"
          id="productName"
          name="productName"
          placeholder="Nome completo"
          required
        />
        <input
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          type="email"
          id="productPrice"
          name="productPrice"
          placeholder="Email"
          required
        />
        <input
          value={senha}
          onChange={({ target }) => {
            setSenha(target.value);
          }}
          type="password"
          id="productPhoto"
          name="productPhoto"
          placeholder="Senha"
          required
        />
        <button
          className={loading ? 'cadastroButtonDisable' : 'cadastroButton'}
        >
          Salvar
        </button>
      </form>
      {erro && (
        <Alert variant="danger">
          O cadastro não foi efetuado, tente novamente mais tarde
        </Alert>
      )}
      {errorMensage && <Alert variant="danger">{errorMensage}</Alert>}
      {sucess && <Alert variant="success">Cadastro efetuado com sucesso</Alert>}
      {errorPassword && (
        <Alert variant="danger">A senha precisa ter pelo menos 8 digitos</Alert>
      )}
      {loading && <LoadingComp />}
    </div>
  );
};

export default Cadastro;
