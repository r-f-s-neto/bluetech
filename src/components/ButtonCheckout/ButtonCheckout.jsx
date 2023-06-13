import React from 'react';
import './ButtonCheckout-styles.scss';

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
