import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Name Filter"
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filter;