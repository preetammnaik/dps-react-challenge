import dpsLogo from './assets/DPS.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// https://dummyjson.com/users

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get('https://dummyjson.com/users')
			.then((response) => {
				setUsers(response.data.users);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	useEffect(() => {
		console.log('Users:', users);
	}, [users]);

	return (
		<>
			<div>
				<a
					href="https://www.digitalproductschool.io/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<p>Your solution goes here 😊</p>
				{users.length > 0 ? (
					<ul>
						{users.map((user) => (
							<li key={user.id}>
								{user.firstName} {user.lastName} - {user.email}{' '}
								{user.address.city} {user.birthDate}
							</li>
						))}
					</ul>
				) : (
					<p>Loading users...</p>
				)}
			</div>
		</>
	);
}

export default App;
