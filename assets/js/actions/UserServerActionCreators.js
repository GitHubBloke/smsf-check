import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

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
};
