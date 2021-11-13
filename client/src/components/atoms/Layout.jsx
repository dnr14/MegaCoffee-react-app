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
  padding: 1px 0;
  margin: 0 auto;
  width: 60%;
  align-items: center;

  ${({ theme }) => theme.media.tab} {
    width: 70%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

export default Layout;
