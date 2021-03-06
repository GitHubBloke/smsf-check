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
import InvestmentStrategyPage from './pages/steps/InvestmentStrategyPage';
import EstatePlanningPage from './pages/steps/EstatePlanningPage';
import InsurancePage from './pages/steps/InsurancePage';
import PensionsPage from './pages/steps/PensionsPage';
import ContributionsPage from './pages/steps/ContributionsPage';
import ResultsPage from './pages/steps/ResultsPage';

import NotFoundPage from './pages/errors/NotFoundPage';

export default (
  <Route name='app' path='/' handler={App}>
    <Route path='/' handler={RegisterPage} />
    <Route name='confirm-email' path='/confirm-email/:resetPasswordKey' handler={ConfirmEmailPage} />
    <Route name='signin' handler={SigninPage} />
    <Route name='signout' handler={SignoutPage} />

    <Route handler={ToolPage}>
      <Route name='members' handler={MembersPage} />
      <Route name='trust' handler={TrustPage} />
      <Route name='accounting' handler={AccountingPage} />
      <Route name='investment-advice' handler={InvestmentAdvicePage} />
      <Route name='investment-strategy' handler={InvestmentStrategyPage} />
      <Route name='estate-planning' handler={EstatePlanningPage} />
      <Route name='insurance' handler={InsurancePage} />
      <Route name='pensions' handler={PensionsPage} />
      <Route name='contributions' handler={ContributionsPage} />
      <Route name='results' handler={ResultsPage} />
    </Route>

    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);
