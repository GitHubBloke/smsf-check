import prefix from 'superagent-prefix';
import request from 'superagent';

import UserServerActionCreators from '../actions/UserServerActionCreators';

const prefixer = prefix('/api/users');

export default {
  signup(user) {
    request.post('/')
      .use(prefixer)
      .send(user)
      .end((err, res) => {
        if (err || !res.status === 200) {
          return UserServerActionCreators.handleSignupError(res.body);
        }

        UserServerActionCreators.handleSignupSuccess(res.body);
      }
    );
  },
};
