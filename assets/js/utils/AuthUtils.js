import React from 'react';

import AuthServerActionCreators from '../actions/AuthServerActionCreators';
import AuthStore from '../stores/AuthStore';
import BaseComponent from './BaseComponent';

export function requireAuth(Component) {
  class Authenticated extends BaseComponent {
    static willTransitionTo(transition) {
      if (!AuthStore.signedIn()) {
        transition.redirect('signin', {}, { next: transition.path });
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return Authenticated;
}

export function requireUnauth(Component) {
  class Unauthenticated extends BaseComponent {
    static willTransitionTo(transition) {
      if (AuthStore.signedIn()) {
        const user = AuthStore.getUser();
        AuthServerActionCreators.handleSigninSuccess({ user });
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return Unauthenticated;
}

