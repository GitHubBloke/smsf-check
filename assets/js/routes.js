import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from './App';

import ToolPage from './pages/ToolPage';

import ConfirmEmailPage from './pages/auth/ConfirmEmailPage';
import RegisterPage from './pages/auth/RegisterPage';
import SigninPage from './pages/auth/SigninPage';
import SignoutPage from './pages/auth/SignoutPage';

import MembersPage from './pages/steps/MembersPage';
import TrustPage from './pages/steps/TrustPage';
import AccountingPage from './pages/steps/AccountingPage';
import InvestmentAdvicePage from './pages/steps/InvestmentAdvicePage';
import ResultsPage from './pages/steps/ResultsPage';

import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

import NotFoundPage from './pages/errors/NotFoundPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route path='/' handler={RegisterPage} />
    <Route name='confirm-email' path='/confirm-email/:resetPasswordKey' handler={ConfirmEmailPage} />
    <Route name='signin' handler={SigninPage} />
    <Route name='signout' handler={SignoutPage} />
    <Route name='terms' handler={TermsPage} />
    <Route name='privacy' handler={PrivacyPage} />

    <Route handler={ToolPage}>
      <Route name='members' handler={MembersPage} />
      <Route name='trust' handler={TrustPage} />
      <Route name='accounting' handler={AccountingPage} />
      <Route name='investment-advice' handler={InvestmentAdvicePage} />
      <Route name='results' handler={ResultsPage} />
    </Route>

    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);
