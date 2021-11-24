import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import LogoutBtn from "../components/LogoutBtn";

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
						<span>Home</span>
					</Link>
				</Item>
				<Item path="/lists" location={location}>
					<Link to="/lists">
						<span>Lists</span>
					</Link>
				</Item>
				<Item
					path="/account"
					location={location}
					isActive={location.pathname === "/account" ? true : false}
				>
					<Link to="/account">
						<span>Account</span>
					</Link>
				</Item>
			</List>
			<LogoutBtn />
		</Wrapper>
	);
}

const Wrapper = styled.nav`
	min-width: 250px;
	background-color: hsla(0, 0%, 100%, 0.05);
`;

const List = styled.ul`
	padding: 0;
	margin: 0;
	list-style-type: none;
	width: 100%;
	transition: all 0.5s;
	transform-origin: top;
	max-height: ${(props) =>
		props.secondary && !props.showListDropdown ? "0" : "auto"};
	& li {
		max-height: ${(props) =>
			props.secondary && !props.showListDropdown ? "0" : "auto"};
	}
`;

const Item = styled.li`
	margin: 0;
	border-bottom: 1px solid var(--color-primary-light);
	background-color: ${(props) =>
		props.isActive ? "hsla(0, 0%, 100%, 0.15)" : "hsla(0, 0%, 100%, 0.05)"};
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
			props.isActive ? "var(--color-primary-dark)" : "var(--color-primary)"};
		transition: all 0.3s;
	}
`;

export default Menu;
