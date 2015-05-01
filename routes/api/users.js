import _ from 'lodash';
import async from 'async';
import keystone, { session } from 'keystone';

import logger from '../../logger';

const User = keystone.list('User');

export function create(req, res) {
  const doc = _.pick(req.body, 'name', 'email', 'fund', 'notifications');
  doc.password = keystone.utils.randomString([16, 24]);

  let user;

  async.series([
    (cb) => {
      User.model.findOne({ email: doc.email }).exec().then(
        (user) => {
          if (user) {
            const error = { message: `Sorry, it looks like ${doc.email} belongs to an existing account.` };
            logger.error(error);
            return res.status(409).json(error);
          }

          cb();
        },
        cb
      );
    },

    (cb) => {
      user = new User.model(doc);
      user.save((err) => { cb(err, user); });
    },
  ], (err, results) => {
    if (err) { logger.error(err); }
    if (err) { return res.status(400).json(err); }
    res.json({ user: user.toJSON() });
  });
}

export function resetPassword(req, res) {
  const { resetPasswordKey, password } = req.body;

  async.auto({
    findUser(cb) {
      User.model.findOne({ resetPasswordKey }).exec().then(
        (user) => {
          if (!user) {
            const error = { message: 'Sorry, we did not find a request for a password reset with your account.' };
            logger.error(error);
            return res.status(404).json(error);
          }

          cb(void 0, user);
        },
        cb
      );
    },

    clearResetPasswordKey: ['findUser', (cb, results) => {
      const { findUser: user } = results;

      user.resetPasswordKey = void 1;
      user.password = password;
      user.isVerified = true;

      user.save(cb);
    }],
  }, (err, results) => {
    if (err) { logger.error(err); }
    if (err) { return res.status(400).json(err); }

    const { findUser: user } = results;
    res.json({ user: user.toJSON() });
  });
}
