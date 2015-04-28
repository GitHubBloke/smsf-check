/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

import expressWinston from 'express-winston';
import keystone from 'keystone';

import logger from '../logger';
import { initLocals, flashMessages } from './middleware';

const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', initLocals);
keystone.pre('render', flashMessages);

// Import Route Controllers
const routes = {
  views: importRoutes('./views'),
};

// Setup Route Bindings
export default function(app) {
  app.get('/', routes.views.index);

  app.use(expressWinston.errorLogger({ winstonInstance: logger }));

  /*eslint-disable handle-callback-err */
  app.use((err, req, res, next) => { res.sendStatus(500); });
  /*eslint-enable handle-callback-err */

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);

}
