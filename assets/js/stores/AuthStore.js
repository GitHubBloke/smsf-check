import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let loggingIn;

const AuthStore = createStore({
  loggingIn() {
    return loggingIn;
  },

  loggedIn(email) {
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
      loggingIn = true;
      AuthStore.emitChange();
      break;

    case ActionTypes.SIGNIN_SUCCESS:
      loggingIn = false;
      locals.user = user;
      AuthStore.emitChange();
      break;

    case ActionTypes.SIGNOUT_SUCCESS:
      loggingIn = false;
      delete locals.user;
      AuthStore.emitChange();
      break;
  }
});

export default AuthStore;
