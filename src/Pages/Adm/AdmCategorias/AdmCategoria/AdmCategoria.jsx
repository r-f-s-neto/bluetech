import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingComp from '../../../../components/LoadingComp';
import Alert from 'react-bootstrap/Alert';
import './AdmCategoria-styles.scss';

const AdmCategoria = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [categorie, setCategorie] = React.useState(null);
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [loadingUpdate, setLoadingUpdate] = React.useState(null)
  const [errorUpdate, setErrorUpdate] = React.useState(false)
  const [errorUpdateMensage, setErrorUpdateMensage] = React.useState(null);
  const [sucessUpdate, setSucessUpdate] = React.useState(false)

  const userData = useSelector((state) => state.userData.data);
  const [logadoAsAdm, setLogadoAsAdm] = React.useState(true);

  React.useEffect(() => {
    setCategorie(JSON.parse(window.localStorage.getItem('admClickedCategorie')) || "");

  }, [])

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
    setName(categorie && categorie.name);
    setDesc(categorie && categorie.description);
  }, [categorie]);

  async function handleSubmit (event) {
    event.preventDefault();

    const data = JSON.stringify({
      name: name,
      description: desc
    })

    const url = 'https://e-commerce-api-bluetech-production.up.railway.app/category/'+id
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json ; charset=utf-8'
      },
      credentials: 'include',
      body: data
    }
    setLoadingUpdate(true);

    try{
      const response = await fetch(url, options);
      if (response.ok) {
        setSucessUpdate(true);
        setErrorUpdate(false);
        setName('');
        setDesc('');
      }
    }catch (error){
      setErrorUpdate(true);
      setSucessUpdate(false);
      setErrorUpdateMensage(error);
    }finally{
      setLoadingUpdate(false);
    }

  }

  return (
    <div className="NovoProduto">
      <div className="NovoProduto__header">
        <Link to="/adm/categorias">{'< voltar'}</Link>
        <h1>Atualizar Categoria</h1>
      </div>
      <form onSubmit={(event)=>handleSubmit(event)} className="NovoProduto__form">
        <input
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          type="text"
          id="productName"
          name="productName"
          placeholder="Nome da categoria"
          required
        />
        <textarea
          value={desc}
          onChange={({ target }) => {
            setDesc(target.value);
          }}
          name="descricao"
          id="descricao"
          rows="5"
          placeholder="Descrição"
          required
        />
        <button>
          Salvar
        </button>
        {loadingUpdate && <LoadingComp />}
        {errorUpdate && <Alert variant='danger'>{errorUpdateMensage}</Alert>}
        {sucessUpdate && <Alert variant = 'success'>Categoria criada com sucesso</Alert>}
      </form>
    </div>
  )
}

export default AdmCategoria