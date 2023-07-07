import React from 'react';
import ButtonOne from '../../components/ButtonOne/ButtonOne';
import AnimatedCarousel from '../../components/AnimatedCarousel/AnimatedCarousel';
import logoAsus from '../../assets/Home-assets/logo-asus.png';
import logoLogi from '../../assets/Home-assets/logo-logitech.png';
import logoSamsung from '../../assets/Home-assets/logo-samsung.png';
//import logoRazer from '../../assets/Home-assets/logo-razer.png';
import './Home-styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/products';
import LoadingComp from '../../components/LoadingComp';
import Alert from 'react-bootstrap/Alert';
import title from '../../helper/title';

const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState('[]');
  const {
    data: produtos,
    loading,
    error: errorListProduct,
  } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  React.useEffect(() => {
    //simula o recebimento dos dados do fetch
    /**  const imagesInfo = [
      {
        id: 1,
        src: 'https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg',
        alt: 'alt da imagem',
        name: 'produto 1',
        shortDescription: 'Descrição curta 1',
      },
      {
        id: 2,
        src: 'https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Legends-Preta-e-Vermelha-1468-858274-12-zoom.jpg',
        alt: 'alt da imagem',
        name: 'produto 2',
        shortDescription: 'Descrição curta 2',
      },
      {
        id: 3,
        src: 'https://www.pichauarena.com.br/wp-content/uploads/2022/04/dddd.png',
        alt: 'alt da imagem',
        name: 'produto 3',
        shortDescription: 'Descrição curta 3',
      },
      {
        id: 4,
        src: 'https://images.samsung.com/is/image/samsung/br-c49hg90-lc49hg90dmlxzd-black-308057473?$650_519_PNG$',
        alt: 'alt da imagem',
        name: 'produto 4',
        shortDescription: 'Descrição curta 4',
      },
    ];*/
    if (produtos?.length > 3) {
      setData(JSON.stringify(produtos.slice(0, 3)));
    } else {
      setData(JSON.stringify(produtos));
    }
  }, [data, produtos]);

  React.useEffect(() => {
    title('BlueTech | Home');
  }, []);

  return (
    <div className="homeContainner">
      <article className="homeContainner__text">
        <h1 className="text__title">Confira Todas As Nossas Promoções</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          aspernatur ipsam distinctio, asperiores recusandae, voluptates odio
          debitis illum veniam, incidunt reprehenderit a et animi nisi
          temporibus quas. Atque, cumque! Facilis!
        </p>
        <ButtonOne to="/promocoes" text="Confira" />
      </article>
      <AnimatedCarousel transitionTime={10000} arrayImages={data} />
      {loading && <LoadingComp />}
      {errorListProduct && (
        <Alert variant="danger">
          Não foi possível carregar os produtos, tente mais tarde
        </Alert>
      )}
      <ul className="logos">
        <li>
          <img className="logos__img" src={logoAsus} alt="Logo da Asus" />
        </li>
        <li>
          <img className="logos__img" src={logoLogi} alt="Logo da Gigabyte" />
        </li>
        <li>
          <img className="logos__img" src={logoSamsung} alt="Logo da Samsung" />
        </li>
        <li>
          <img className="logos__img" src={logoAsus} alt="Logo da Razer" />
        </li>
      </ul>
    </div>
  );
};

export default Home;
