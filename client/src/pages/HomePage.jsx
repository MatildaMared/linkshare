import React, { useEffect } from "react";

const HomePage = (props) => {
	const redirectToLogin = () => {
		props.history.push("login");
	};

	const checkToken = async () => {
		try {
			const response = await fetch("http://localhost:8000/api/private", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			const data = await response.json();

			if (!data.success) {
				redirectToLogin();
			}
		} catch (err) {
			redirectToLogin();
		}
	};

	useEffect(() => {
		checkToken();
	});

	return (
		<div>
			<h1>Home Page super secret!</h1>
		</div>
	);
};

export default HomePage;
