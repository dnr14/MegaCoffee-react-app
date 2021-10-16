import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routers';
import Top from './pages/Top/Top';
import Bottom from './pages/Bottom/Bottom';

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
