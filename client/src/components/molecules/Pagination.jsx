import React from 'react';
import styled, { keyframes } from 'styled-components';

const Pagination = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

const Ymove = keyframes`
 0% {
    transform: translateY(0)
  }
  50% {
    transform: translateY(-3px)
  }
  100% {
    transform: translateY(0px)
  }
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 0.5rem;
  font-size: 0.7rem;

  span {
    border: 1px solid rgba(149, 165, 166, 0.2);
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    transition: transform 0.25s ease-in-out;
  }
  span:hover,
  .current {
    background-color: ${({ theme }) => theme.color.magacoffeColor1};
    color: white;
    font-weight: bold;
    animation: ${Ymove} 2s 1s infinite linear alternate;
  }
`;

export default Pagination;
