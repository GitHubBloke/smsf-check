import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let signingIn;
let error;

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

  getError() {
    return error;
  }
});

AuthStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response, err } = action;

  const user = response && response.user;

  switch (action.type) {
    case ActionTypes.SIGNIN:
      signingIn = true;
      error = void 0;
      break;

    case ActionTypes.SIGNIN_SUCCESS:
      signingIn = false;
      locals.user = user;
      error = void 0;
      break;

    case ActionTypes.SIGNIN_ERROR:
      signingIn = false;
      error = err;
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
