import React from 'react';
import './PageButton-styles.css';
const PageButton = ({ arrPags, setPagina, pagina }) => {
  return (
    <div className="PageButtonHeader">
      {arrPags &&
        arrPags.map((pageNumber) => {
          return (
            <button
              key={'PageButton' + pageNumber}
              className={
                pageNumber - 1 === pagina
                  ? 'PageButtonHeader__item PageButtonHeader__item--active'
                  : 'PageButtonHeader__item'
              }
              onClick={() => setPagina(+pageNumber - 1)}
            >
              {pageNumber}
            </button>
          );
        })}
    </div>
  );
};

export default PageButton;
