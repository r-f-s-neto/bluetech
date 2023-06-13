import React from 'react';

const FormSelect = ({ options, label, htmlFor, value, setValue }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        name={htmlFor}
        id={htmlFor}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      >
        {options.map((option) => {
          return (
            <option key={option + htmlFor} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
