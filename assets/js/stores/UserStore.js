import Immutable, { Map } from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let signingUp;
let registeredUser;
let signupError;

const UserStore = createStore({
  signingUp() {
    return signingUp;
  },

  registeredUser() {
    return registeredUser;
  },

  getSignupError() {
    return signupError;
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

    default:
      return;
  }

  UserStore.emitChange();
});

export default UserStore;
