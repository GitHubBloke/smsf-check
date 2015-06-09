import Immutable from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import analytics from '../shims/analytics';
import AppDispatcher from '../dispatcher/AppDispatcher';
import locals from '../utils/locals';
import mixpanel from '../shims/mixpanel';
import { createStore } from '../utils/StoreUtils';

let signingIn, signinError, signingOut;
let currentUser = Immutable.fromJS(locals.user);

const AuthStore = createStore({
  signingIn() { return signingIn; },

  signedIn(email) {
    if (!email) {
      return !!currentUser;
    } else {
      return currentUser && currentUser.get('email') === email;
    }
  },

  getSigninError() { return signinError; },
  signingOut() { return signingOut; },
  getUser() { return currentUser; },
});

AuthStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response, err } = action;

  const user = response && response.user;

  switch (action.type) {
    case ActionTypes.SIGNIN:
      signingIn = true;
      signinError = void 0;
      break;

    case ActionTypes.SIGNIN_SUCCESS:
      signingIn = false;
      currentUser = Immutable.fromJS(user);
      signinError = void 0;

      if (analytics) {
        analytics.identify(user.id, {
          name: `${user.name.first} ${user.name.last}`,
          firstName: user.name.first,
          lastName: user.name.last,
          lastSeen: new Date(),
          username: user.email,
          email: user.email,
          createdAt: new Date(parseInt(user.id.substring(0, 8), 16) * 1000),
        });
      }

      break;

    case ActionTypes.SIGNIN_ERROR:
      signingIn = false;
      signinError = err;
      break;

    case ActionTypes.CLEAR_SIGNIN_ERROR:
      signinError = void 0;
      break;

    case ActionTypes.SIGNOUT:
      signingOut = true;
      break;

    case ActionTypes.SIGNOUT_SUCCESS:
      signingOut = false;
      currentUser = void 0;

      if (analytics) { analytics.reset(); }
      if (mixpanel) { mixpanel.cookie.clear(); }
      break;

    case ActionTypes.SIGNOUT_ERROR:
      signingOut = false;
      break;

    default:
      return;
  }

  AuthStore.emitChange();
});

export default AuthStore;
