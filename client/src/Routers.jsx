import React from 'react';
import { Route, Switch } from 'react-router';
import Main from '@/pages/Main/Main';
import MemberShip from './pages/MemberShip/MemberShip';

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/membership" component={MemberShip} exact />
    </Switch>
  );
};

export default Routers;
