import React from 'react';
import styled from 'styled-components';

const Form = ({ children, ...rest }) => {
  return <StyledForm {...rest}>{children}</StyledForm>;
};

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
  flex-direction: column;
  gap: 1rem;

  ${({ theme }) => theme.media.mobile} {
    gap: 0.5rem;
    padding: 1rem;
  }
`;

export default Form;
