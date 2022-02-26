import MenuContextProvider from '../organisms/MenuContextProvider';
import MenuInsertContainer from '../organisms/MenuInsertContainer';
import MenusContainer from '../organisms/MenusContainer';
import UsersContainer from '../organisms/UsersContainer';
import UsersSearchConatiner from '../organisms/UsersSearchConatiner';
import UsersSortContainer from '../organisms/UsersSortContainer';
import RootRedirect from '@/Routers/RootRedirect';
import Layout from '@/components/atoms/Layout';
import Title from '@/components/atoms/Title';
import AdminLinks from '@/components/molecules/AdminLinks';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const Admin = () => {
  const match = useRouteMatch();

  return (
    <AdminWrapper>
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
    </AdminWrapper>
  );
};

const AdminWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Container = styled.div`
  padding: 1rem 0.5rem;
  background-color: rgb(248, 249, 250);
  box-shadow: 2px 2px 2px rgb(248, 249, 250);
`;

export default Admin;
