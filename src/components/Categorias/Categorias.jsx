import React from 'react';
import './Categorias-styles.scss';

const Categorias = ({ value, setValue, categorias }) => {
  return (
    <form className="formCat">
      {categorias.map((categoria) => {
        return (
          <div className="formCat__item" key={categoria}>
            <label
              className={value === categoria ? 'active' : ''}
              htmlFor={categoria}
            >
              {categoria}
            </label>
            <input
              id={categoria}
              value={categoria}
              checked={value === categoria}
              type="radio"
              onChange={({ target }) => setValue(target.value)}
            />
          </div>
        );
      })}
    </form>
  );
};

export default Categorias;
