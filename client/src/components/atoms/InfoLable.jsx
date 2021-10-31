import React from 'react';
import styled from 'styled-components';

const InfoLable = ({ children, ...rest }) => {
  return <Span {...rest}>{children}</Span>;
};

const Span = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default InfoLable;
