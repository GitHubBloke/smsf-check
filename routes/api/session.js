import _ from 'lodash';
import keystone, { session } from 'keystone';

import logger from '../../logger';

const User = keystone.list('User');

export function signin(req, res) {
  if (!req.body.email || !req.body.password) {
    const error = { message: 'Both email address and password are required' };
    logger.error(error);
    return res.status(400).json(error);
  }

  const onError = (err) => {
    const error = { message: (err && err.message) || 'The password you entered is incorrect.' };
    logger.error(error);
    return res.status(403).json(error);
  };

  User.model.findOne({ email: req.body.email }).exec().then(
    (user) => {
      if (!user) { return onError(); }
      session.signin({ email: user.email, password: req.body.password }, req, res,
        (user) => res.json({ user: _.pick(req.user, 'name', 'email', 'isAdmin') }),
        onError
      );
    },
    onError
  );
}

export function signout(req, res) {
  session.signout(req, res, () => res.sendStatus(200));
}
