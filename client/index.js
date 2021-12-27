import App from './src/App';
import GlobalStyle from './src/assets/style/global';
import theme from './src/assets/style/theme';
import store from '@/modules/store';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
