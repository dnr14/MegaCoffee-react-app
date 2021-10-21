import React, { memo } from 'react';
import styled from 'styled-components';

const Title = ({ children }) => {
  return <H2>{children}</H2>;
};
const H2 = styled.h2`
  line-height: 2.5rem;
  font-size: 1.75rem;
  padding: 2rem 1rem 0 1rem;
  letter-spacing: 0.2rem;
  text-align: center;
  word-break: keep-all;
`;

export default memo(Title);
