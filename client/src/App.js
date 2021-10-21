import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routers';
import Top from './containers/templates/Top';
import Bottom from './containers/templates/Bottom';

const App = () => {
  return (
    <BrowserRouter>
      <Top />
      <Routers />
      <Bottom />
    </BrowserRouter>
  );
};

export default App;
