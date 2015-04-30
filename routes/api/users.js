import _ from 'lodash';
import keystone, { session } from 'keystone';
import generatePassword from 'password-generator';

import logger from '../../logger';

const User = keystone.list('User');

export function create(req, res) {
  const doc = _.pick(req.body, 'name', 'email', 'fund');
  doc.password = generatePassword(30, false);

  const newUser = new User.model(doc);
  newUser.save(function(err) {
    if (err) { logger.err(err); }
    if (err) { return res.status(400).json({ message: err.message }); }
    res.json({ user: _.pick(req.user, 'name', 'email', 'isAdmin') });
  });
}
