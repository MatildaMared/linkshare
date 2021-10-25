import React, { createContext, useState, useEffect } from "react";
import { getUser } from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [context, setContext] = useState({
		isLoading: true,
		isAuthenticated: null,
		user: {},
	});

	useEffect(() => {
		if (localStorage.getItem("token") && context.isAuthenticated !== true) {
			setUserData();
		} else {
			updateContext({
				isLoading: false,
			});
		}
	}, []);

  async function setUserData() {
    console.log("Inside setUser fn");
		try {
			const token = localStorage.getItem("token");

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
