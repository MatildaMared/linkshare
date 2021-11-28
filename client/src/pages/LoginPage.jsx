import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import styled from "styled-components";

function LoginPage() {
	const [activeComponent, setActiveComponent] = useState("login");

	return (
		<Wrapper>
			{activeComponent === "login" ? (
				<>
					<LoginForm />
					<Text>
						Don't have an account yet?{" "}
						<Link
							onClick={() => {
								setActiveComponent("signup");
							}}
						>
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
							}}
						>
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
	margin-top: 8px;
	max-width: 200px;
	text-align: center;
`;

const Link = styled.a`
	cursor: pointer;
	color: var(--color-primary);
	transition: all 0.3s;

	&:hover {
		color: var(--color-text);
	}
`;

const Wrapper = styled.main`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	max-width: 350px;
	margin: 0 auto;
	padding-top: 100px;
`;

export default LoginPage;
