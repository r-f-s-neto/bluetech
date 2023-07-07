import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from '../../../../components/Select';
import Alert from 'react-bootstrap/Alert';
import './NovoProduto-styles.css';
import { useSelector } from 'react-redux';
import LoadingComp from '../../../../components/LoadingComp';

const NovoProduto = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [photo, setPhoto] = React.useState(null);
  const [desc, setDesc] = React.useState('');
  const [categoria, setCategoria] = React.useState('Componentes');
  const [dataCat, setDataCat] = React.useState([]);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.data);
  const [logadoAsAdm, setLogadoAsAdm] = React.useState(true);
  const [inventory, setInventory] = React.useState('');
  const [errorCat, setErrorCat] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [sucess, setSucess] = React.useState(false);
  const [loadingPostProduct, setLoadingProduct] = React.useState(false);

  // console.log('os cookies são: ', document.cookie)

  /* async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('description', desc);
    data.append('price', price);
    data.append('inventory', inventory);
    data.append('categories', categoria);
    data.append('files', photo);

    const response = await fetch(
      'https://e-commerce-api-bluetech-production.up.railway.app/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        credentials: 'include',
        body: data,
      },
    );

    console.log('o response é: ', response);

    const dataJson = await response.json();

    console.log('o json retornado é: ', dataJson);

    console.log(response.ok);
  } */

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
          setDataCat(dataArray);
        } else {
          //const data = await response.json();
          setError(
            'ocorreu um erro ao buscar as categorias no servidor, tente mais tarde',
          );
          setErrorCat(true);
        }
      } catch (error) {
        setError(
          'ocorreu um erro ao buscar as categorias no servidor, tente mais tarde',
        );
        setErrorCat(true);
      }
    }
    fetchCat();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify({
      name: name,
      description: desc,
      price: +price,
      inventory: +inventory,
      categories: [categoria],
    });

    setLoadingProduct(true);
    setError(null);
    setSucess(null);
    try {
      const response = await fetch(
        'https://e-commerce-api-bluetech-production.up.railway.app/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          credentials: 'include',
          body: data,
        },
      );

      if (response.ok) {
        const data = await response.json();
        const idProduct = data.id;
        const urlImage =
          'https://e-commerce-api-bluetech-production.up.railway.app/products/' +
          idProduct +
          '/images';

        const formData = new FormData();
        formData.append('images', photo);

        const optionsImage = {
          method: 'POST',
          credentials: 'include',
          body: formData,
        };

        try {
          const responseImg = await fetch(urlImage, optionsImage);

          if (responseImg.ok) {
            setSucess('produto e imagem criados com sucesso');
            setError(null);
          }
        } catch (error) {
          setError(error);
          setSucess(null);
        } finally {
          setLoadingProduct(false);
        }
        //setSucess('Produto cadastrado com sucesso');
        //setError(null);
      }
    } catch (error) {
      setError(error);
      setSucess(null);
    } finally {
      setLoadingProduct(false);
    }
  }

  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <Link to="/adm/produtos">{'< voltar'}</Link>
        <h1>Cadastro de produto</h1>
      </div>
      <form
        className="NovoProduto__form"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
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
          value={inventory}
          onChange={({ target }) => {
            setInventory(target.value);
          }}
          type="number"
          id="productInventory"
          name="inventory"
          placeholder="Estoque"
          required
        />
        {dataCat && !errorCat && (
          <Select
            value={categoria}
            setValue={setCategoria}
            options={dataCat}
            text="Categoria"
          />
        )}

        <input
          onChange={({ target }) => {
            setPhoto(target.files[0]);
          }}
          type="file"
          id="productPhoto"
          name="productPhoto"
          accept="image/*"
          required
        />
        <button
          className={
            loadingPostProduct ? 'newProductBtn--disable' : 'newProductBtn'
          }
        >
          Salvar
        </button>
        {loadingPostProduct && <LoadingComp />}
        {error && <Alert variant="danger">{error}</Alert>}
        {sucess && <Alert variant="success">{sucess}</Alert>}
      </form>
    </div>
  );
};

export default NovoProduto;
