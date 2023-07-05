import React from 'react';
import './Select-styles.css';

const Select = ({ value, setValue, options, text }) => {
  return (
    <div className="SelectForm">
      <div className="SelectForm__sortBy">
        <p>{text}</p>
      </div>
      <select
        className="SelectForm__select"
        name="ordenar"
        id="ordenar"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
