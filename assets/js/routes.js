import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './App';

import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';

import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

import RegisterPage from './pages/auth/RegisterPage';
import SigninPage from './pages/auth/SigninPage';
import SignoutPage from './pages/auth/SignoutPage';

import MembersPage from './pages/steps/MembersPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route handler={HomePage}>
      <DefaultRoute handler={RegisterPage} />
      <Route name='signin' handler={SigninPage} />
    </Route>

    <Route handler={ToolPage}>
      <Route name='members' handler={MembersPage} />
    </Route>

    <Route name='signout' handler={SignoutPage} />

    <Route name='terms' handler={TermsPage} />
    <Route name='privacy' handler={PrivacyPage} />
  </Route>
);
