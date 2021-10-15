import React from 'react';
import styled from 'styled-components';

const FormButton = ({ children, ...rest }) => {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  padding: 0.7rem 0rem;
  border: 1px solid transparent;
  letter-spacing: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: opacity 0.35s ease-in;
  transition: transform 0.35s ease-in;
  box-shadow: 2px 5px 5px ${props => props.theme.shadowColor};
  background-color: ${props => props.theme.magacoffeColor};
  color: ${props => props.theme.whiteColor};

  :hover {
    transform: scale(1.02);
    opacity: 0.9;
  }
`;

export default FormButton;
