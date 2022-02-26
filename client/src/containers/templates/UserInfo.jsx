import Layout from '@/components/atoms/Layout';
import Title from '@/components/atoms/Title';
import UserInfoContainer from '@/containers/organisms/UserInfoContainer';
import styled from 'styled-components';

const UserInfo = () => {
  return (
    <Layout>
      <Inner>
        <Title>회원정보</Title>
        <UserInfoContainer />
      </Inner>
    </Layout>
  );
};

const Inner = styled.div`
  width: 50%;
  margin: 1rem auto;
  background-color: ${({ theme }) => theme.color.white2};
  border-radius: ${({ theme }) => theme.color.borderRadius1};
  ${({ theme }) => theme.boxShadow2};
  padding: 1.5rem;
  & > h2 {
    color: ${({ theme }) => theme.color.black1};
    font-weight: 700;
    margin-top: 1rem;
  }

  ${({ theme }) => theme.media.pc} {
    width: auto;
  }
`;
export default UserInfo;
