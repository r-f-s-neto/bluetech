import React from 'react';
import './Footer-styles.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [newsletter, setNewsletter] = React.useState('');
  return (
    <footer>
      <div className="footer__container">
        <article className="container__item">
          <h3>Assine a Nossa Newsletter</h3>
          <span>Fique por dentro de todas as novidades</span>
          <form className="newsletterForm">
            <input
              className="newsletterForm__input"
              type="email"
              placeholder="Insira Seu Melhor E-mail"
              value={newsletter}
              onChange={({ target }) => setNewsletter(target.value)}
            />
            <button className="newsletterForm__button" type="submit">
              Assinar
            </button>
          </form>
        </article>
        <article className="container__item">
          <h3 className="footerOptions">Categorias</h3>
          <ul>
            <li>
              <NavLink to="/produtos/monitores" end>
                Monitores
              </NavLink>
            </li>
            <li>
              <NavLink to="/produtos/componentes" end>
                Componentes
              </NavLink>
            </li>
            <li>
              <NavLink to="/produtos/perifericos" end>
                Perifericos
              </NavLink>
            </li>
          </ul>
        </article>
        <article className="container__item">
          <h3 className="footerOptions">Ajuda</h3>
          <ul>
            <li>
              <NavLink>Central de Ajuda</NavLink>
            </li>
            <li>
              <NavLink>Status do Pedido</NavLink>
            </li>
            <li>
              <NavLink>Reembolso e Garantia</NavLink>
            </li>
            <li>
              <NavLink>Carrinho</NavLink>
            </li>
            <li>
              <NavLink>Fale Conosco</NavLink>
            </li>
          </ul>
        </article>
        <article className="container__item">
          <h3 className="footerOptions">Sobre nós</h3>
          <ul>
            <li>
              <NavLink>Quem Somos</NavLink>
            </li>
            <li>
              <NavLink>Responsabilidades</NavLink>
            </li>
            <li>
              <NavLink>Tecnologia e Inovação</NavLink>
            </li>
            <li>
              <NavLink>Nos Siga nas Redes Sociais</NavLink>
            </li>
          </ul>
        </article>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
