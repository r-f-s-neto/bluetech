import React from 'react';
import { Link } from 'react-router-dom';
import './Login-styles.scss';

const Login = () => {
  const [lembrar, setLembrar] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

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
              onClick={(event) => {
                event.preventDefault();
                if (lembrar) {
                  window.localStorage.setItem('blueTechLogin', email);
                } else if (window.localStorage.getItem('blueTechLogin')) {
                  window.localStorage.setItem('blueTechLogin', '');
                }
              }}
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
      <Link>criar conta</Link>
    </section>
  );
};

export default Login;
