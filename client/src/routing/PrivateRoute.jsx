import React, { useContext, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoginPage from "../pages/LoginPage";
import Layout from "../layout/Layout";

function PrivateRoute({ children }) {
	const [userContext, updateUserContext] = useContext(UserContext);
	console.log(userContext);
	return localStorage.getItem("token") &&
		userContext.isAuthenticated === true &&
		userContext.isLoading === false
		? children
		: userContext.isLoading !== true && <Navigate to="/login" />;
}

// function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
// 	const [userContext, updateUserContext] = useContext(UserContext);
// 	console.log(userContext);
// 	return (
// 		<Route
// 			{...rest}
// 			render={(props) => {
// 				return localStorage.getItem("token") &&
// 					userContext.isAuthenticated === true &&
// 					userContext.isLoading === false ? (
// 					<Layout component={Component} />
// 				) : (
// 					userContext.isLoading !== true && (
// 						<div>
// 							<h1>You need to be logged in to access this page</h1>
// 							<LoginPage />
// 						</div>
// 					)
// 				);
// 			}}
// 		/>
// 	);
// }

export default PrivateRoute;
