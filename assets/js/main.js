import React from 'react';
import Router, { Route, RouteHandler, DefaultRoute, Link } from 'react-router';

import App from './App';
import Home from './Home';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const routes = (
  <Route name='app' path='/' handler={App}>
    <Route handler={Home}>
      <DefaultRoute handler={RegisterForm} />
      <Route name='login' handler={LoginForm} />
    </Route>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});
