import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

function LogoutBtn() {
	const [userContext, updateUserContext] = useContext(UserContext);
	const navigate = useNavigate();

	function logoutHandler() {
		localStorage.removeItem("token");
		updateUserContext({
			isAuthenticated: null,
			user: {},
		});
		navigate("/login");
	}

	return <Button onClick={logoutHandler}>Log Out</Button>;
}

const Button = styled.button`
	padding: 8px 24px;
	border-radius: var(--rounded-medium);
	display: block;
	margin: 32px auto;
	border: none;
	background-color: var(--color-primary-dark);
	color: hsla(0, 0%, 100%, 0.8);
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		background-color: var(--color-primary);
	}
`;

export default LogoutBtn;
