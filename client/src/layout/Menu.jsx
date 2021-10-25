import React from "react";
import styled from "styled-components";

function Menu() {
	return (
		<Wrapper>
			<h1>This is the Menu!</h1>
		</Wrapper>
	);
}

const Wrapper = styled.nav`
	padding: 16px;
	background-color: hsla(0, 100%, 0%, 0.05);
	min-width: 150px;
	border-radius: var(--rounded-large) 0 0 var(--rounded-large);
`;

export default Menu;
