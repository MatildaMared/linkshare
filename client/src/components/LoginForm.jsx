import React, { useState } from "react";
import FormInput from "./FormInput";
import styled from "styled-components";

function LoginForm() {
	const [firstName, setFirstName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Clicked!");
		console.log(firstName);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<FormInput
				type="text"
				name="firstname"
				label="First Name"
				value={firstName}
				onChange={setFirstName}
			/>
			<input type="submit" value="Log In" />
		</Form>
	);
}

const Form = styled.form`
  max-width: 350px;
  margin: 0 auto;
`

export default LoginForm;
