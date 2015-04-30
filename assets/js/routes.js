import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './App';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

import SigninPage from './pages/auth/SigninPage';
import RegisterPage from './pages/auth/RegisterPage';

import MembersPage from './pages/steps/MembersPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route handler={HomePage}>
      <DefaultRoute handler={RegisterPage} />
      <Route name='signin' handler={SigninPage} />
    </Route>

    <Route name='members' handler={MembersPage} />

    <Route name='terms' handler={TermsPage} />
    <Route name='privacy' handler={PrivacyPage} />
  </Route>
);
