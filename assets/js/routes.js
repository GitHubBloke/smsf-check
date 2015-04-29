import React from 'react';
import Router, { Route, RouteHandler, DefaultRoute } from 'react-router';

import App from './App';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route handler={HomePage}>
      <DefaultRoute handler={RegisterPage} />
      <Route name='login' handler={LoginPage} />
    </Route>
  </Route>
);
