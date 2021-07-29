import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import HomePage from "./pages/HomePage";

//Pages
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<PrivateRoute exact path="/" component={HomePage} />
					<Route exact path="/login" component={LoginPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
