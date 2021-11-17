import React from 'react';
import styled, { css } from 'styled-components';

const checkedCss = css`
  border: 0;
  border: 1px solid ${({ theme }) => theme.color.coffee1};
  border-bottom: 0;
`;

const CategoryLabel = ({ children, ...rest }) => (
  <StyledDiv {...rest}>{children}</StyledDiv>
);

const StyledDiv = styled.div`
  text-align: center;
  font-size: 0.8rem;
  flex: 1;

  a {
    border-left: 1px solid rgba(45, 52, 54, 0.2);
    border-top: 1px solid rgba(45, 52, 54, 0.2);
    border-bottom: 1px solid ${({ theme }) => theme.color.coffee1};
    display: block;
    line-height: 1.5;
    padding: 0.8rem 1rem;
    &:hover {
      color: ${({ theme }) => theme.color.coffee1};
      font-weight: bold;
    }
  }
  &:last-child a {
    border-right: 1px solid rgba(45, 52, 54, 0.2);
  }
  a,
  &:last-child a {
    ${({ checked }) => checked && checkedCss}
  }
`;

export default CategoryLabel;
