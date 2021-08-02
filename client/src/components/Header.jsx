// import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
	const handleLogout = () => {
    localStorage.removeItem("token");
	};

	return (
		<header className="bg-purple-700 px-6 py-8 flex justify-between items-center">
			<h1 className="flex-grow text-4xl font-bold text-purple-50">Linkshare</h1>
			{localStorage.getItem("token") ? (
				<button
					className="mr-4 py-1 px-2 text-purple-50 border-transparent border-b-2 text-xl font-semibold hover:text-purple-400 hover:border-purple-200 transition-all ease-in"
					onClick={handleLogout}>
					Log out
				</button>
			) : (
				<nav className="text-white">
					<Link
						className="mr-4 py-1 px-2 text-purple-50 border-transparent border-b-2 text-xl font-semibold hover:text-purple-400 hover:border-purple-200 transition-all ease-in"
						to="/login">
						Log in
					</Link>
					<Link
						className="mr-4 py-1 px-2 text-purple-50 border-transparent border-b-2 text-xl font-semibold hover:text-purple-400 hover:border-purple-200 transition-all ease-in"
						to="/register">
						Register
					</Link>
				</nav>
			)}
		</header>
	);
};

export default Header;
