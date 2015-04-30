import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let signingIn;

const AuthStore = createStore({
  signingIn() {
    return signingIn;
  },

  signedIn(email) {
    if (!email) {
      return !!locals.user;
    } else {
      return locals.user && locals.user.email === email;
    }
  },

  getUser() {
    return locals.user;
  },
});

AuthStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response } = action;

  const user = response && response.user;

  switch (action.type) {
    case ActionTypes.SIGNIN:
      signingIn = true;
      break;

    case ActionTypes.SIGNIN_SUCCESS:
      signingIn = false;
      locals.user = user;
      break;

    case ActionTypes.SIGNIN_ERROR:
      signingIn = false;
      break;

    case ActionTypes.SIGNOUT_SUCCESS:
      delete locals.user;
      break;

    default:
      return;
  }

  AuthStore.emitChange();
});

export default AuthStore;
