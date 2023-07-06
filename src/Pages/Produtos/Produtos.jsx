import React from 'react';
import './Produtos-styles.css';
import Categorias from '../../components/Categorias';
import Select from '../../components/Select';
import { filtroCat, filtroPrecificacao } from '../../helper/filtros';
import Card from '../../components/Card';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComp from '../../components/LoadingComp';
import { listProducts } from '../../redux/products';
import { paginar, createPag } from '../../helper/paginacao';
import PageButton from '../../components/PageButton';

const options = ['Mais Relevantes', 'Maior Preço', 'Menor Preço'];
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

const Produtos = () => {
  const dispatch = useDispatch();
  const [categoria, setCategoria] = React.useState('Tudo');
  const [filtroPreco, setFiltroPreco] = React.useState('Mais Relevantes');
  const [dataCat, setDataCat] = React.useState([]);
  const {
    data: produtos,
    loading,
    error: errorListProduct,
  } = useSelector((state) => state.products);

  const [dataProd, setDataProd] = React.useState(produtos);
  const [error, setError] = React.useState(null);
  const [prodPaginados, setProdPaginados] = React.useState(null);
  const [pagina, setPagina] = React.useState(0);
  const [arrPags, setArrPags] = React.useState(null);

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  React.useEffect(() => {
    // Simula o recebimento de dados da categoria pela API
    async function fetchCat() {
      try {
        const response = await fetch(
          'https://e-commerce-api-bluetech-production.up.railway.app/category',
        );
        if (response.ok) {
          const data = await response.json();
          const dataArray = data.map((e) => {
            return e.name;
          });
          dataArray.unshift('Tudo');
          setDataCat(dataArray);
        } else {
          const data = await response.json();
          setError(data);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchCat();
  }, []);

  React.useEffect(() => {
    const filterdProd = produtos?.filter((produto) => {
      return filtroCat(produto, categoria);
    });
    setPagina(0);
    setDataProd(filtroPrecificacao(filterdProd, filtroPreco));
  }, [categoria, filtroPreco, produtos]);

  React.useEffect(() => {
    if (dataProd) {
      setProdPaginados(paginar(dataProd, 8).arrProds);
    }
  }, [dataProd]);

  React.useEffect(() => {
    if (dataProd) {
      const qtd = paginar(dataProd, 8).qtdPaginas;
      setArrPags(createPag(qtd));
    }
  }, [dataProd]);

  return (
    <main className="produtos">
      <header className="produtosBackground">
        <div className="produtos__Header">
          <div className="headerContainner">
            <h1 className="headerContainner__title">Produtos</h1>
            <p className="headerContainner__text">
              Os melhores produtos, com as melhores marcas e os melhores <br />{' '}
              preços você só encontra aqui na BlueTech
            </p>
          </div>
        </div>
      </header>
      {error && <Alert variant="danger">{error}</Alert>}
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
        {prodPaginados && (
          <Card produtos={JSON.stringify(prodPaginados[pagina])} />
        )}
      </div>
      {loading && <LoadingComp />}
      {errorListProduct && (
        <Alert variant="danger">
          Ocorreu um erro ao tentar listar os produtos, tente mais tarde
        </Alert>
      )}
      <div className="Produtos__PageButton">
        {arrPags && (
          <PageButton arrPags={arrPags} setPagina={setPagina} pagina={pagina} />
        )}
      </div>
    </main>
  );
};

export default Produtos;
