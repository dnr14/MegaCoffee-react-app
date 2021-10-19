import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import MemberShip from '@/pages/MemberShip/MemberShip';
import Login from '@/pages/Login/Login';
import Welcome from '@/pages/Welcome/Welcome';

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
