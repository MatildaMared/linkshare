import React from "react";
import styled from "styled-components";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

function Footer() {
	return (
		<Wrapper>
			<Copyright>
				Made with 🤍 by <strong>Matilda Mared</strong> 2021
			</Copyright>
			<nav>
				<List>
					<Item>
						<Link
							text="Find me on LinkedIn 😛"
							href="https://www.linkedin.com/in/matilda-mared/"
							target="_blank">
							<BsLinkedin />
						</Link>
					</Item>
					<Item>
						<Link
							text="Look at my code on GitHub 👩‍💻"
							href="https://github.com/MatildaMared" target="_blank">
							<BsGithub />
						</Link>
					</Item>
					<Item>
						<Link text="Send me an e-mail 😊" href="mailto:matildamared@live.se">
							<FiMail />
						</Link>
					</Item>
				</List>
			</nav>
		</Wrapper>
	);
}

const Wrapper = styled.footer`
	padding: 16px 8px;
	text-align: center;
`;

const Copyright = styled.p`
	color: var(--color-dark);
`;

const List = styled.ul`
	list-style-type: none;
	padding: 0;
	display: flex;
	justify-content: center;
	line-height: 1;
	margin: 16px 0 0 0;
`;

const Item = styled.li`
	margin-right: 8px;
	&:last-of-type {
		margin-right: 0;
	}
`;

const Link = styled.a`
	font-size: 1.8rem;
	cursor: pointer;
	color: var(--color-primary-dark);
	transition: all .3s;
	position: relative;

	&:hover {
		color: var(--color-dark);

		&::after {
			z-index: 2;
			font-size: .9rem;
			content: "${(props) => props.text}";
			background-color: var(--color-primary-light);
			position: absolute;
			top: -75%;
			left: 0%;
			width: max-content;
			padding: 6px;
			border-radius: var(--rounded-small);
			box-shadow: var(--shadow);
		}
	}
`;

export default Footer;
