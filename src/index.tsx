import { GlobalStyles, MantineProvider, NormalizeCSS } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import App from './app/App';

import './styles/custom.css';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import 'reactjs-popup/dist/index.css';

ReactDOM.render(
  <MantineProvider>
    <NotificationsProvider>
      {/* <NormalizeCSS />
      <GlobalStyles /> */}
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </Router>
      </Provider>
    </NotificationsProvider>
  </MantineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
