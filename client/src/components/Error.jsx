import React, { memo } from 'react';
import styled from 'styled-components';

const Error = ({ children }) => {
  return <Span>{children}</Span>;
};

const Span = styled.span`
  color: ${({ theme }) => theme.color.red1};
  font-size: 0.8rem;
  ${({ theme }) => theme.media.tab} {
    font-size: 0.5rem;
  }
`;

export default memo(Error);
