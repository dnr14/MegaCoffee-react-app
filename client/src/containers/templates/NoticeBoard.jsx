import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import RootRedirect from '@/Routers/RootRedirect';
import NoticeBoardContainer from '../organisms/NoticeBoardContainer';
import NoticeBoardInsertContainer from '../organisms/NoticeBoardInsertContainer';
import PrivateRouter from '@/Routers/PrivateRouter';
import NoticeBoardSelectContainer from '../organisms/NoticeBoardSelectContainer';

const NoticeBoard = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <section>
        <Switch>
          <Route path={`${url}`} component={NoticeBoardContainer} exact />
          <PrivateRouter
            path={`${url}/insert`}
            component={NoticeBoardInsertContainer}
          />
          <Route path={`${url}/:id`} component={NoticeBoardSelectContainer} />
          <RootRedirect />
        </Switch>
      </section>
    </Layout>
  );
};

const Layout = styled.main`
  max-width: 1300px;
  width: 80%;
  margin: 2rem auto;
  ${({ theme }) => theme.media.pc} {
    width: 90%;
  }
`;

export default NoticeBoard;
