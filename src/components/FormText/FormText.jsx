import React from 'react';
import './FormText-styles.css';

const FormText = ({ htmlFor, label, value, setValue, type, ...props }) => {
  return (
    <div className="formText">
      <label className="formText__label" htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className="formText__input"
        id={htmlFor}
        name={htmlFor}
        type={type}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      />
    </div>
  );
};

export default FormText;
