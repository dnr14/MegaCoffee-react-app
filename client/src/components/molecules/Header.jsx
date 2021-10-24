import React from 'react';
import styled from 'styled-components';

const Header = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  background: ${({ theme }) => `${theme.color.magacoffeColor}`};
  color: ${({ theme }) => `${theme.color.white1}`};

  ${({ theme }) => theme.media.tab} {
    font-size: 2rem;
    justify-content: flex-end;
  }
`;

export default Header;
