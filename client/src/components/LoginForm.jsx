import React, { useState, createRef } from "react";
import FormInput from "./FormInput";
import styled from "styled-components";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const emailRef = createRef();
	const passwordRef = createRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
		console.log(password);

		setEmail("");
		setPassword("");
		emailRef.current.blur();
		passwordRef.current.blur();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<FormInput
				type="email"
				name="email"
				label="E-mail"
				value={email}
				onChange={setEmail}
				ref={emailRef}
			/>
			<FormInput
				type="password"
				name="password"
				label="Password"
				value={password}
				onChange={setPassword}
				ref={passwordRef}
			/>
			<input type="submit" value="Log In" />
		</Form>
	);
}

const Form = styled.form`
	max-width: 350px;
	margin: 0 auto;
`;

export default LoginForm;
