import React from 'react';
import './Adm-styles.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Adm = () => {
  const navigate = useNavigate();
  const param = useLocation();

  return (
    <div className="admContainner">
      <header className="admContainner__header">
        <div className="admHeader">
          <h1 className="admHeader__title">Painel Administrativo</h1>
          <span className="admHeader__span">Bem vindo</span>
        </div>
      </header>

      <main className="admContainner__main">
        <nav>
          <ul className="admMenu">
            <li
              className={
                param.pathname.includes('produtos')
                  ? 'admMenu__item active'
                  : 'admMenu__item'
              }
              onClick={() => {
                navigate('/adm/produtos');
              }}
            >
              Produtos
            </li>
            <li
              className={
                param.pathname.includes('usuarios')
                  ? 'admMenu__item active'
                  : 'admMenu__item'
              }
              onClick={() => {
                navigate('/adm/usuarios');
              }}
            >
              Usuários
            </li>
            <li
              className={
                param.pathname.includes('pedidos')
                  ? 'admMenu__item active'
                  : 'admMenu__item'
              }
              onClick={() => {
                navigate('/adm/pedidos');
              }}
            >
              Pedidos
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
    </div>
  );
};

export default Adm;
