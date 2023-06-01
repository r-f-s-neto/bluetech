import React from 'react';
import './Select-styles.scss';

const Select = ({ value, setValue, options }) => {
  return (
    <form className="SelectForm">
      <div className="SelectForm__sortBy">
        <p>Ordenar por</p>
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
    </form>
  );
};

export default Select;
