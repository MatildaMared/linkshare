import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
	};

	return (
		<header className="header">
			<h1 className="logo">Linkshare</h1>
			{localStorage.getItem("token") ? (
				<button className="btn" onClick={handleLogout}>Log out</button>
			) : (
				<nav className="nav">
					<Link to="/login">Log in</Link>
					<Link to="/register">Register</Link>
				</nav>
			)}
		</header>
	);
};

export default Header;
