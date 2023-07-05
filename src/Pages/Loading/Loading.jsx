import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './Loading-styles.css';

const Loading = () => {
  return (
    <div className="spinLoader">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loading;
