import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import MemberShip from '@/containers/templates/MemberShip';
import Login from '@/containers/templates/Login';
import Welcome from '@/containers/templates/Welcome';

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/membership" component={MemberShip} />
      <Route path="/welcome" component={Welcome} />
    </Switch>
  );
};

export default Routers;
