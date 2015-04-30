import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import router from '../router';

export default {
  handleSigninSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNIN_SUCCESS,
      response,
    });

    router.transitionTo('members');
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

    router.transitionTo('/');
  },

  handleSignoutError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNOUT_ERROR
    });
  },
};
