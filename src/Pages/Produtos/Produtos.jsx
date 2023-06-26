import React from 'react';
import './Produtos-styles.scss';
import Categorias from '../../components/Categorias';
import Select from '../../components/Select';
import { filtroCat, filtroPrecificacao } from '../../helper/filtros';
import Card from '../../components/Card';
import Alert from 'react-bootstrap/Alert';

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

const Produtos = () => {
  const [categoria, setCategoria] = React.useState('Tudo');
  const [filtroPreco, setFiltroPreco] = React.useState('Mais Relevantes');
  const [dataCat, setDataCat] = React.useState([]);
  const [dataProd, setDataProd] = React.useState(produtos);
  const [error, setError] = React.useState(null);
  React.useEffect( () => {
    // Simula o recebimento de dados da categoria pela API
    async function fetchCat () {
      try {
      const response = await fetch('https://e-commerce-api-bluetech-production.up.railway.app/category')
      if (response.ok) {
        const data = await response.json()
        const dataArray = data.map((e)=>{return e.name})
        dataArray.unshift('Tudo')
        setDataCat(dataArray)
      } else {
        const data = await response.json()
        setError(data)
      }
    } catch (error) {
      setError(error)
    }
    }
    fetchCat();

  }, []);


  React.useEffect(() => {
    const filterdProd = produtos?.filter((produto) => {
      return filtroCat(produto, categoria);
    });

    setDataProd(filtroPrecificacao(filterdProd, filtroPreco));
  }, [categoria, filtroPreco]);

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
      {error&&<Alert variant="danger">{error}</Alert>}
      <div className="produtos__filtros">
        <div className="filtros__categorias">
          {dataCat && (
            <Categorias
              value={categoria}
              setValue={setCategoria}
              categorias={dataCat}
            />
          )}
        </div>
        <Select
          value={filtroPreco}
          setValue={setFiltroPreco}
          options={options}
          text="Ordenar por"
        />
      </div>
      <div className="produtos__card">
        {dataProd && <Card produtos={JSON.stringify(dataProd)} />}
      </div>
    </main>
  );
};

export default Produtos;
