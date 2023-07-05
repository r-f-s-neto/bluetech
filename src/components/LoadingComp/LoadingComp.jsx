import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingComp-styles.css';

const LoadingComp = () => {
  return (
    <div className="LoadingCompSpinner">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadingComp;
