import styled from 'styled-components';

const AdminMenuBox = ({ children }) => {
  return (
    <Layout>
      <div>
        <span>음료 명</span>
        <input type="text" id="title" placeholder="제품명을 입력해주세요." />
      </div>
      <div>
        <span>음료 종류</span>
        <div>{children}</div>
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 20px;

  & > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;

    span {
      width: 110px;
    }
    input {
      height: 1rem;
      flex: 1;
      border: 2px solid transparent;
      ${({ theme }) => theme.boxShadow3};
      padding: 10px 0 10px 10px;
      letter-spacing: 1px;
    }
  }

  & > div > div {
    display: flex;
    gap: 10px;
  }

  ${({ theme }) => theme.media.mobileS} {
    & > div {
      padding-top: 1rem;
    }
  }
`;

export default AdminMenuBox;
