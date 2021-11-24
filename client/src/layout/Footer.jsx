import React from "react";
import styled from "styled-components";

function Footer() {
	return (
		<Wrapper>
			<Content>
				<Copyright>
					Made with 🤍 by <strong>Matilda Mared</strong> 2021
				</Copyright>
				<nav>
					<List>
						<Item>
							<Link
								href="https://www.linkedin.com/in/matilda-mared/"
								target="_blank"
							>
								LinkedIn
							</Link>
						</Item>
						<Item>
							<Link href="https://github.com/MatildaMared" target="_blank">
								GitHub
							</Link>
						</Item>
						<Item>
							<Link href="mailto:matildamared@live.se">E-mail</Link>
						</Item>
					</List>
				</nav>
			</Content>
		</Wrapper>
	);
}

const Wrapper = styled.footer`
	border-top: 1px solid hsla(0, 0%, 100%, 0.1);
	padding: 1rem .5rem;
	text-align: center;
`;

const Content = styled.div`
	max-width: var(--max-width);
	margin: 0 auto;
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
	font-size: 1rem;
	cursor: pointer;
	color: var(--color-text);
	transition: all 0.3s;
	text-decoration: none;

	&:hover {
		color: var(--color-dark);
		text-decoration: underline;
	}
`;

export default Footer;
