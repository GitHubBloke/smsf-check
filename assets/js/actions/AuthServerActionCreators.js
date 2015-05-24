import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import router from '../router';

export default {
  handleSigninSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNIN_SUCCESS,
      response,
    });

    const query = router.getCurrentQuery();
    router.replaceWith((query && query.next) || '/');
  },

  handleSigninError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.SIGNIN_ERROR,
      err
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
      type: ActionTypes.SIGNOUT_ERROR,
      err
    });
  },
};
