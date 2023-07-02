import React from 'react';
import './Adm-styles.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Adm = () => {
  const navigate = useNavigate();
  const param = useLocation();
  const userData = useSelector((state) => state.userData.data);
  const [logadoAsAdm, setLogadoAsAdm] = React.useState(true);

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

  return (
    <div className="admContainner">
      <header className="admBackground">
        <div className="admContainner__header">
          <div className="admHeader">
            <h1 className="admHeader__title">Painel Administrativo</h1>
            <span className="admHeader__span">Bem vindo</span>
          </div>
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
            <li
              className={
                param.pathname.includes('categorias')
                  ? 'admMenu__item active'
                  : 'admMenu__item'
              }
              onClick={() => {
                navigate('/adm/categorias');
              }}
            >
              Categorias
            </li>
          </ul>
        </nav>
        <Outlet />
      </main>
    </div>
  );
};

export default Adm;
