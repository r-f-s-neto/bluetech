import React from 'react';
import './ButtonCheckout-styles.css';

const ButtonCheckout = ({ handleClick, text }) => {
  return (
    <button
      className="buttonCheckout"
      onClick={(event) => {
        handleClick(event);
      }}
    >
      {text}
    </button>
  );
};

export default ButtonCheckout;
