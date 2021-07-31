import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

//Pages
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<PrivateRoute exact path="/" component={HomePage} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/register" component ={RegisterPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
