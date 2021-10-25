import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from './routing/PrivateRoute';

function App() {
	return (
		<Wrapper className="App">
			<Router>
				<UserProvider>
					<Switch>
						<PrivateRoute exact path="/" component={HomePage} />
						<Route path="/login" component={LoginPage} />
					</Switch>
				</UserProvider>
			</Router>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	max-width: var(--max-width);
	margin: 0 auto;
	background-color: rgba(255, 255, 255, 0.05);
`;

export default App;
