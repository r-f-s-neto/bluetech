import React from 'react';
import { useLocation } from 'react-router-dom';

const Sucess = () => {
  const location = useLocation();
  const [query, setQuery] = React.useState(null);

  React.useEffect(() => {
    setQuery(new URLSearchParams(location.search));
  }, [location]);

  return <>{query && <h1>{query.get('mensagem').split('-').join(' ')}</h1>}</>;
};

export default Sucess;
