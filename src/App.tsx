import dpsLogo from './assets/DPS.svg';
import React, { useState, useEffect } from 'react';
import UserTable from './components/userTable/userTable';


import './App.css';

// https://dummyjson.com/users

function App() {
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
				<UserTable />
			</div>
		</>
	);
}

export default App;
