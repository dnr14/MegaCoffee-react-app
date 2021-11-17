import React from 'react';
import styled, { css } from 'styled-components';

const CategorySpan = ({ children, ...rest }) => {
  return <Temperature {...rest}>{children}</Temperature>;
};

const Temperature = styled.span`
  background-color: ${({ theme }) => theme.color.magacoffeColor1};
  display: inline-block;
  padding: 0.3rem 0.5rem;
  border-radius: 20px;
  font-size: 0.6rem;
  font-weight: 900;
  color: white;
  margin-right: 0.5rem;

  ${({ ice }) =>
    ice &&
    css`
      background-color: #a6bee0;
    `}
`;

export default CategorySpan;
