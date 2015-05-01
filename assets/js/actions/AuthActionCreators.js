import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import AuthAPI from '../api/AuthAPI';
import AuthStore from '../stores/AuthStore';

export default {
  signin(email, password) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGNIN,
      email,
    });

    AuthAPI.signin(email, password);
  },

  signout() {
    AppDispatcher.handleViewAction({ type: ActionTypes.SIGNOUT });
    AuthAPI.signout();
  },

  clearSigninError() {
    AppDispatcher.handleViewAction({ type: ActionTypes.CLEAR_SIGNIN_ERROR });
  },
};
