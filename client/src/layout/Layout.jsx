import "./Layout.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
	return (
		<div className="content">
			<Header />
			<main className="main">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
