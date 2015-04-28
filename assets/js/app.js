import React from 'react';
import Router, { Router, RouteHandler, Link } from 'react-router';

const routes = (
  <Route handler={App}>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});
