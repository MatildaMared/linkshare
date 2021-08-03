import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";

const HomePage = (props) => {
	const [user, setUser] = useState("");

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

			setUser(data.user);
		} catch (err) {
			redirectToLogin();
		}
	};

	useEffect(() => {
		checkToken();
	});

	return (
		<Layout>
			<h1 className="text-4xl font-bold text-gray-700 text-center my-8">Hello, {user.firstName}!</h1>
		</Layout>
	);
};

export default HomePage;
