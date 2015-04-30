import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivacyPage from './pages/PrivacyPage';
import RegisterPage from './pages/RegisterPage';
import TermsPage from './pages/TermsPage';

import MembersPage from './pages/steps/MembersPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route handler={HomePage}>
      <DefaultRoute handler={RegisterPage} />
      <Route name='login' handler={LoginPage} />
    </Route>

    <Route name='members' handler={MembersPage} />

    <Route name='terms' handler={TermsPage} />
    <Route name='privacy' handler={PrivacyPage} />
  </Route>
);
