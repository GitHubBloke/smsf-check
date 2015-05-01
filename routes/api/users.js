import _ from 'lodash';
import async from 'async';
import keystone, { session } from 'keystone';

import logger from '../../logger';

const User = keystone.list('User');

export function create(req, res) {
  const doc = _.pick(req.body, 'name', 'email', 'fund', 'notifications');
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
