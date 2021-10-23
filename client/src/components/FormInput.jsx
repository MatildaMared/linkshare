import React from "react";
import styled from "styled-components";

const FormInput = React.forwardRef(
  (props, ref) => {
    const { name, label, type, value, onChange } = props;
		return (
			<Wrapper>
				<label htmlFor={name}>{label}</label>
				<input
					ref={ref}
					type={type}
					name={name}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</Wrapper>
		);
	}
);

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export default FormInput;
