import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		axios
			.get("/api/users")
			.then((users) => {
				setUsers(users.data)
			})
			.catch((err) => console.log(err));
	}, []);

	function submitForm(event) {
		event.preventDefault();

		var data = {
			"name": name,
			"email": email
		};

		var config = {
			method: 'post',
			url: '/api/users',
			headers: { },
			data : data
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});

		setName("");
		setEmail("");

		axios
			.get("/api/users")
			.then((users) => {
				setUsers(users.data)
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<h1>My Project</h1>

			{users === null ? (
				<p>Loading...</p>
			) : users.length === 0 ? (
				<p>No user available</p>
			) : (
				<>
					<h2>Available Users</h2>
					<ol>
						{users.map((user, index) => (
							<li key={index}>
								Name: {user.name} - Email: {user.email}
							</li>
						))}
					</ol>
				</>
			)}

			<form onSubmit={submitForm} >
				<input
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Enter your username"
					value={name}
				/>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Enter your email address"
					value={email}
				/>
				<button type="submit">
					SEND
				</button>
			</form>
		</>
	);
};

export default App;
