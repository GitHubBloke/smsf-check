/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

import _ from 'lodash';
import async from 'async';
import keystone from 'keystone';

/**
  Disable caching
**/

export function removeCache(req, res, next) {
  res.set('cache-control', 'no-cache, max-age=0');
  res.set('pragma', 'no-cache');
  next();
}

/**
  Initialises the standard view locals

  The included layout depends on the navLinks array to generate
  the navigation in the header, you may wish to change this array
  or replace it with your own templates / logic.
*/

export function initLocals(req, res, next) {
  const { locals } = res;
  const clientLocals = keystone.get('client locals');

  locals.navLinks = [
    { label: 'Home', key: 'home', href: '/' },
  ];

  locals.client = _.assign({}, clientLocals);

  if (req.user) {
    req.user.populateCascade().then(
      (user) => {
        locals.user = user;
        locals.client.user = user;
        next();
      },
      (err) => next(err)
    );
  } else {
    next();
  }
}


/**
  Fetches and clears the flashMessages before a view is rendered
*/

export function flashMessages(req, res, next) {
  const messages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  res.locals.messages = _.any(messages, function(msgs) { return msgs.length; }) ? messages : false;

  next();
}


/**
  Prevents people from accessing protected pages when they're not signed in
 */

export function requireUser(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }
}
