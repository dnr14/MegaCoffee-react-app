import React from 'react';
import styled from 'styled-components';

const Strong = ({ children }) => {
  return <Span>{children}</Span>;
};

const Span = styled.span`
  color: red;
  font-weight: bold;
`;

export default Strong;
