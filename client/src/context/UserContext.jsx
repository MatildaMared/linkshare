import React, { useEffect, createContext, useState } from "react";
import { getUser } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [context, setContext] = useState({
		isLoading: true,
		isAuthenticated: null,
		user: {},
	});

	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token && context.isAuthenticated !== true) {
			setUserData();
		} else {
			updateContext({
				isLoading: false,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function setUserData() {
		try {
			let user = null;

			if (token) {
				user = await getUser(token);

				if (user) {
					updateContext({
						isAuthenticated: true,
						isLoading: false,
						user,
					});
				} else {
					updateContext({
						isAuthenticated: false,
					});
					localStorage.removeItem("token");
				}
				updateContext({
					isLoading: false,
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	function updateContext(updates) {
		setContext((prevState) => {
			return {
				...prevState,
				...updates,
			};
		});
	}

	const value = [context, updateContext];

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
