import React from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

const SearchList = ({ keyword }) => {
  const { data, error } = useSelector((state) => state.search);

  /**React.useEffect(() => {
    let newData = null;
    newData = data?.filter((product) => {
      return product.name.includes(keyword);
    });
    console.log('o filterdData é: ', newData);

    setFilteredData(newData);
  }, [keyword]); */

  return (
    <>
      {data &&
        data.map((product) => {
          return (
            <Link
              to={`/produtos/${encodeURIComponent(product.id)}`}
              key={'SearchList' + product.name + product.id}
            >
              {' '}
              <li>{product.name.includes(keyword) ? product.name : null}</li>
            </Link>
          );
        })}
      {error && (
        <Alert variant="danger">"Não foi possível conectar ao servidor"</Alert>
      )}
    </>
  );
};

export default SearchList;
