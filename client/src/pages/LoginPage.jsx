import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import styled from "styled-components";

function LoginPage() {
	const [activeComponent, setActiveComponent] = useState("login");

	return (
    <Wrapper>
      <Heading>Linkshare.</Heading>
			{activeComponent === "login" ? (
				<>
					<LoginForm />
					<Text>
						Don't have an account yet?{" "}
						<Link
							onClick={() => {
								setActiveComponent("signup");
							}}>
							Click here
						</Link>{" "}
						to sign up!
					</Text>
				</>
			) : (
				<>
					<SignupForm />
					<Text>
						Already have an account?{" "}
						<Link
							onClick={() => {
								setActiveComponent("login");
							}}>
							Click here
						</Link>{" "}
						to log in!
					</Text>
				</>
			)}
		</Wrapper>
	);
}

const Text = styled.p`
	margin: 0 auto;
  font-size: var(--font-size-small);
	margin-top: 8px;
	max-width: 200px;
	text-align: center;
`;

const Heading = styled.h1`
	font-size: 5.063rem;
	margin-bottom: 16px;
	text-align: center;
	background-color: var(--color-primary-dark);
	background-image: linear-gradient(to right bottom, var(--color-dark), var(--color-primary-dark), var(--color-primary));
	background-size: 100%;
  background-clip: text;
	-webkit-background-clip: text;
	-moz-background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-text-fill-color: transparent;
`;

const Link = styled.a`
	cursor: pointer;

	&:hover {
		color: pink;
	}
`;

const Wrapper = styled.main`
  margin-top: 100px;
`

export default LoginPage;
