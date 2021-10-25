import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoutBtn from "../components/LogoutBtn";
import { BiHome, BiUserCircle } from "react-icons/bi";
import { BsListStars } from "react-icons/bs";

function Menu() {
	return (
		<Wrapper>
			<List>
				<Item>
          <Link to="/">
            <BiHome />
            <span>Home</span>
          </Link>
				</Item>
				<Item>
          <Link to="/">
            <BsListStars />
            <span>Lists</span>
          </Link>
				</Item>
				<Item>
          <Link to="/">
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
	padding: 16px;
	border-bottom: 1px solid var(--color-primary-light);
	background-color: hsla(0, 0%, 100%, 0.10);
	cursor: pointer;
  transition: all .3s;

	&:hover {
		background-color: hsla(0, 0%, 100%, 0.2);

    & svg {
      color: var(--color-primary-dark);
    }
	}

	& a {
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
    color: var(--color-primary);
    transition: all .3s;
	}
`;

export default Menu;
