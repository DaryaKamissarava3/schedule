import React from 'react';

import './style.css';

export const Spinner = ({ type, text }) => {
  return (
    <div className="spinner-block">
      {text ? <h2 className="spinner-text">{text}</h2> : ''}
      <span className={type}></span>
    </div>
  );
};
