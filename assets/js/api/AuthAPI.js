import prefix from 'superagent-prefix';
import request from 'superagent';

import AuthServerActionCreators from '../actions/AuthServerActionCreators';

const prefixer = prefix('/api');

export default {
  signin(email, password) {
    request.post('/signin')
      .use(prefixer)
      .send({ email, password })
      .end((err, res) => {
        if (err || !res.status === 200) {
          return AuthServerActionCreators.handleSigninError(err || 'Forbidden');
        }

        AuthServerActionCreators.handleSigninSuccess(res.body);
      }
    );
  },

  signout() {
    request.post('/signout')
      .use(prefixer)
      .end((err, res) => {
        if (err || !res.status === 200) {
          return AuthServerActionCreators.handleSignoutError(err);
        }

        AuthServerActionCreators.handleSignoutSuccess();
      }
    );
  },
};
