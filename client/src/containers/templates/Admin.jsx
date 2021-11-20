import React from 'react';
import styled from 'styled-components';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import RootRedirect from '@/Routers/RootRedirect';
import Title from '@/components/atoms/Title';
import AdminLinks from '@/components/molecules/AdminLinks';
import UsersContainer from '../organisms/UsersContainer';
import UsersSearchConatiner from '../organisms/UsersSearchConatiner';
import UsersSortContainer from '../organisms/UsersSortContainer';
import MenuInsertContainer from '../organisms/MenuInsertContainer';
import MenuContextProvider from '../organisms/MenuContextProvider';
import MenusContainer from '../organisms/MenusContainer';
import Layout from '@/components/atoms/Layout';

const Admin = () => {
  const match = useRouteMatch();

  return (
    <Layout>
      <Container>
        <Title>관리자페이지</Title>
        <AdminLinks match={match} />
        <Switch>
          <Route path={`${match.path}/users`}>
            <UsersSearchConatiner />
            <UsersSortContainer />
            <UsersContainer />
          </Route>
          <Route path={[`${match.path}/menu/:id`, `${match.path}/menu`]}>
            <MenuContextProvider>
              <MenuInsertContainer />
              <MenusContainer />
            </MenuContextProvider>
          </Route>
          <RootRedirect />
        </Switch>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  padding: 2rem 1rem;
  background-color: rgb(248, 249, 250);
  box-shadow: 2px 2px 2px rgb(248, 249, 250);
`;

export default Admin;
