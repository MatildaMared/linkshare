import React from "react";

function Layout({component: Component}) {
	return (
		<div>
      <h1>This is the Layout</h1>
      <Component />
		</div>
	);
}

export default Layout;
