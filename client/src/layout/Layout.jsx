import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import styled from "styled-components";

function Layout({ component: Component }) {
	return (
		<Wrapper>
			<Header />
			<MainContent>
				<Menu />
				<Component />
			</MainContent>
			<Footer />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: grid;
	min-height: 100vh;
	grid-template-rows: auto 1fr auto;
`;

const MainContent = styled.div`
	display: flex;
	border-radius: var(--rounded-large);
	box-shadow: var(--shadow);

	& main {
		background-color: hsla(0, 0%, 100%, 0.25);
		border-radius: 0 var(--rounded-large) var(--rounded-large) 0;
	}
`;

export default Layout;
