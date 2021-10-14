import React from 'react';
import Routers from './Routers';
import Top from './pages/Top/Top';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Top />
      <Routers />
    </BrowserRouter>
  );
};

export default App;
