import React from 'react';
import styled from 'styled-components';

const Layout = ({ children }) => {
  return (
    <main>
      <section>
        <Container>{children}</Container>
      </section>
    </main>
  );
};

const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  padding-bottom: 1px;
  margin: 0 auto;
  width: 50%;

  ${({ theme }) => theme.media.mobile} {
    width: 70%;
  }
  ${({ theme }) => theme.media.mobileS} {
    width: 90%;
  }
`;

export default Layout;
