import React from 'react';
import Router, { Route, RouteHandler, DefaultRoute } from 'react-router';

import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivacyPage from './pages/PrivacyPage';
import RegisterPage from './pages/RegisterPage';
import TermsPage from './pages/TermsPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route handler={HomePage}>
      <DefaultRoute handler={RegisterPage} />
      <Route name='login' handler={LoginPage} />
    </Route>

    <Route name='terms' handler={TermsPage} />
    <Route name='privacy' handler={PrivacyPage} />
  </Route>
);
