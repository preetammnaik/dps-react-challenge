import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/userService';
import './userTable.css';
import Filter from '../filter/filter.jsx';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [highlightOldest, setHighlightOldest] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const uniqueCities = [...new Set(usersData.map(user => user.address.city))];
        setCities(uniqueCities);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleHighlightChange = (event) => {
    setHighlightOldest(event.target.checked);
  };

  const filteredUsers = users.filter(user => {
    const nameMatches = `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.toLowerCase());
    const cityMatches = selectedCity === '' || user.address.city === selectedCity;
    return nameMatches && cityMatches;
  });

  const oldestUsers = {};
  if (highlightOldest) {
    filteredUsers.forEach(user => {
      const userCity = user.address.city;
      if (!oldestUsers[userCity] || new Date(user.birthDate) < new Date(oldestUsers[userCity].birthDate)) {
        oldestUsers[userCity] = user;
      }
    });
  }

  return (
    <div className="user-table-container">
      <h2>User List</h2>
      <div className="filter-container">
        <Filter
          filter={filter}
          onFilterChange={handleFilterChange}
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          highlightOldest={highlightOldest}
          onHighlightChange={handleHighlightChange}
        />
      </div>
      {filteredUsers.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => {
              const isOldest = highlightOldest && oldestUsers[user.address.city]?.id === user.id;
              return (
                <tr key={user.id} className={isOldest ? 'highlighted' : ''}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.birthDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default UserTable;
