import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from './Menu';
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
  background-color: hsla(0, 0%, 100%, .1);
  border-radius: var(--rounded-large);
`;

export default Layout;
