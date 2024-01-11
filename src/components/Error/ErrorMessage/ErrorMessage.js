import React from 'react';

import './style.css';

export const ErrorMessage = ({error}) => {
  return (
    <div className="error-block">
      <h2 className="error-text">Ошибка: {error}</h2>
    </div>
  );
};
