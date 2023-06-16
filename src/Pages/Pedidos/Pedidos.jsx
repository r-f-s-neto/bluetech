import React from 'react';
import './Pedidos-styles.scss';
import { useSelector } from 'react-redux';
import PurshCard from '../../components/PurshCard';

const produtos = [
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
];

const Pedidos = () => {
  const compras = useSelector((state) => state.checkoutValue.pedidos);
  return (
    <main className="pedidos">
      <header className="pedidos__Header">
        <div className="headerContainnerPedidos">
          <h1 className="headerContainnerPedidos__title">Pedidos</h1>
          <p className="headerContainnerPedidos__text">
            Os melhores produtos, com as melhores marcas e os melhores <br />{' '}
            preços você só encontra aqui na BlueTech
          </p>
        </div>
      </header>
      <div className="pedidos__list">
        <PurshCard
          compras={JSON.stringify(compras)}
          produtos={JSON.stringify(produtos)}
        />
      </div>
    </main>
  );
};

export default Pedidos;
