import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../Pages/Loading';
const Home = lazy(() => import('../Pages/Home'));
const Produtos = lazy(() => import('../Pages/Produtos'));
const Promocoes = lazy(() => import('../Pages/Promocoes'));
const Login = lazy(() => import('../Pages/Login'));
const Produto = lazy(() => import('../Pages/Produtos/Produto'));

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
        path="/promocoes"
        element={
          <Suspense fallback={<Loading />}>
            <Promocoes />
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
    </Routes>
  );
};

export default Router;
