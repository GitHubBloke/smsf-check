import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './App';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

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
