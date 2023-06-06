import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header-styles.css';
import { ReactComponent as Lupa } from '../../assets/Header-assets/Search.svg';
import { ReactComponent as Bag } from '../../assets/Header-assets/Vector.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux';

const Header = () => {
  const [search, setSearch] = React.useState('');
  const [cart, setCart] = React.useState(0);
  const state = useSelector((state) => {
    return state.data?.reduce((acc, curr) => {
      return acc + curr.quantidade;
    }, 0);
  });

  React.useEffect(() => {
    setCart(state);
  }, [state]);

  return (
    <header className="headerMenu">
      <div className="topo">
        <div className="topo__item">
          <div className="logo">
            <NavLink to="/" end>
              BlueTech
            </NavLink>
          </div>
          <nav>
            <ul className="menu">
              <li>
                <NavLink className="menu__item" to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="menu__item" to="/produtos" end>
                  Produtos
                </NavLink>
              </li>
              <li>
                <NavLink className="menu__item" to="/promocoes" end>
                  Promoções
                </NavLink>
              </li>
            </ul>
          </nav>
          <form>
            <input
              className="searchInput"
              type="text"
              value={search}
              onChange={({ target }) => {
                setSearch(target.value);
              }}
              placeholder="Procurar"
            />
            <button>
              <Lupa />
            </button>
          </form>
        </div>

        <ul className="topo__item userMenu">
          <li className="userMenu__item">
            <div>
              <NavLink>
                <Bag />
              </NavLink>
            </div>
            <span>{cart}</span>
          </li>
          <li>
            <NavLink className="login" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
        <div className="mobileMenu">
          <Navbar expand={false}>
            <Container fluid className="mob">
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${false}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${false}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink to="/" end>
                      Home
                    </NavLink>
                    <NavLink to="/produtos" end>
                      Produtos
                    </NavLink>
                    <NavLink to="/promocoes" end>
                      Promoções
                    </NavLink>
                    <NavLink to="/login" end>
                      Login
                    </NavLink>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      </div>
    </header>
  );
};

export default Header;
