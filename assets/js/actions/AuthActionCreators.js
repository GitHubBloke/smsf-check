import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import AuthAPI from '../api/AuthAPI';
import AuthStore from '../stores/AuthStore';

export default {
  signin(email, password) {
    //if (AuthStore.loggedIn(email)) { return; }

    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGNIN,
      email,
    });

    AuthAPI.signin(email, password);
  },

  signout() {
    if (!AuthStore.loggedIn()) { return; }
    AppDispatcher.handleViewAction({ type: ActionTypes.SIGNOUT });
    AuthAPI.signout();
  },
};
