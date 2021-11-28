import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Layout from "./layout/Layout";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./routing/PrivateRoute";
import ListsPage from "./pages/ListsPage";
import AccountPage from "./pages/AccountPage";

function App() {
	return (
		<Wrapper>
			<Router>
				<Header />
				<UserProvider>
					<Content>
						<Routes>
							<Route
								path="/"
								element={
									<PrivateRoute>
										<Layout component={HomePage} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/lists"
								element={
									<PrivateRoute>
										<Layout component={ListsPage} />
									</PrivateRoute>
								}
							/>
							<Route
								path="/account"
								element={
									<PrivateRoute>
										<Layout component={AccountPage} />
									</PrivateRoute>
								}
							></Route>
							<Route path="/login" element={<LoginPage />} />
						</Routes>
					</Content>
				</UserProvider>
				<Footer />
			</Router>
		</Wrapper>
	);
}

const Content = styled.div`
	max-width: var(--max-width);
	width: 100%;
	margin: 0 auto;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;
`;

export default App;
