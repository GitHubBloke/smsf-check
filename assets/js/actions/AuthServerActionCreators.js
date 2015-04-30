import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
  handleSigninSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNIN_SUCCESS,
      response,
    });
  },

  handleSigninError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNIN_ERROR
    });
  },

  handleSignoutSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNOUT_SUCCESS,
      response,
    });
  },

  handleSignoutError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNOUT_ERROR
    });
  },
};
