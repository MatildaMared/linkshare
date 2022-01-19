import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routing/PrivateRoute";

function App() {
	return (
		<Router>
			<UserProvider>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<HomePage />
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</UserProvider>
		</Router>
	);
}

export default App;
