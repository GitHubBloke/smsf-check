import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import UserAPI from '../api/UserAPI';
import UserStore from '../stores/UserStore';

export default {
  signup(user) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.USER_SIGNUP,
      user,
    });

    UserAPI.signup(user);
  },

  clearSignup() {
    AppDispatcher.handleViewAction({ type: ActionTypes.CLEAR_USER_SIGNUP });
  },
};
