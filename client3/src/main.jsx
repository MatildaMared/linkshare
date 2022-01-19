import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyles from "./styling/GlobalStyles";
import Variables from "./styling/Variables";

ReactDOM.render(
	<React.StrictMode>
		<App />
		<GlobalStyles />
		<Variables />
	</React.StrictMode>,
	document.getElementById("root")
);
