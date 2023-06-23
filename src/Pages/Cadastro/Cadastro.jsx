import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro-styles.scss';

const Cadastro = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState(false);
  const [errorMensage, setErrorMensage] = React.useState(null);

  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <Link to="/login">{'< voltar'}</Link>
        <h1>Cadastro do Cliente</h1>
      </div>
      <form className="NovoProduto__form">
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
          onClick={async (event) => {
            event.preventDefault();
            const data = {
              name: name,
              email: email,
              password: senha,
              role: 'client',
            };
            console.log(data);
            setLoading(true);
            const url =
              'https://e-commerce-api-bluetech-production.up.railway.app/user';
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            };
            try {
              const response = await fetch(url, options);
              const data = await response.json();
              console.log('response.ok', response.ok);
              if (response.ok) {
                setErro(false);
                navigate('/sucess?mensagem=cadastro-efetuado-com-sucesso');
              } else {
                setErrorMensage(data);
                setErro(false);
              }
            } catch (error) {
              console.log(error);
              setErro(true);
            } finally {
              setLoading(false);
            }
          }}
        >
          Salvar
        </button>
      </form>
      {erro && <span>O cadastro não foi efetuado</span>}
      {errorMensage}
    </div>
  );
};

export default Cadastro;
