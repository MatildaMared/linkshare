import React from "react";
import styled from 'styled-components';

function Footer() {
	return (
		<Wrapper>
			<Copyright>Made with 🤍 by Matilda Mared</Copyright>
		</Wrapper>
	);
}

const Wrapper = styled.footer`
  padding: 8px;
  text-align: center;
  background-color: hsla(0, 100%, 0%, .05);
`

const Copyright = styled.p`
  font-size: var(--font-size-small);
`

export default Footer;
