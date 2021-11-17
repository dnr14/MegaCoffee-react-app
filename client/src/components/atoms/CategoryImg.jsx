import React from 'react';
import styled from 'styled-components';

const CategoryImg = ({ children, ...rest }) => {
  return <StyledImg {...rest}>{children}</StyledImg>;
};

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  top: 0;
`;

export default CategoryImg;
