import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global-styles.css';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
