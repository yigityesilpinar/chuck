import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import './index.css';
import App from './App';

const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById('root')
);
