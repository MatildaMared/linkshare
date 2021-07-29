import React, { useState, useEffect } from "react";
import "./LoginPage.scss";

const LoginPage = ({history}) => {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
		<div className="login-page">
			<div className="login">
				<h1 className="login__heading">Log In 💜</h1>
				<form className="login__form">
					<div className="form__group">
						<label className="form__label" htmlFor="email">
							E-mail:
						</label>
						<input
							className="form__input"
							type="email"
							id="email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<p className="form__error">{usernameError}</p>
					<div className="form__group">
						<label className="form__label" htmlFor="password">
							Password:
						</label>
						<input
							className="form__input"
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<p className="form__error">{passwordError}</p>
					<div className="form__control">
						<input
							className="form__btn"
							type="submit"
							value="Submit"
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
