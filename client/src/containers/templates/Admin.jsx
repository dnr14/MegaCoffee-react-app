import React from 'react';
import styled from 'styled-components';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import RootRedirect from '@/RootRedirect';
import Title from '@/components/atoms/Title';
import AdminLinks from '@/components/molecules/AdminLinks';
import UsersContainer from '../organisms/UsersContainer';
import UsersSearchConatiner from '../organisms/UsersSearchConatiner';
import UsersSortContainer from '../organisms/UsersSortContainer';

const Admin = () => {
  const match = useRouteMatch();

  return (
    <main>
      <section>
        <Container>
          <Title>관리자페이지</Title>
          <AdminLinks match={match} />
          <Switch>
            <Route path={`${match.path}/users`}>
              <UsersSearchConatiner />
              <UsersSortContainer />
              <UsersContainer />
            </Route>
            <Route path={`${match.path}/menu`}>메뉴등록 라우터</Route>
            <RootRedirect />
          </Switch>
        </Container>
      </section>
    </main>
  );
};

const Container = styled.div`
  padding: 2rem 1rem;
  background-color: rgb(248, 249, 250);
  box-shadow: 2px 2px 2px rgb(248, 249, 250);

  /* ${({ theme }) => theme.media.tab} {
    font-size: 0.5rem;
    padding: 0;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.4rem;
  }
  ${({ theme }) => theme.media.mobileS} {
    font-size: 0.3rem;
  } */
`;

export default Admin;
