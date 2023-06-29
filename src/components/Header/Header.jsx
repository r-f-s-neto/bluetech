import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header-styles.css';
import { ReactComponent as Lupa } from '../../assets/Header-assets/Search.svg';
import { ReactComponent as Bag } from '../../assets/Header-assets/Vector.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../../redux/userData';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [cart, setCart] = React.useState(0);
  const { pathname } = useLocation();
  const [adm, setAdm] = React.useState(false);
  const userData = useSelector((state) => state.userData.data);
  const [logado, setLogado] = React.useState(false);
  const state = useSelector((state) => {
    return state.cart.data?.reduce((acc, curr) => {
      return acc + curr.quantidade;
    }, 0);
  });

  React.useEffect(() => {
    if (userData) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, [userData]);

  React.useEffect(() => {
    if (pathname.includes('adm')) {
      setAdm(true);
    } else {
      setAdm(false);
    }
  }, [pathname]);

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
          {!adm && (
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
                  <NavLink
                    className="menu__item"
                    to="/pedidos"
                    end
                    onClick={(event) => {
                      event.preventDefault();
                      if (logado) {
                        navigate('/pedidos');
                      } else {
                        navigate('/login');
                      }
                    }}
                  >
                    Pedidos
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
          {!adm && (
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
          )}
        </div>

        <ul className="topo__item userMenu">
          {!adm && (
            <li className="userMenu__item">
              <div>
                <NavLink
                  to="/carrinho"
                  end
                  onClick={(event) => {
                    event.preventDefault();
                    logado ? navigate('/carrinho') : navigate('/login');
                  }}
                >
                  <Bag />
                </NavLink>
              </div>
              <span>{logado ? cart : 0}</span>
            </li>
          )}
          <li>
            {adm || logado ? (
              <NavLink
                className="login"
                to="/"
                onClick={(event) => {
                  event.preventDefault();
                  if (window.localStorage.getItem('blueDataUser')) {
                    window.localStorage.removeItem('blueDataUser');
                  }
                  if (window.localStorage.getItem('admClickedPedido')) {
                    window.localStorage.removeItem('admClickedPedido');
                  }
                  if (window.localStorage.getItem('admClickedCategorie')) {
                    window.localStorage.removeItem('admClickedCategorie');
                  }
                  if (window.localStorage.getItem('admClickedProduct')) {
                    window.localStorage.removeItem('admClickedProduct');
                  }

                  dispatch(addData(null));
                  if(adm) {
                    navigate('/');
                  }
                }}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink className="login" to="/login">
                Login
              </NavLink>
            )}
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
                    <NavLink to="/pedidos" end>
                      Pedidos
                    </NavLink>
                    {logado || adm ? (
                      <NavLink to="/logout" end>
                        Logout
                      </NavLink>
                    ) : (
                      <NavLink to="/login" end>
                        Login
                      </NavLink>
                    )}
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
