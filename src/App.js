import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState(null);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		axios
			.get("/")
			.then((users) => setUsers(users))
			.catch(() => console.log('ne rabotaet down'));
	}, []);

	function submitForm() {
		if (username === "") {
			alert("Please fill the username field");
			return;
		}
		if (email === "") {
			alert("Please fill the email field");
			return;
		}
		axios
			.post("/api/users", {
				username: username,
				email: email,
			})
			.then(function () {
				alert("Account created successfully");
				window.location.reload();
			})
			.catch(function () {
				alert("Could not creat account. Please try again");
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

			<form onSubmit={submitForm}>
				<input
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="Enter your username"
				/>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Enter your email address"
				/>
				<input type="submit" />
			</form>
		</>
	);
}

export default App;
