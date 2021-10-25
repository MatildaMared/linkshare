import React, { useContext } from "react";
import { UserContext } from "./../context/UserContext";

function HomePage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	return (
		<div>
			<h1>Hello {userContext.user.firstName}!</h1>
		</div>
	);
}

export default HomePage;
