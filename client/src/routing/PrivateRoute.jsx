import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function PrivateRoute({ children }) {
	const [userContext] = useContext(UserContext);

	function isAllowed() {
		return (
			localStorage.getItem("token") &&
			userContext.isAuthenticated === true &&
			userContext.isLoading === false
		);
	}

	return isAllowed()
		? children
		: userContext.isLoading === false && <Navigate to="/login" />;
}

export default PrivateRoute;
