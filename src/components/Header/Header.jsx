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
import { useDebounce } from '@uidotdev/usehooks';
import { listSearch } from '../../redux/search';
import SearchList from '../SearchList';
import userImg from '../../assets/Header-assets/icons8-usuário-30.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const debounceSearch = useDebounce(search, 2000);

  const [cart, setCart] = React.useState(0);
  const { pathname } = useLocation();
  const [adm, setAdm] = React.useState(false);
  const userData = useSelector((state) => state.userData.data);
  const [logado, setLogado] = React.useState(false);
  const refSearch = React.useRef(null);
  const [searchSugestionActivator, setSearchSugestionActivator] =
    React.useState(false);

  const { loading } = useSelector((state) => state.search);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (refSearch.current && !refSearch.current.contains(event.target)) {
        setSearchSugestionActivator(false);
      }
    }
    window.document.addEventListener('click', handleClickOutside, {
      capture: true,
    });
    return () => {
      window.document.removeEventListener('click', handleClickOutside, {
        capture: true,
      });
    };
  }, []);

  React.useEffect(() => {
    const searchProd = () => {
      if (debounceSearch && !loading) {
        dispatch(listSearch(search));
      }
    };

    searchProd();
  }, [debounceSearch, search, loading, dispatch]);

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
              <div className="searchContainner">
                <input
                  className="searchInput"
                  type="text"
                  value={search}
                  onChange={({ target }) => {
                    setSearch(target.value);
                  }}
                  onKeyDown={() => {
                    setSearchSugestionActivator(true);
                  }}
                  placeholder="Procurar"
                />
                <ul
                  ref={refSearch}
                  className={
                    searchSugestionActivator
                      ? 'searchSugestions--active'
                      : 'searchSugestions'
                  }
                >
                  <SearchList keyword={search} />
                </ul>
              </div>
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
                onClick={async (event) => {
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

                  try {
                    await fetch(
                      'https://e-commerce-api-bluetech-production.up.railway.app/user/logout',
                      {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json ; chartset=utf-8',
                        },
                        credentials: 'include',
                      },
                    );
                  } catch (error) {}

                  if (adm) {
                    navigate('/');
                  }

                  navigate('/');
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
          <li>
            <NavLink to="/minha-conta/editar" end>
              <img src={userImg} alt="imagem ilustrativa usuário" />
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
                    <NavLink to="/pedidos" end>
                      Pedidos
                    </NavLink>
                    {logado || adm ? (
                      <NavLink
                        to="/"
                        end
                        onClick={async (event) => {
                          event.preventDefault();
                          if (window.localStorage.getItem('blueDataUser')) {
                            window.localStorage.removeItem('blueDataUser');
                          }
                          if (window.localStorage.getItem('admClickedPedido')) {
                            window.localStorage.removeItem('admClickedPedido');
                          }
                          if (
                            window.localStorage.getItem('admClickedCategorie')
                          ) {
                            window.localStorage.removeItem(
                              'admClickedCategorie',
                            );
                          }
                          if (
                            window.localStorage.getItem('admClickedProduct')
                          ) {
                            window.localStorage.removeItem('admClickedProduct');
                          }

                          dispatch(addData(null));

                          try {
                            await fetch(
                              'https://e-commerce-api-bluetech-production.up.railway.app/user/logout',
                              {
                                method: 'GET',
                                headers: {
                                  'Content-Type':
                                    'application/json ; chartset=utf-8',
                                },
                                credentials: 'include',
                              },
                            );
                          } catch (error) {}

                          if (adm) {
                            navigate('/');
                          }

                          navigate('/');
                        }}
                      >
                        Logout
                      </NavLink>
                    ) : (
                      <NavLink to="/login" end>
                        Login
                      </NavLink>
                    )}
                    <NavLink to="/minha-conta/editar" end>
                      <img src={userImg} alt="imagem ilustrativa usuário" />
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
