import React from 'react';
import './Produtos-styles.scss';
import Categorias from '../../components/Categorias';
import Select from '../../components/Select';

const options = ['Mais Relevantes', 'Maior Preço', 'Menor Preço'];
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
];

const Produtos = () => {
  const [categoria, setCategoria] = React.useState('Tudo');
  const [filtroPreco, setFiltroPreco] = React.useState('Mais Relevantes');
  const [dataCat, setDataCat] = React.useState([]);
  const [dataProd, setDataProd] = React.useState(produtos);

  React.useEffect(() => {
    // Simula o recebimento de dados da categoria pela API
    setDataCat(['Tudo', 'Monitores', 'Cadeiras', 'Componentes', 'Gabinetes']);
  }, []);
  React.useEffect(() => {
    //simula a filtragem

    if (categoria === 'Tudo') {
      setDataProd(produtos);
    } else {
      const filteredProd = produtos.filter((produto) => {
        return produto.categoria === categoria;
      });
      setDataProd(filteredProd);
    }
  }, [categoria]);

  React.useEffect(() => {
    const verify = (filtro) => {
      switch (filtro) {
        case 'Mais Relevantes':
          return dataProd.sort((a, b) => a.id - b.id);
        case 'Menor Preço':
          return dataProd.sort((a, b) => a.preco - b.preco);
        case 'Maior Preço':
          return dataProd.sort((a, b) => a.preco - b.preco).reverse();
        default:
          return dataProd;
      }
    };
    const priceFilteredProd = verify(filtroPreco);
    setDataProd(priceFilteredProd);
  }, [filtroPreco, dataProd]);

  console.log(dataProd);

  return (
    <main className="produtos">
      <header className="produtos__Header">
        <div className="headerContainner">
          <h1 className="headerContainner__title">Produtos</h1>
          <p className="headerContainner__text">
            Os melhores produtos, com as melhores marcas e os melhores <br />{' '}
            preços você só encontra aqui na BlueTech
          </p>
        </div>
      </header>
      <div className="produtos__filtros">
        <Categorias
          value={categoria}
          setValue={setCategoria}
          categorias={dataCat}
        />
        <Select
          value={filtroPreco}
          setValue={setFiltroPreco}
          options={options}
        />
      </div>
    </main>
  );
};

export default Produtos;
