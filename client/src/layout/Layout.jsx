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
	display: grid;
	grid-template-columns: auto 1fr;
`;

export default Layout;
