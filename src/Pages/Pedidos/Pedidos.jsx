import React from 'react';
import './Pedidos-styles.css';
//import { useSelector } from 'react-redux';
import PurshCard from '../../components/PurshCard';
import { useDispatch, useSelector } from 'react-redux';
import { listClientOrders } from '../../redux/pedidosClient';
import LoadingComp from '../../components/LoadingComp';
import Alert from 'react-bootstrap/Alert';
import title from '../../helper/title';

/** const produtos = [
  {
    id: 1,
    src: 'https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg',
    alt: 'alt da imagem',
    name: 'produto 1',
    shortDescription: 'Descrição curta 1',
    categoria: 'Componentes',
    preco: 1000,
  },
  {
    id: 2,
    src: 'https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Legends-Preta-e-Vermelha-1468-858274-12-zoom.jpg',
    alt: 'alt da imagem',
    name: 'produto 2',
    shortDescription: 'Descrição curta 2',
    categoria: 'Cadeiras',
    preco: 2000,
  },
  {
    id: 3,
    src: 'https://www.pichauarena.com.br/wp-content/uploads/2022/04/dddd.png',
    alt: 'alt da imagem',
    name: 'produto 3',
    shortDescription: 'Descrição curta 3',
    categoria: 'Gabinetes',
    preco: 500,
  },
  {
    id: 4,
    src: 'https://images.samsung.com/is/image/samsung/br-c49hg90-lc49hg90dmlxzd-black-308057473?$650_519_PNG$',
    alt: 'alt da imagem',
    name: 'produto 4',
    shortDescription: 'Descrição curta 4',
    categoria: 'Monitores',
    preco: 5000,
  },
  {
    id: 5,
    src: 'https://www.pichauarena.com.br/wp-content/uploads/2022/04/dddd.png',
    alt: 'alt da imagem',
    name: 'produto 5',
    shortDescription: 'Descrição curta 5',
    categoria: 'Gabinetes',
    preco: 900,
  },
]; */

const Pedidos = () => {
  // const compras = useSelector((state) => state.checkoutValue.pedidos);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);
  const { loading: loadingCompras, error: errorCompras } = useSelector(
    (state) => state.pedidosClient,
  );

  React.useEffect(() => {
    if (userData) {
      console.log('entrou');
      dispatch(listClientOrders(userData.id));
    }
  }, [dispatch, userData]);

  React.useEffect(() => {
    title('BlueTech | Pedidos');
  }, []);

  return (
    <div className="pedidos">
      <header className="pedidosBackground">
        <div className="pedidos__Header">
          <div className="headerContainnerPedidos">
            <h1 className="headerContainnerPedidos__title">Pedidos</h1>
            <p className="headerContainnerPedidos__text">
              Os melhores produtos, com as melhores marcas e os melhores <br />{' '}
              preços você só encontra aqui na BlueTech
            </p>
          </div>
        </div>
      </header>
      <div className="pedidos__list">
        <PurshCard />
      </div>
      {loadingCompras && <LoadingComp />}
      {errorCompras && (
        <Alert variant="danger">
          Não foi possível carregar os pedidos, tente mais tarde
        </Alert>
      )}
    </div>
  );
};

export default Pedidos;
