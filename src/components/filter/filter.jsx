import React from 'react';

const Filter = ({ filter, onFilterChange, cities, selectedCity, onCityChange }) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Name Filter"
        value={filter}
        onChange={onFilterChange}
      />
      <select value={selectedCity} onChange={onCityChange}>
        <option value="">All Cities</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
