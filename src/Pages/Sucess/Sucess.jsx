import React from 'react';
import { useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import './Sucess-styles.css';

const Sucess = () => {
  const location = useLocation();
  const [query, setQuery] = React.useState(null);

  React.useEffect(() => {
    setQuery(new URLSearchParams(location.search));
  }, [location]);

  return (
    <div className="sucessBg">
      {query && (
        <Alert variant="success">
          {query.get('mensagem').split('-').join(' ')}
        </Alert>
      )}
    </div>
  );
};

export default Sucess;
