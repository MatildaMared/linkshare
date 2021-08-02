import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
			<div className="p-10 my-8 max-w-lg mx-auto bg-white bg-opacity-80 rounded-xl shadow-md flex items-center space-x-4">
				<div className="w-full flex flex-col items-center">
					<h1 className="text-4xl my-8 font-bold text-purple-600 text-center">
						Log In 💜
					</h1>
					<p className="mb-8 font-sm font-semibold text-gray-600 w-4/5 text-center">
						Welcome back gorgeous! 😊 Are you a new user?{" "}
						<Link
							className="whitespace-nowrap font-extrabold rounded text-purple-500 p-1 hover:bg-purple-500 hover:text-purple-100"
							to="/register">
							Click here
						</Link>{" "}
						to register!
					</p>
					<form className="w-full">
						<div className="flex items-center mb-6">
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
						<div className="flex items-center mb-6">
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
							<p className="text-center mb-4 font-light text-gray-500">
								{errorMessage}
							</p>
						</div>
						<div className="flex justify-center">
							<button
								className="bg-purple-500 p-2 mb-8 rounded-full w-1/2 flex items-center justify-center text-white cursor-pointer font-semibold transition-all ease-in hover:bg-purple-50 hover:text-purple-700"
								type="submit"
								onClick={handleSubmit}>
								<span className="flex-grow">Submit</span>
								<i className="bx bx-md bxs-right-arrow-circle text-purple-200"></i>
							</button>
						</div>
					</form>
					<p className="text-sm text-center font-light italic text-gray-400">
						Note that we will never share your private information with anyone
						else. Your privacy comes first at all times!
						<span className="not-italic"> 😊</span>
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default LoginPage;
