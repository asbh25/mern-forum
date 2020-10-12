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

		// if (name === "") {
		// 	alert("Please fill the username field");
		// 	return;
		// }
		// if (email === "") {
		// 	alert("Please fill the email field");
		// 	return;
		// }


	var data = {
		"name": name,
		"email": email
	};

	var config = {
		method: 'post',
		url: 'localhost:5000/api/users',
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
				/>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Enter your email address"
				/>
				<button type="submit" />
			</form>
		</>
	);
};

export default App;
