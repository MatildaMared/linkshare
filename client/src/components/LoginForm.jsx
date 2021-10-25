import React, { useState, createRef, useContext } from "react";
import { UserContext } from "../context/UserContext";
import TextInput from "./TextInput";
import styled from "styled-components";
import Button from "./Button";
import { login } from "./../services/authService";

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
		try {
			console.log("Inside login");
			e.preventDefault();
			setErrorMessage("");
			resetInputFields();

			const data = await login(email, password);
			console.log(data);

			if (data.success) {
				localStorage.clear();
				localStorage.setItem("token", data.token);
				console.log(data.user);
				updateUserContext({
					user: data.user,
					isAuthenticated: true,
				});
				if (location.pathname === "/login") {
					history.push("/");
				}
			} else {
				setShow(true);
				setErrorMessage(data.error);
			}
		} catch (err) {
			console.log(err);
		}
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
			<ErrorMessage>{errorMessage}</ErrorMessage>
			<Button type="submit">Log In</Button>
		</Form>
	);
}

const Form = styled.form`
	padding: 32px;
	display: flex;
	flex-direction: column;
	width: auto;
	max-width: 350px;
	margin: 0 auto;
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: var(--rounded-large);

	& button {
		margin: 0 auto;
	}
`;

const Heading = styled.h1`
	color: var(--color-primary-dark);
	margin-bottom: 16px;
	text-align: center;
`;

const ErrorMessage = styled.p`
	height: 20px;
	font-size: var(--font-size-small);
	margin-bottom: 8px;
`;

export default LoginForm;
