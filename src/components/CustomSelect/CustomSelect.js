import React from 'react';
import Select from 'react-select';

import './style.css';

export const CustomSelect = ({ options, placeholder, value, onChange, isDisabled, label }) => {
  return (
    <span className="custom-select-container">
      <label htmlFor="custom-select" className="custom-select_label">{label}:</label>
      <Select
        id="custom-select"
        options={options}
        className="table-selectors"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
      />
    </span>
  );
};
