import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";

const LoginPage = ({history}) => {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history])

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Email: ", email, "Password: ", password);

		const response = await fetch("http://localhost:8000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();
    console.log(data);
    
    if (data.success) {
      localStorage.setItem("token", data.token);
      history.push("/");
    }
	};

	return (
		<Layout>
			<div className="p-6 my-8 max-w-md mx-auto bg-white bg-opacity-80 rounded-xl shadow-md flex items-center space-x-4">
				<div className="w-full">
					<h1 className="text-4xl mb-8 mt-4 font-bold text-purple-600 text-center">
						Log In 💜
					</h1>
					<form className="w-full">
						<div className="flex items-center mb-4">
							<label
								className="w-1/3 block uppercase tracking-wide text-gray-600 text-xs font-bold"
								htmlFor="email">
								E-mail:
							</label>
							<input
								className="bg-purple-50 appearance-none border-2 border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
								type="email"
								id="email"
								name="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex items-center mb-4">
							<label
								className="w-1/3 block uppercase tracking-wide text-gray-600 text-xs font-bold"
								htmlFor="password">
								Password:
							</label>
							<input
								className="bg-purple-50 appearance-none border-2 border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
								type="password"
								id="password"
								name="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex items-center">
							<p className="text-center mb-8 font-light text-gray-500">
								{errorMessage}
							</p>
						</div>
						<div className="flex justify-center">
							<input
								className="bg-purple-500 p-2 rounded-md w-1/2 flex items-center justify-center text-white cursor-pointer font-semibold transition-all ease-in hover:bg-purple-50 hover:text-purple-700"
								type="submit"
								value="Submit"
								onClick={handleSubmit}
							/>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default LoginPage;
