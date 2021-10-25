import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import LogoutBtn from "../components/LogoutBtn";
import { BiHome, BiUserCircle } from "react-icons/bi";
import { BsListStars } from "react-icons/bs";

function Menu() {
	const location = useLocation();

	return (
		<Wrapper>
			<List>
				<Item path="/" location={location}>
					<Link to="/">
						<BiHome />
						<span>Home</span>
					</Link>
				</Item>
				<Item path="/lists" location={location}>
					<Link to="/lists">
						<BsListStars />
						<span>Lists</span>
					</Link>
				</Item>
				<Item path="/account" location={location}>
					<Link to="/account">
						<BiUserCircle />
						<span>Account</span>
					</Link>
				</Item>
			</List>
			<LogoutBtn />
		</Wrapper>
	);
}

const Wrapper = styled.nav`
	border-right: 1px solid var(--color-primary);
	min-width: 250px;
	background-color: hsla(0, 0%, 100%, 0.25);
	border-radius: var(--rounded-large) 0 0 var(--rounded-large);
	overflow: hidden;
`;

const List = styled.ul`
	padding: 0;
	margin: 0;
	list-style-type: none;
	width: 100%;
`;

const Item = styled.li`
	margin: 0;
	border-bottom: 1px solid var(--color-primary-light);
	background-color: ${(props) =>
		props.path === props.location.pathname
			? "hsla(0, 0%, 100%, 0.25)"
			: "hsla(0, 0%, 100%, 0.1)"};
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		background-color: hsla(0, 0%, 100%, 0.2);

		& svg {
			color: var(--color-primary-dark);
		}
	}

	& a {
		padding: 16px;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: var(--color-primary-dark);
		display: flex;
		align-items: center;

		& span {
			padding-top: 3px;
		}
	}

	& svg {
		font-size: 1.5rem;
		margin-right: 16px;
		color: ${(props) =>
			props.path === props.location.pathname
				? "var(--color-primary-dark)"
				: "var(--color-primary)"};
		transition: all 0.3s;
	}
`;

export default Menu;
