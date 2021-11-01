import React from 'react';
import styled from 'styled-components';

const Transition = ({ children, ...rest }) => {
  return <StyledDiv {...rest}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
  .fade-enter {
    opacity: 0;
  }
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity ${({ duration }) => `${duration}ms`} linear 150ms;
  }
  .fade-exit {
    display: none;
  }
  .fade-exit.fade-exit-active {
    opacity: 0;
  }
`;

export default Transition;
