import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addData } from '../../redux/userData';
import { useDispatch, useSelector } from 'react-redux';
//import Cookies from 'js-cookie';
import Alert from 'react-bootstrap/Alert';
import './Login-styles.css';
import LoadingComp from '../../components/LoadingComp';
import title from '../../helper/title';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lembrar, setLembrar] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState(false);
  const [errorMensage, setErrorMensage] = React.useState(null);
  const userData = useSelector((state) => state.userData.data);
  const [logado, setLogado] = React.useState(false);

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
    if (window.localStorage.getItem('blueTechLogin')) {
      const savedLogin = window.localStorage.getItem('blueTechLogin');
      setEmail(savedLogin);
    }
  }, []);

  React.useEffect(() => {
    title('BlueTech | Login');
  }, []);

  return (
    <section className="loginBg">
      <div className="loginContainner">
        <h1>Bem vindo</h1>
        <span>Login com e-mail</span>

        <form method="" className="loginForm">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            required
          />
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={({ target }) => {
              setSenha(target.value);
            }}
            required
          />
          <div className="loginForm__footer">
            <div className="checkContainner">
              <input
                type="checkbox"
                id="lembrar"
                name="lembrar"
                value="true"
                checked={lembrar}
                onChange={({ target }) => {
                  setLembrar(target.checked);
                }}
              />
              <label htmlFor="lembrar">Lembrar</label>
            </div>
            <button
              className={loading ? 'buttonDisabled' : 'loginButton'}
              onClick={async (event) => {
                event.preventDefault();
                const emailAtClick = email;
                const senhaAtClick = senha;
                if (lembrar) {
                  window.localStorage.setItem('blueTechLogin', email);
                } else if (window.localStorage.getItem('blueTechLogin')) {
                  window.localStorage.setItem('blueTechLogin', '');
                }
                const options = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                    email: emailAtClick,
                    password: senhaAtClick,
                  }),
                };

                const url =
                  'https://e-commerce-api-bluetech-production.up.railway.app/user/login';
                setLoading(true);

                try {
                  const response = await fetch(url, options);
                  const data = await response.json();

                  if (response.ok) {
                    setErro(false);
                    window.localStorage.setItem(
                      'blueDataUser',
                      JSON.stringify(data),
                    );

                    //const token = data.token;

                    dispatch(addData(data));
                    if (data.role === 'admin') {
                      navigate('/adm/produtos');
                    } else {
                      navigate('/');
                    }
                  } else {
                    setErro(true);
                    setErrorMensage('Tente novamente mais tarde');
                  }
                } catch (error) {
                  setErro(true);
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading ? true : false}
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
      {loading && <LoadingComp />}
      {erro && (
        <Alert variant="danger">
          Ocorreu um erro ao tentar conectar ao servidor
        </Alert>
      )}
      {errorMensage && <Alert variant="danger">{errorMensage}</Alert>}
      <Link to="/cadastro">criar conta</Link>
    </section>
  );
};

export default Login;
