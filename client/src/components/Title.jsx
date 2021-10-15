import React from 'react';
import styled from 'styled-components';

const Title = ({ children }) => {
  return <MemberShipTitle>{children}</MemberShipTitle>;
};
const MemberShipTitle = styled.h2`
  font-size: 1.75rem;
  padding: 2rem 1rem 0 1rem;
  text-align: center;
`;

export default Title;
