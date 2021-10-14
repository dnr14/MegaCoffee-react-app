import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import GlobalStyle from './src/assets/style/global';
import theme from './src/assets/style/Theme';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
