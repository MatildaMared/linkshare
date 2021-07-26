import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<Router>
      <div>
        <Route exact path="/login" component={LoginPage} />
      </div>
		</Router>
	);
}

export default App;
