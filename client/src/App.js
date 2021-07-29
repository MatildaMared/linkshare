import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/login" component={LoginPage} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
