import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../Pages/Loading';
const Home = lazy(() => import('../Pages/Home'));
const Produtos = lazy(() => import('../Pages/Produtos'));
const Pedidos = lazy(() => import('../Pages/Pedidos'));
const Login = lazy(() => import('../Pages/Login'));
const Produto = lazy(() => import('../Pages/Produtos/Produto'));
const Carrinho = lazy(() => import('../Pages/Carrinho'));
const Checkout = lazy(() => import('../Pages/Checkout'));
const Frete = lazy(() => import('../Pages/Checkout/Frete'));
const Endereco = lazy(() => import('../Pages/Checkout/Endereco'));
const Pagamento = lazy(() => import('../Pages/Checkout/Pagamento'));
const Adm = lazy(() => import('../Pages/Adm'));
const AdmProdutos = lazy(() => import('../Pages/Adm/AdmProdutos'));
const AdmUsuarios = lazy(() => import('../Pages/Adm/AdmUsuarios'));
const AdmPedidos = lazy(() => import('../Pages/Adm/AdmPedidos'));
const AdmCategorias = lazy(()=>import('../Pages/Adm/AdmCategorias'))
const NovoProduto = lazy(() => import('../Pages/Adm/AdmProdutos/NovoProduto'));
const AdmProduto = lazy(() => import('../Pages/Adm/AdmProdutos/AdmProduto'));
const Cadastro = lazy(() => import('../Pages/Cadastro'));
const Sucess = lazy(() => import('../Pages/Sucess'));
const NovaCategoria = lazy(()=> import('../Pages/Adm/AdmCategorias/NovaCategoria'));
const AdmCategoria = lazy(()=>import('../Pages/Adm/AdmCategorias/AdmCategoria'))

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/produtos"
        element={
          <Suspense fallback={<Loading />}>
            <Produtos />
          </Suspense>
        }
      />
      <Route
        path="/produtos/:id"
        element={
          <Suspense fallback={<Loading />}>
            <Produto />
          </Suspense>
        }
      />
      <Route
        path="/pedidos"
        element={
          <Suspense fallback={<Loading />}>
            <Pedidos />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/carrinho"
        element={
          <Suspense fallback={<Loading />}>
            <Carrinho />
          </Suspense>
        }
      />
      <Route
        path="/checkout"
        element={
          <Suspense fallback={<Loading />}>
            <Checkout />
          </Suspense>
        }
      >
        <Route
          path="endereco"
          element={
            <Suspense fallback={<Loading />}>
              <Endereco />
            </Suspense>
          }
        />
        <Route
          path="frete"
          element={
            <Suspense fallback={<Loading />}>
              <Frete />
            </Suspense>
          }
        />
        <Route
          path="pagamento"
          element={
            <Suspense fallback={<Loading />}>
              <Pagamento />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/adm"
        element={
          <Suspense fallback={<Loading />}>
            <Adm />
          </Suspense>
        }
      >
        <Route
          path="produtos"
          element={
            <Suspense fallback={<Loading />}>
              <AdmProdutos />
            </Suspense>
          }
        />
        <Route
          path="usuarios"
          element={
            <Suspense fallback={<Loading />}>
              <AdmUsuarios />
            </Suspense>
          }
        />
        <Route
          path="pedidos"
          element={
            <Suspense fallback={<Loading />}>
              <AdmPedidos />
            </Suspense>
          }
        />
        <Route path='categorias' element={<Suspense fallback={<Loading />}><AdmCategorias /></Suspense>} />
      </Route>
      <Route
        path="/adm/produtos/add"
        element={
          <Suspense fallback={<Loading />}>
            <NovoProduto />
          </Suspense>
        }
      />
      <Route
        path="/adm/produtos/:id"
        element={
          <Suspense fallback={<Loading />}>
            <AdmProduto />
          </Suspense>
        }
      />
      <Route
        path="/cadastro"
        element={
          <Suspense fallback={<Loading />}>
            <Cadastro />
          </Suspense>
        }
      />
      <Route
        path="/sucess"
        element={
          <Suspense fallback={<Loading />}>
            <Sucess />
          </Suspense>
        }
      />
      <Route path='/adm/categorias/add' element={<Suspense fallback={<Loading />}><NovaCategoria /></Suspense>}/>
      <Route path='/adm/categorias/:id' element={<Suspense fallback={<Loading />}><AdmCategoria /></Suspense>} />
    </Routes>
  );
};

export default Router;
