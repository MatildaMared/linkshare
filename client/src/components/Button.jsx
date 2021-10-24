import React from "react";
import styled from "styled-components";

const Button = (props) => {
	return <ButtonElem style={props.style} type={props.type}>{props.children}</ButtonElem>;
};

const ButtonElem = styled.button`
	display: inline-block;
	border-radius: var(--rounded-medium);
	border: none;
	padding: 8px 16px;
	cursor: pointer;
`;

export default Button;
