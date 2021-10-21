import React, { memo } from 'react';
import styled from 'styled-components';

const Error = ({ children }) => {
  return <Span>{children}</Span>;
};

const Span = styled.span`
  color: ${({ theme }) => theme.color.red1};
  font-size: 0.8rem;
  line-height: 1rem;
  ${({ theme }) => theme.media.tab} {
    font-size: 0.7rem;
  }
`;

export default memo(Error);
