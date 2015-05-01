import Immutable, { Map } from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let signingUp, registeredUser, signupError;
let resetingPassword, resetPasswordError, newPassword;

const UserStore = createStore({
  signingUp() {
    return signingUp;
  },

  getRegisteredUser() {
    return registeredUser;
  },

  getSignupError() {
    return signupError;
  },

  resetingPassword() {
    return resetingPassword;
  },

  getNewPassword() {
    return newPassword;
  },

  getResetPasswordError() {
    return resetPasswordError;
  },
});

UserStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response, err } = action;

  const user = response && response.user;

  switch (action.type) {
    case ActionTypes.USER_SIGNUP:
      signingUp = true;
      signupError = void 0;
      break;

    case ActionTypes.USER_SIGNUP_SUCCESS:
      signingUp = false;
      registeredUser = Immutable.fromJS(user);
      signupError = void 0;
      break;

    case ActionTypes.USER_SIGNUP_ERROR:
      signingUp = false;
      signupError = err;
      break;

    case ActionTypes.CLEAR_USER_SIGNUP:
      registeredUser = void 0;
      signupError = void 0;
      break;

    case ActionTypes.USER_RESET_PASSWORD:
      newPassword = action.password;
      resetingPassword = true;
      resetPasswordError = void 0;
      break;

    case ActionTypes.USER_RESET_PASSWORD_SUCCESS:
      resetingPassword = false;
      resetPasswordError = void 0;
      break;

    case ActionTypes.USER_RESET_PASSWORD_ERROR:
      resetingPassword = false;
      resetPasswordError = err;
      break;

    case ActionTypes.CLEAR_USER_RESET_PASSWORD_ERROR:
      resetPasswordError = void 0;
      break;

    default:
      return;
  }

  UserStore.emitChange();
});

export default UserStore;
