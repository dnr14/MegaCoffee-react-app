import React from 'react';
import styled from 'styled-components';

const MenuEditor = ({ children }) => {
  return (
    <Layout>
      <span>음료 설명</span>
      {children}
    </Layout>
  );
};
const Layout = styled.div`
  span {
    display: block;
  }
  & > div {
    margin-top: 10px;
  }
`;

export default MenuEditor;
