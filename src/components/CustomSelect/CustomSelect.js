import React from 'react';
import Select from 'react-select';

import './style.css';

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 300,
    marginRight: 20,
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    width: 300,
    zIndex: 100,
  }),
};

export const CustomSelect = ({ options, placeholder, value, onChange, isDisabled, label }) => {
  return (
    <span className="custom-select-container">
      <label htmlFor="custom-select" className="custom-select_label">{label}</label>
      <Select
        id="custom-select"
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
      />
    </span>
  );
};
