import React from 'react';
import styled from 'styled-components';

const Bottom = () => {
  return <Footer />;
};

const Footer = styled.footer`
  min-height: 5rem;
  background-color: ${({ theme }) => theme.color.magacoffeColor1};
`;

export default Bottom;
