import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import './userTable.css';


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
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

const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="user-table-container">
      <h2>User List</h2>
      <div className="filter-container">

        <input
          type="text"
          placeholder="Name Filter"
          value={filter}
          onChange={handleFilterChange}
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
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>{user.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default UserTable;