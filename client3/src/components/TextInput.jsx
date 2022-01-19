import React from "react";
import styled from "styled-components";

const TextInput = React.forwardRef((props, ref) => {
	const { name, label, type, value, onChange } = props;
	return (
		<Wrapper>
			<Input
				ref={ref}
				type={type}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<Label htmlFor={name}>{label}</Label>
		</Wrapper>
	);
});

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
	position: relative;

	&:last-of-type {
		margin-bottom: 1rem;
	}
`;

const Input = styled.input`
	border-radius: 8px;
	padding: 8px 16px;
	border: none;
	border: 2px solid var(--color-text);
	font-size: 1rem;
	color: var(--color-text);
	background: transparent;
	transition: border-color 0.3s;

	&:hover,
	&:focus {
		border-color: var(--color-primary);
		& ~ label {
			color: var(--color-primary);
		}
	}
	&:focus {
		outline: var(--outline);
		outline-offset: var(--outline-offset);
		& ~ label {
			transform: translateY(-2px);
		}
	}
`;

const Label = styled.label`
	font-family: var(--font-secondary);
	font-size: var(--font-size-small);
	position: absolute;
	left: 16px;
	top: -10px;
	background-color: var(--color-background);
	text-transform: uppercase;
	padding: 0 6px;
	letter-spacing: 1px;
	transition: transform 0.3s, color 0.3s;
`;

export default TextInput;
