import React from 'react';
import { NavLink } from 'react-router-dom';
import './ButtonOne-styles.scss';

const ButtonOne = ({ to, text }) => {
  return (
    <NavLink className="buttonOne" to={to} end>
      {text}
    </NavLink>
  );
};

export default ButtonOne;
