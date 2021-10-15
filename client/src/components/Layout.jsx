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
  margin: 0 auto;
  width: 50%;
  margin-bottom: 3rem;

  @media ${({ theme }) => theme.mobile} {
    width: 70%;
  }
`;

export default Layout;
