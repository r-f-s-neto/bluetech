import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from '../../../../components/Select';
import Alert from 'react-bootstrap/Alert';
import './NovoProduto-styles.scss';
import { useSelector } from 'react-redux';

const NovoProduto = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [categoria, setCategoria] = React.useState('Componentes');
  const [dataCat, setDataCat] = React.useState([]);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.data);
  const [logadoAsAdm, setLogadoAsAdm] = React.useState(true);
  const [inventory, setInventory] = React.useState('');
  const [error, setError] = React.useState(null)
  const [sucess, setSucess] = React.useState(null)
  const [errorCat, setErrorCat] = React.useState(false)

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
    async function fetchCat () {
      try {
      const response = await fetch('https://e-commerce-api-bluetech-production.up.railway.app/category')
      if (response.ok) {
        const data = await response.json()
        const dataArray = data.map((e)=>{return e.name})
        setDataCat(dataArray)
      } else {
        const data = await response.json()
        setError(data)
        setErrorCat(true)
      }
    } catch (error) {
      setError(error)
      setErrorCat(true)
    }
    }
    fetchCat();
  }, []);

  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <Link to="/adm/produtos">{'< voltar'}</Link>
        <h1>Cadastro de produto</h1>
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
          value={photo}
          onChange={({ target }) => {
            setPhoto(null);
          }}
          type="file"
          id="productPhoto"
          name="productPhoto"
          accept="image/*"
          placeholder="Foto"
        />
        <button
          onClick={async (event) => {
            event.preventDefault();
            const dataJson =JSON.stringify( {
              name: name,
              description: desc,
              price: +price,
              inventory: +inventory,
              categories: [categoria]
            } )
            
            const data = new FormData();
            data.append("data", dataJson);
            console.log(Object.fromEntries(data));
            try{
            const response = await fetch(
              'https://e-commerce-api-bluetech-production.up.railway.app/products',
              {
                method: 'POST',
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                credentials:'include',
                body: data,
              },
            );

            console.log('o response é: ', response);

            if (response.ok){
              setSucess('Produto cadastrado com sucesso')
            } else {
              const dataJson = await response.json();
              setError(dataJson);
            }


          } catch (error){
            setError(error)
          }
          }}
        >
          Salvar
        </button>
        {error && <Alert variant='danger'>{error}</Alert>}
        {sucess&&<Alert variant = 'success'>{sucess}</Alert>}
      </form>
    </div>
  );
};

export default NovoProduto;
