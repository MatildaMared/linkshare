import React, { useContext } from "react";
import { UserContext } from "./../context/UserContext";

function HomePage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const user = userContext.user;

	const logout = () => {
		localStorage.clear();
		updateUserContext({
			user: null,
			isAuthenticated: false,
			isLoading: false,
		});
	};

	return (
		<div>
			<h1>Home Page</h1>
			<h2>Hello {user.firstName}!</h2>
			<button onClick={logout}>Log out</button>
		</div>
	);
}

export default HomePage;
