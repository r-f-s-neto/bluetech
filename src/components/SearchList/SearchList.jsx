import React from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

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
            <li>{product.name.includes(keyword) ? product.name : null}</li>
          );
        })}
      {error && <Alert>{error}</Alert>}
    </>
  );
};

export default SearchList;
