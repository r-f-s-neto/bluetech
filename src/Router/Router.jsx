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
      />
    </Routes>
  );
};

export default Router;
