import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function PrivateRoute({ children }) {
	const [userContext] = useContext(UserContext);
	console.log(userContext);
	return localStorage.getItem("token") &&
		userContext.isAuthenticated === true &&
		userContext.isLoading === false ? (
		children
	) : (
		<Navigate to="/login" />
	);
}

export default PrivateRoute;
