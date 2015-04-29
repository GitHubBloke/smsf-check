import _ from 'lodash';
import keystone, { session } from 'keystone';

import logger from '../../logger';

const User = keystone.list('User');

export function signin(req, res) {
  if (!req.body.email || !req.body.password) {
    logger.error({ message: 'Missing email or password' });
    return res.sendStatus(400);
  }

  const onError = (err) => {
    logger.error(err);
    res.sendStatus(403);
  };

  User.model.findOne({ email: req.body.email }).exec().then(
    (user) => {
      if (!user) { return res.sendStatus(403); }
      session.signin({ email: user.email, password: req.body.password }, req, res,
        (user) => res.json(_.pick(req.user, 'name', 'email', 'isAdmin')),
        onError
      );
    },
    onError
  );
}

export function signout(req, res) {
  session.signout(req, res, () => res.sendStatus(200));
}
