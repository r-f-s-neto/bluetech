import React from 'react';
import { useSelector } from 'react-redux';
import LoadingComp from '../LoadingComp';
import Alert from 'react-bootstrap/Alert';

const SearchList = () => {
  const { data, loading, error } = useSelector((state) => state.search);

  return (
    <>
      {data &&
        data.map((product) => {
          return <li>{product.name}</li>;
        })}
      {loading && <LoadingComp />}
      {error && <Alert>{error}</Alert>}
    </>
  );
};

export default SearchList;
