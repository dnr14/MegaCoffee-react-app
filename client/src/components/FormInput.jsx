import React from 'react';
import styled, { css } from 'styled-components';

const FormInput = ({ ...rest }) => {
  return <StyledInput {...rest} />;
};

const StyledInput = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-top: 0.7rem;
  line-height: 1.875rem;
  padding-left: 0.5rem;
  font-size: 1.1rem;
  border: 1px solid rgba(45, 52, 54, 0.8);
  border-radius: ${({ theme }) => theme.borderRadius};
  ${props =>
    props.error &&
    css`
      border: 1px solid red;
    `};
`;

export default FormInput;
