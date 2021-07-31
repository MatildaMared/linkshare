import { useState } from "react";
import Layout from "../layout/Layout";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

	return (
		<Layout>
			<div className="p-6 my-8 max-w-md mx-auto bg-white bg-opacity-80 rounded-xl shadow-md flex items-center space-x-4">
				<div className="w-full">
					<div className="flex flex-col items-center">
						<h1 className="text-4xl mb-4 mt-4 font-bold text-purple-600 text-center">
							Register 💜
						</h1>
						<p className="mb-4 font-sm font-semibold text-gray-600 w-4/5 text-center">
							We are so happy that you would like to join us! Signing up is
							completely free and all you need to do is to fill out the form
							below! 😀
						</p>
					</div>
					<form className="w-full">
						<div className="flex items-center mb-4">
							<label
								className="w-1/3 block uppercase tracking-wide text-gray-600 text-xs font-bold"
								htmlFor="firstname">
								First Name:
							</label>
							<input
								className="bg-purple-50 appearance-none border-2 border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
								type="text"
								id="firstname"
								name="firstname"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="flex items-center mb-4">
							<label
								className="w-1/3 block uppercase tracking-wide text-gray-600 text-xs font-bold"
								htmlFor="username">
								Username:
							</label>
							<input
								className="bg-purple-50 appearance-none border-2 border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
								type="text"
								id="username"
								name="username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
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
						<div className="flex items-center mb-4">
							<label
								className="w-1/3 block uppercase tracking-wide text-gray-600 text-xs font-bold"
								htmlFor="password-confirm">
								Confirm Password:
							</label>
							<input
								className="bg-purple-50 appearance-none border-2 border-transparent rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
								type="password"
								id="password-confirm"
								name="password-confirm"
								onChange={(e) => setPasswordConfirm(e.target.value)}
							/>
						</div>
						<p className="text-center mb-8 font-light text-gray-500">
							{errorMessage}
						</p>
						<div className="flex items-center justify-center mt-4">
							<input
								className="bg-purple-500 p-2 mb-4 rounded-md w-1/2 flex items-center justify-center text-white cursor-pointer font-semibold transition-all ease-in hover:bg-purple-50 hover:text-purple-700"
								type="submit"
								value="Submit"
								onClick={"handleSubmit"}
							/>
						</div>
					</form>
					<div>
						<p className="text-sm text-center font-light italic text-gray-500">
							Note that we will never share your private information with anyone
							else. Your privacy comes first at all times!
							<span className="not-italic"> 😊</span>
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default RegisterPage;
