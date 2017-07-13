import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import rootRoute from './routes/route';
import 'semantic-ui-css/semantic.css';
import './index.css';

let history = useRouterHistory(createHistory)({
  basename: document.head.baseURI,
});

ReactDOM.render(
  <Router history={history} routes={rootRoute} />,
  document.querySelector('#root')
);
