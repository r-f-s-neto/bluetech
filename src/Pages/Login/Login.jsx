import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addData } from '../../redux/userData';
import { useDispatch } from 'react-redux';
import './Login-styles.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lembrar, setLembrar] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState(false);

  React.useEffect(() => {
    if (window.localStorage.getItem('blueTechLogin')) {
      const savedLogin = window.localStorage.getItem('blueTechLogin');
      setEmail(savedLogin);
    }
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
                  console.log('a response é: ', response);
                  if (response.ok) {
                    setErro(false);
                    try {
                      const responseUserData = await fetch(
                        'https://e-commerce-api-bluetech-production.up.railway.app/user/' +
                          emailAtClick,
                      );
                      const userData = await responseUserData.json();
                      dispatch(addData(userData));
                      if (userData.role === 'admin') {
                        navigate('/adm');
                      } else {
                        navigate('/');
                      }
                    } catch {
                      setErro(true);
                    }
                  } else {
                    setErro(true);
                  }
                } catch (error) {
                  console.log('erro: ', error);
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
      {erro && <span>insira email e senha válidos</span>}
      <Link to="/cadastro">criar conta</Link>
    </section>
  );
};

export default Login;
