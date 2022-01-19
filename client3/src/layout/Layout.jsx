import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import styled from "styled-components";

function Layout({ component: Component }) {
	return (
		<Wrapper>
			<Menu />
			<Component />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-gap: 1rem;
`;

export default Layout;
