import styled from 'styled-components';

const Layout = ({ children }) => (
  <main>
    <Container>{children}</Container>
  </main>
);

const Container = styled.article`
  max-width: ${({ theme }) => theme.maxWidth};
  padding: 1px 0;
  margin: 0 auto;
  width: 60%;
  align-items: center;
  min-height: 800px;
  display: flex;
  & > div {
    flex: 1;
  }

  ${({ theme }) => theme.media.tab} {
    width: 70%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

export default Layout;
