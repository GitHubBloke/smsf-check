import AuthActionCreators from '../actions/AuthActionCreators';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import UserStore from '../stores/UserStore';

import router from '../router';

export default {
  handleSignupSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_SIGNUP_SUCCESS,
      response,
    });
  },

  handleSignupError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_SIGNUP_ERROR,
      err
    });
  },

  handleResetPasswordSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_RESET_PASSWORD_SUCCESS,
      response,
    });

    AuthActionCreators.signin(response.user.email, UserStore.getNewPassword());
  },

  handleResetPasswordError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.USER_RESET_PASSWORD_ERROR,
      err
    });
  },
};
