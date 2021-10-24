import React from "react";
import styled from "styled-components";

const Button = (props) => {
	return (
		<ButtonElem style={props.style} type={props.type}>
			{props.children}
		</ButtonElem>
	);
};

const ButtonElem = styled.button`
	display: inline-block;
	border-radius: var(--rounded-medium);
	border: none;
	padding: 8px 16px;
	cursor: pointer;
	background-color: var(--color-primary-dark);
	color: hsla(0, 0%, 100%, 0.8);
	transition: all 0.3s;
	border: 2px solid transparent;

	&:hover {
		background-color: var(--color-primary);
	}

	&:focus,
	&:active {
		border: 2px solid var(--color-primary);
    background-color: red;
	}
`;

export default Button;
