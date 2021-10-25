import React from "react";
import styled from "styled-components";

function Header() {
	return (
		<Wrapper>
			<Logo>Linkshare.</Logo>
		</Wrapper>
	);
}

const Logo = styled.h1`
	font-size: 3.5rem;
	background-color: var(--color-primary-dark);
	background-image: linear-gradient(
		to right bottom,
		var(--color-dark),
		var(--color-primary-dark),
		var(--color-primary)
	);
	background-size: 100%;
	background-clip: text;
	-webkit-background-clip: text;
	-moz-background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-text-fill-color: transparent;
`;

const Wrapper = styled.header`
	padding: 0px;
`;

export default Header;
