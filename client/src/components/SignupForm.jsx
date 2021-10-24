import React, { useState, createRef } from "react";
import TextInput from "./TextInput";
import styled from "styled-components";
import Button from "./Button";

function SignupForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const emailRef = createRef();
	const passwordRef = createRef();
	const firstNameRef = createRef();
	const lastNameRef = createRef();
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e) => {
		console.log("Submitted!");
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
			<Heading>Sign Up</Heading>
			<TextInput
				type="text"
				name="firstName"
				label="First Name"
				value={firstName}
				onChange={setFirstName}
				ref={firstNameRef}
			/>
			<TextInput
				type="text"
				name="lastName"
				label="Last Name"
				value={lastName}
				onChange={setLastName}
				ref={lastNameRef}
			/>
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
	padding: 16px 32px;
	display: flex;
	flex-direction: column;
	width: auto;
	max-width: 400px;
	margin: 0 auto;
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: var(--rounded-large);

	& button {
		margin: 0 auto;
	}
`;

const Heading = styled.h1`
	color: var(--color-primary-dark);
	margin-bottom: 8px;
	text-align: center;
`;

const ErrorMessage = styled.p`
	font-size: var(--font-size-small);
	margin-bottom: 8px;
`;

export default SignupForm;
