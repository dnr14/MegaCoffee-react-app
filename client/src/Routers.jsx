import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '@/pages/Main/Main';
import MemberShip from '@/containers/templates/MemberShip';
import Login from '@/containers/templates/Login';
import Welcome from '@/containers/templates/Welcome';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import Logout from '@/containers/templates/Logout';
import UserInfo from '@/containers/templates/UserInfo';
import Find from '@/containers/templates/Find';
import RootRedirect from './RootRedirect';
import AdminRouter from './Routers/AdminRouter';
import AdminPage from './pages/Admin/AdminPage';

const Routers = () => {
  return (
    <Switch>
      <Route path="/find" component={Find} />
      <PublicRouter path="/login" component={Login} restricted />
      <PublicRouter path="/memberShip" component={MemberShip} restricted />
      <PrivateRouter path="/logout" component={Logout} restricted />
      <PrivateRouter path="/info" component={UserInfo} restricted />
      <AdminRouter path="/admin" component={AdminPage} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/" component={Main} exact />
      <RootRedirect />
    </Switch>
  );
};

export default Routers;
