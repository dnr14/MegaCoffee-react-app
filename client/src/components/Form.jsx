import React from 'react';
import styled from 'styled-components';

const Form = ({ children, ...rest }) => {
  return <StyledForm {...rest}>{children}</StyledForm>;
};

const StyledForm = styled.form`
  display: flex;
  margin-top: 1.5rem;
  flex-direction: column;
  gap: 1rem;

  @media ${({ theme }) => theme.mobile} {
    gap: 0.5rem;
  }
`;

export default Form;
