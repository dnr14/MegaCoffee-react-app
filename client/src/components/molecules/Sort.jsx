import React from 'react';
import styled from 'styled-components';

const Sort = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 1rem;
`;

export default Sort;
