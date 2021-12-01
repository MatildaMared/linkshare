import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import LogoutBtn from "../components/LogoutBtn";
import { Home as HomeIcon, List as ListIcon, User as UserIcon } from "react-feather";

function Menu() {
	const location = useLocation();

	return (
		<Wrapper>
			<List>
				<Item
					path="/"
					location={location}
					isActive={location.pathname === "/" ? true : false}
				>
					<Link to="/">
						<HomeIcon size={18} />
						<span>Home</span>
					</Link>
				</Item>
				<Item
					path="/lists"
					location={location}
					isActive={location.pathname === "/lists" ? true : false}
				>
					<Link to="/lists">
						<ListIcon size={18} />
						<span>Lists</span>
					</Link>
				</Item>
				<Item
					path="/account"
					location={location}
					isActive={location.pathname === "/account" ? true : false}
				>
					<Link to="/account">
						<UserIcon size={18} />
						<span>Account</span>
					</Link>
				</Item>
			</List>
		</Wrapper>
	);
}

const Wrapper = styled.nav`
	min-width: 200px;
	border-left: 1px solid hsla(0, 0%, 15%, 1);
	border-right: 1px solid hsla(0, 0%, 15%, 1);
`;

const List = styled.ul`
	padding: 0;
	margin: 0;
	list-style-type: none;
	width: 100%;
	transition: all 0.5s;
`;

const Item = styled.li`
	margin: 0;
	border-bottom: 1px solid hsla(0, 0%, 15%, 1);
	background-color: ${(props) => (props.isActive ? "hsla(0, 0%, 15%, 1)" : "")};
	cursor: pointer;
	transition: color 0.3s;

	&:hover, &:focus {
		outline: var(--outline);

		& svg {
			color: var(--color-primary);
		}
	}

	& a {
		padding: 16px;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: var(--color-text);
		display: flex;
		align-items: center;
	}

	& svg {
		margin-right: .5rem;
		color: ${(props) =>
			props.isActive ? "var(--color-primary)" : "var(--color-primary-dark)"};
		transition: all 0.3s;
	}
`;

export default Menu;
