import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
	const Wrapper = styled.div`
		max-width: var(--max-width);
		margin: 0 auto;
		background-color: rgba(255, 255, 255, .2);
	`;

	return (
		<Wrapper className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<h1>Home</h1>
					</Route>
					<Route path="/login" component={LoginPage} />
				</Switch>
			</Router>
		</Wrapper>
	);
}

export default App;
