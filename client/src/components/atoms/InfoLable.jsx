import React from 'react';
import styled from 'styled-components';

const InfoLable = ({ children, ...rest }) => {
  return <Span {...rest}>{children}</Span>;
};

const Span = styled.span`
  display: block;
`;

export default InfoLable;
