import React from "react";
import styled from "styled-components";

function Header() {
	return (
		<Wrapper>
			<Content>
				<Logo>Linkshare.</Logo>
			</Content>
		</Wrapper>
	);
}

const Logo = styled.h1`
	font-size: 2rem;
`;

const Content = styled.div`
	max-width: var(--max-width);
	margin: 0 auto;
	padding: 1rem 0;
`;

const Wrapper = styled.header`
	border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
	padding: 0 1rem;
`;

export default Header;
