import React from "react";
import styled from "styled-components";

const TextInput = React.forwardRef((props, ref) => {
	const { name, label, type, value, onChange } = props;
	return (
		<Wrapper>
			<Label htmlFor={name}>{label}</Label>
			<Input
				ref={ref}
				type={type}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</Wrapper>
	);
});

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 8px;
`;

const Input = styled.input`
	border-radius: 8px;
	padding: 8px 16px;
	border: none;
	background-color: hsla(0deg 0% 100% / 0.3);
	border: 2px solid transparent;

	&:active,
	&:focus {
		background-color: hsla(0deg 0% 100% / 0.7);
		outline: none;
		border: 2px solid var(--color-primary);
	}
`;

const Label = styled.label`
	font-size: var(--font-size-small);
	margin-bottom: 4px;
`;

export default TextInput;
