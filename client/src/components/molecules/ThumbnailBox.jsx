import React from 'react';
import styled from 'styled-components';

const ThumbnailBox = ({ children }) => {
  return <Layout>{children}</Layout>;
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
`;

export default ThumbnailBox;
