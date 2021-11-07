import React from 'react';
import styled from 'styled-components';

const ReadOnly = ({ ...rest }) => {
  return <StyledInput {...rest} readOnly />;
};

const StyledInput = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-top: 0.7rem;
  line-height: 1.875rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-size: 1.1rem;
  letter-spacing: 0.123rem;
  border: 0px;
  border-bottom: 1px solid black;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border 0.35s ease-in;

  &::placeholder {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.shadowColor};
  }
`;

export default ReadOnly;
