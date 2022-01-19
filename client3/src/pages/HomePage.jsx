import React, { useContext } from "react";
import { UserContext } from "./../context/UserContext";
import styled from "styled-components";

function HomePage() {
	const [userContext, updateUserContext] = useContext(UserContext);
	return (
		<Wrapper>
			<h1>Hello {userContext.user.firstName}!</h1>
		</Wrapper>
	);
}

const Wrapper = styled.main`
	width: 100%;
	padding: 16px;
`;

export default HomePage;
