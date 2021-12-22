import { Route, Switch } from 'react-router-dom';

import Find from '@/containers/templates/Find';
import Login from '@/containers/templates/Login';
import Logout from '@/containers/templates/Logout';
import MemberShip from '@/containers/templates/MemberShip';
import UserInfo from '@/containers/templates/UserInfo';
import Welcome from '@/containers/templates/Welcome';

import MainPage from '@/pages/Main/MainPage';
import NoticeBoardPage from '@/pages/NoticeBoard/NoticeBoardPage';
import AdminPage from './pages/Admin/AdminPage';
import CategoryPage from './pages/Category/CategoryPage';

import AdminRouter from './Routers/AdminRouter';
import PrivateRouter from './Routers/PrivateRouter';
import PublicRouter from './Routers/PublicRouter';
import RootRedirect from './Routers/RootRedirect';

const Routers = () => {
  return (
    <Switch>
      <Route path="/find" component={Find} />
      <Route path="/category" component={CategoryPage} />
      <Route path="/noticeBoard" component={NoticeBoardPage} />
      <PublicRouter path="/login" component={Login} restricted />
      <PublicRouter path="/memberShip" component={MemberShip} restricted />
      <PrivateRouter path="/logout" component={Logout} restricted />
      <PrivateRouter path="/info" component={UserInfo} restricted />
      <AdminRouter path="/admin" component={AdminPage} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/" component={MainPage} exact />
      <RootRedirect />
    </Switch>
  );
};

export default Routers;
