import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import './MinhaConta-styles.scss';
import mainUserImg from '../../assets/MinhaConta-assets/icons8-usuário-100.png';
import editUserImg from '../../assets/MinhaConta-assets/icons8-usuário-de-gênero-neutro-64.png';
import truckImg from '../../assets/MinhaConta-assets/icons8-caminhão-100.png';
import { useSelector } from 'react-redux';
import title from '../../helper/title';

const MinhaConta = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState('');
  const [error, setError] = React.useState(false);
  const [logado, setLogado] = React.useState(true);
  const userData = useSelector((state) => state.userData.data);

  React.useEffect(() => {
    if (userData) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, [userData]);

  React.useEffect(() => {
    if (!logado) {
      navigate('/login');
    }
  }, [logado, navigate]);

  React.useEffect(() => {
    try {
      setUserName(
        JSON.parse(window.localStorage.getItem('blueDataUser')).name.split(
          ' ',
        )[0],
      );
    } catch {
      setError(true);
    }
  }, []);

  React.useEffect(() => {
    title('BlueTech | Minha-Conta');
  }, []);

  return (
    <div className="MinhaConta">
      <aside className="MinhaConta__aside asideUsersData">
        <div className="asideUsersData__name">
          <img src={mainUserImg} alt="imagem padrão de usuário" />
          <div>
            <span>Bem vindo</span>
            <p>{userName}</p>
          </div>
        </div>
        {error && (
          <Alert variant="danger">
            Não foi possível acessar os dados, tente relogar
          </Alert>
        )}
        <div className="asideUsersData__options optionsUser">
          <button
            className="optionsUser__item"
            onClick={() => {
              navigate('/minha-conta/editar');
            }}
          >
            <img src={editUserImg} alt="imagem padrão de usuario" />
            <p>Editar meu perfil</p>
          </button>
          <button
            className="optionsUser__item"
            onClick={() => {
              navigate('/minha-conta/pedidos');
            }}
          >
            <img src={truckImg} alt="imagem de um caminhão de entregas" />
            <p>Pedidos</p>
          </button>
        </div>
      </aside>
      <div className="MinhaConta__content">
        <Outlet />
      </div>
    </div>
  );
};

export default MinhaConta;
