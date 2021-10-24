import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/atoms/Layout';
import Title from '@/components/atoms/Title';
import UserInfoContainer from '@/containers/organisms/UserInfoContainer';

const UserInfo = () => {
  return (
    <Layout>
      <Inner>
        <Title>Modified</Title>
        <UserInfoContainer />
      </Inner>
    </Layout>
  );
};

const Inner = styled.div`
  margin: 1rem 0;
  box-shadow: 2px 2px 10px ${({ theme }) => theme.color.shadowColor};
  background-color: ${({ theme }) => theme.color.white2};
  border-radius: ${({ theme }) => theme.color.borderRadius1};
  padding: 1.5rem;
  & > h2 {
    color: ${({ theme }) => theme.color.black1};
    font-weight: 700;
    margin-top: 1rem;
  }
`;
export default UserInfo;
