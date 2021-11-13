import React, { memo } from 'react';
import styled from 'styled-components';

const Error = ({ children }) => {
  return <Span>{children}</Span>;
};

const Span = styled.span`
  position: absolute;
  color: white;
  padding: 0.5rem;
  font-size: 0.6rem;
  line-height: 1rem;
  z-index: 1;
  top: 120%;
  left: 0;
  right: 0;
  box-shadow: ${({ theme }) => theme.boxShadow1};
  background: ${({ theme }) => theme.color.red1};
  ${({ theme }) => theme.media.tab} {
    font-size: 0.7rem;
  }
`;

export default memo(Error);
