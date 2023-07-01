import React from 'react';
import { useSelector } from 'react-redux';
import LoadingComp from '../LoadingComp';
import Alert from 'react-bootstrap/Alert';

const SearchList = (keyword) => {
  const { data, loading, error } = useSelector((state) => state.search);
  const [filteredData, setFilteredData] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      const newData = data.filter((product) => {
        return product.includes(keyword);
      });
      setFilteredData(newData);
    }
  }, [data, keyword]);

  return (
    <>
      {filteredData &&
        filteredData.map((product) => {
          return <li>{product.name}</li>;
        })}
      {loading && <LoadingComp />}
      {error && <Alert>{error}</Alert>}
    </>
  );
};

export default SearchList;
