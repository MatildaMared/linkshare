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
`;

const Label = styled.label`
	font-size: var(--font-size-small);
`;

export default TextInput;
