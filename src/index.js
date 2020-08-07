import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/globals.css';
import './styles/layout.css';
import './styles/index.css';

// Css for loader spinner
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Routes from './constants/routes';
import store from './store';

const App = () => <Routes />;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
