import NoticeBoardContainer from '../organisms/NoticeBoardContainer';
import NoticeBoardInsertContainer from '../organisms/NoticeBoardInsertContainer';
import NoticeBoardModifyContainer from '../organisms/NoticeBoardModifyContainer';
import NoticeBoardSelectContainer from '../organisms/NoticeBoardSelectContainer';
import PrivateRouter from '@/Routers/PrivateRouter';
import RootRedirect from '@/Routers/RootRedirect';
import { currentNoticeNumberRemove } from '@/utils/localstorege';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const NoticeBoard = () => {
  const { url } = useRouteMatch();

  useEffect(() => () => currentNoticeNumberRemove(), []);

  return (
    <Layout>
      <article>
        <Switch>
          <PrivateRouter path={`${url}/insert`} component={NoticeBoardInsertContainer} />
          <PrivateRouter path={`${url}/modify`} component={NoticeBoardModifyContainer} />
          <Route path={`${url}/:id`} component={NoticeBoardSelectContainer} />
          <Route path={`${url}`} component={NoticeBoardContainer} />
          <RootRedirect />
        </Switch>
      </article>
    </Layout>
  );
};

const Layout = styled.main`
  max-width: 1300px;
  width: 90%;
  margin: 2rem auto;
  ${({ theme }) => theme.media.pc} {
    width: 90%;
  }
`;

export default NoticeBoard;
