import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({ children, ...rest }) => {
  return (
    <StyledButton type="submit" {...rest}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 100%;
  padding: 0.7rem 0rem;
  border: 1px solid transparent;
  letter-spacing: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: opacity 0.35s ease-in, transform 0.35s ease-in;
  box-shadow: 2px 5px 5px ${({ theme }) => theme.color.shadowColor};
  background-color: ${({ theme }) => theme.color.magacoffeColor1};
  color: ${({ theme }) => theme.color.white1};
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}

  :hover {
    animation-duration: 2s;
    animation-name: scale;
    animation-iteration-count: infinite;
    opacity: 0.9;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Button;
