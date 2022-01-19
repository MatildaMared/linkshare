import React, { useState, createRef, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import TextInput from "../textInput/TextInput";
import styled from "styled-components";
import Button from "../button/Button";
import { login } from "./../../services/authService";

function LoginForm() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const emailRef = createRef();
	const passwordRef = createRef();
	const [errorMessage, setErrorMessage] = useState("");

	const resetInputFields = () => {
		emailRef.current.blur();
		passwordRef.current.blur();
		setEmail("");
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);
		resetInputFields();

		const user = await login(email, password);
		console.log(user);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Heading>Login</Heading>
			<TextInput
				type="email"
				name="email"
				label="E-mail"
				value={email}
				onChange={setEmail}
				ref={emailRef}
			/>
			<TextInput
				type="password"
				name="password"
				label="Password"
				value={password}
				onChange={setPassword}
				ref={passwordRef}
			/>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			<Button type="submit">Log In</Button>
		</Form>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;
	border-radius: var(--rounded-large);

	& button {
		margin: 0 auto;
	}
`;

const Heading = styled.h1`
	font-family: var(--font-secondary);
	margin-bottom: 1rem;
	text-align: center;
`;

const ErrorMessage = styled.p`
	text-align: center;
	margin-bottom: 1rem;
`;

export default LoginForm;
