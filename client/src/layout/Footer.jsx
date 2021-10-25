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
  padding: 16px 8px;
  text-align: center;
`

const Copyright = styled.p`
  font-size: var(--font-size-small);
`

export default Footer;
