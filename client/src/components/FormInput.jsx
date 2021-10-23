import React from "react";
import styled from "styled-components";

function FormInput({ type, label, name, value, onChange }) {
	return (
		<Wrapper>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export default FormInput;
