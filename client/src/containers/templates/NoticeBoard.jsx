import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import RootRedirect from '@/Routers/RootRedirect';
import NoticeBoardContainer from '../organisms/NoticeBoardContainer';
import NoticeBoardInsertContainer from '../organisms/NoticeBoardInsertContainer';
import PrivateRouter from '@/Routers/PrivateRouter';
import NoticeBoardSelectContainer from '../organisms/NoticeBoardSelectContainer';
import NoticeBoardModifyContainer from '../organisms/NoticeBoardModifyContainer';

const NoticeBoard = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <section>
        <Switch>
          <PrivateRouter
            path={`${url}/insert`}
            component={NoticeBoardInsertContainer}
          />
          <PrivateRouter
            path={`${url}/modify`}
            component={NoticeBoardModifyContainer}
          />
          <Route path={`${url}/:id`} component={NoticeBoardSelectContainer} />
          <Route path={`${url}`} component={NoticeBoardContainer} />
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
