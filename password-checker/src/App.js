import React, { useState } from 'react';
import './App.css';

function App() {
	const [password, setPassword] = useState(null);
	const [change, setChange] = useState(null);

	async function checkPassword(e) {
		e.preventDefault();
		let response = await fetch('http://localhost:8080/check', {
			method: 'POST',
			body: password,
		});

		let data = await response.json();

		setChange(data);
	}

	return (
		<>
			<div>
				<form onSubmit={checkPassword}>
					<label for="password">Enter Password</label>
					<input
						type="text"
						id="password"
						name="password"
						placeholder="Enter Password to check"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<input type="submit" value="Submit" />
				</form>
				{change != null
					? 'Password Need(s) ' + change + ' change(s)'
					: ''}
			</div>
		</>
	);
}

export default App;
