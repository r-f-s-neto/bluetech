import React from 'react';
import { useLocation } from 'react-router-dom';

const Sucess = () => {
  const { query } = useLocation();
  return <div>{query && query.mensagem.split('-').join(' ')}</div>;
};

export default Sucess;
