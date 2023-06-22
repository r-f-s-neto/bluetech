import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Select from '../../../../components/Select';
import './AdmProduto-styles.scss';

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

const AdmProduto = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState();
  const [photo, setPhoto] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [categoria, setCategoria] = React.useState('Componentes');
  const [dataCat, setDataCat] = React.useState([]);

  const [product, setProduct] = React.useState(null);
  const params = useParams();

  React.useEffect(() => {
    setProduct(
      produtos?.find((produto) => {
        return produto.id === Number(params.id);
      }),
    );
  }, [params]);

  console.log(typeof product);

  React.useEffect(() => {
    setName(product && product.name);
    setPrice(product && product.preco);
    setPhoto(product && product.src);
    setDesc(product && product.shortDescription);
    setCategoria(product && product.categoria);
  }, [product]);

  React.useEffect(() => {
    // Simula o recebimento de dados da categoria pela API
    setDataCat(['Monitores', 'Cadeiras', 'Componentes', 'Gabinetes']);
  }, []);

  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <Link to="/adm/produtos">{'< voltar'}</Link>
        <h1>Detalhes do produto</h1>
      </div>
      <form className="NovoProduto__form">
        <input
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          type="text"
          id="productName"
          name="productName"
          placeholder="Nome do produto"
          required
        />
        <input
          value={price}
          onChange={({ target }) => {
            setPrice(target.value);
          }}
          type="number"
          id="productPrice"
          name="productPrice"
          placeholder="Preço"
          required
        />
        <input
          value={photo}
          onChange={({ target }) => {
            setPhoto(target.value);
          }}
          type="text"
          id="productPhoto"
          name="productPhoto"
          placeholder="Foto"
          required
        />
        {dataCat && (
          <Select
            value={categoria}
            setValue={setCategoria}
            options={dataCat}
            text="Categoria"
          />
        )}
        <textarea
          value={desc}
          onChange={({ target }) => {
            setDesc(target.value);
          }}
          name="descricao"
          id="descricao"
          rows="10"
          placeholder="Descrição"
          required
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            const data = {
              name: { name },
              preco: { price },
              src: { photo },
              categoria: { categoria },
              shortDescription: { desc },
            };
            console.log(data);
          }}
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default AdmProduto;
