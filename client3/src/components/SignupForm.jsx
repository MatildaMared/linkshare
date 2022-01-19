import React, { useState, createRef, useContext } from "react";
import { useNavigate } from "react-router";
import TextInput from "./TextInput";
import styled from "styled-components";
import Button from "./Button";
import { signup, comparePasswords } from "../services/authService";
import { UserContext } from "../context/UserContext";

function SignupForm() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const emailRef = createRef();
	const passwordRef = createRef();
	const passwordConfirmRef = createRef();
	const firstNameRef = createRef();
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		console.log("Submitted!");
		e.preventDefault();
		console.log(firstName);
		console.log(email);
		console.log(password);

		setEmail("");
		setPassword("");
		setPasswordConfirm("");
		emailRef.current.blur();
		passwordRef.current.blur();
		passwordConfirmRef.current.blur();

		const passwordsMatch = comparePasswords(password, passwordConfirm);

		if (!passwordsMatch) {
			setErrorMessage("Passwords must match...");
		}

		if (passwordsMatch) {
			const data = await signup({
				firstName: firstName,
				email: email,
				password: password,
			});

			console.log(data);

			if (!data.success) {
				setErrorMessage(data.error);
				return;
			}

			localStorage.clear();
			localStorage.setItem("token", data.token);

			updateUserContext({
				user: data.user,
				isAuthenticated: true,
				isLoading: false,
			});

			navigate("/");
		}
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
			<TextInput
				type="password"
				name="passwordConfirm"
				label="Confirm Password"
				value={passwordConfirm}
				onChange={setPasswordConfirm}
				ref={passwordConfirmRef}
			/>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			<Button type="submit">Sign Up</Button>
		</Form>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;

	& button {
		margin: 0 auto;
	}
`;

const Heading = styled.h1`
	margin-bottom: 1rem;
	text-align: center;
`;

const ErrorMessage = styled.p`
	text-align: center;
	max-width: 250px;
	margin: 0 auto;
	margin-bottom: 1rem;
`;

export default SignupForm;
