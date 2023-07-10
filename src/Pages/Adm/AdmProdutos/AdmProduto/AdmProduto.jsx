import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdmProduto-styles.css';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import LoadingComp from '../../../../components/LoadingComp';

const AdmProduto = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  //const [photo, setPhoto] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [photo, setPhoto] = React.useState(undefined);

  const [product, setProduct] = React.useState(undefined);
  //const params = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.data);
  const [logadoAsAdm, setLogadoAsAdm] = React.useState(true);
  const [inventory, setInventory] = React.useState('');
  const [errorLoadingData, setErrorLoadingData] = React.useState(false);

  const [loadingPutProduct, setLoadingPutProduct] = React.useState(false);
  const [loadingImage, setLoadingImage] = React.useState(false);
  const [sucessPutProduct, setSucessPutProduct] = React.useState(false);
  const [sucessImg, setSucessImg] = React.useState(false);
  const [errorPutProduct, setErrorPutProduct] = React.useState(false);
  const [errorDeleteImg, setErrorDeleteImg] = React.useState(false);
  const [errorImg, setErrorImg] = React.useState(false);

  React.useEffect(() => {
    try {
      setProduct(JSON.parse(window.localStorage.getItem('admClickedProduct')));
    } catch {
      setErrorLoadingData(true);
    }
  }, []);

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

  /*React.useEffect(() => {
    setProduct(
      produtos?.find((produto) => {
        return produto.id === Number(params.id);
      }),
    );
  }, [params]);

  console.log(typeof product); */

  React.useEffect(() => {
    setName(product && product?.name);
    setPrice(product && product.price);
    //setPhoto(product&&product.images.length && product.images[0]);
    setDesc(product && product.description);
    setInventory(product && product.inventory);
  }, [product]);

  /** React.useEffect(() => {
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
  }, []); */

  async function handleSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify({
      name: name,
      description: desc,
      price: price,
      inventory: +inventory,
    });

    const url =
      'https://e-commerce-api-bluetech-production.up.railway.app/products/' +
      product?.id;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: data,
    };
    console.log(data);
    setLoadingPutProduct(true);
    setErrorPutProduct(false);
    setSucessPutProduct(false);
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        setSucessPutProduct(true);
        setErrorPutProduct(false);
      } else {
        setErrorPutProduct(true);
      }
    } catch (error) {
      setErrorPutProduct(true);
      setSucessPutProduct(false);
    } finally {
      setLoadingPutProduct(false);
    }

    if (photo) {
      setLoadingImage(true);
      const idImg = product?.images[0].id;
      try {
        const responseDeleteImg = await fetch(
          `https://e-commerce-api-bluetech-production.up.railway.app/products/images/${idImg}`,
          {
            method: 'DELETE',
            credentials: 'include',
          },
        );
        if (responseDeleteImg.ok) {
          const urlImage =
            'https://e-commerce-api-bluetech-production.up.railway.app/products/' +
            product?.id +
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
              setSucessImg('produto e imagem criados com sucesso');
              setErrorImg(null);
            } else {
              setErrorImg(
                'ocorreu um erro ao atualizar a imagem, tente novamente',
              );
            }
          } catch (error) {
            console.log(error);
            setErrorImg(
              'ocorreu um erro ao atualizar a imagem, tente novamente',
            );
          }
        } else {
          setErrorDeleteImg(true);
        }
      } catch (error) {
        setErrorDeleteImg(true);
      } finally {
        setLoadingImage(false);
      }
    }
  }
  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <Link to="/adm/produtos">{'< voltar'}</Link>
        <h1>Detalhes do produto</h1>
      </div>
      {errorLoadingData && (
        <Alert variant="danger">
          Não foi possível encontrar os dados, por favor tente mais tarde
        </Alert>
      )}
      <form
        className="NovoProduto__form"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label htmlFor="productName">Nome do produto</label>
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
        <label htmlFor="productPrice">Preço do produto</label>
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
        <label htmlFor="descricao">Descrição</label>
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
        <label htmlFor="estoque">Estoque</label>
        <input
          value={inventory}
          onChange={({ target }) => {
            setInventory(target.value);
          }}
          type="number"
          name="estoque"
          id="estoque"
          placeholder="estoque"
          required
        />
        <label htmlFor="productPhoto">Imagem</label>
        <input
          onChange={({ target }) => {
            setPhoto(target.files[0]);
          }}
          type="file"
          id="productPhoto"
          name="productPhoto"
          accept="image/*"
        />
        <button>Salvar</button>
      </form>
      {(loadingPutProduct || loadingImage) && <LoadingComp />}
      {sucessPutProduct && (
        <Alert variant="success">
          Dados do Produto atualizados com sucesso
        </Alert>
      )}
      {sucessImg && (
        <Alert variant="success">Imagem alterada com sucesso</Alert>
      )}
      {errorPutProduct && (
        <Alert variant="danger">
          Ocorreu um erro ao tentar atualizar, tente mais tarde
        </Alert>
      )}
      {(errorDeleteImg || errorImg) && (
        <Alert variant="danger">
          Ocorreu um erro ao tentar atualizar a imagem do produto, tente mais
          tarde
        </Alert>
      )}
    </div>
  );
};

export default AdmProduto;
