import React from 'react';
import './NovoProduto-styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import Select from '../../../../components/Select';
import './NovoProduto-styles.scss';
import { useSelector } from 'react-redux';

const NovoProduto = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState();
  const [photo, setPhoto] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [categoria, setCategoria] = React.useState('Componentes');
  const [dataCat, setDataCat] = React.useState([]);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.data);
  const [logadoAsAdm, setLogadoAsAdm] = React.useState(false);

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
    setDataCat(['Monitores', 'Cadeiras', 'Componentes', 'Gabinetes']);
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

export default NovoProduto;
