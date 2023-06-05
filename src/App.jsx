import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global-styles.css';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
