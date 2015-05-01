/**
 * This file defines the email tests for your project.
 *
 * Each email test should provide the locals used to render the
 * email template for preview.
 *
 * Values can either be an object (for simple tests), or a
 * function that calls a callback(err, locals).
 *
 * Sample generated emails, based on the keys and methods below,
 * can be previewed at /keystone/test-email/{key}
 */

import keystone from 'keystone';

const User = keystone.list('User');

const user = new User.model({
  name: { first: 'Test', last: 'User' },
  email: 'test@test.com',
  resetPasswordKey: keystone.utils.randomString([16, 24]),
});

export default {
  'confirm-email': (req, res, cb) => {
    cb(null, { user });
  },

  'reset-password': (req, res, cb) => {
    cb(null, { user });
  },
};
