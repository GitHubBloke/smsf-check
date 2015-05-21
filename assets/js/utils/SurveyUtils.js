import React from 'react';

import SurveyStore from '../stores/SurveyStore';
import BaseComponent from './BaseComponent';

export function requireSkippable(Component) {
  class Authenticated extends BaseComponent {
    static willTransitionTo(transition) {
      if (!SurveyStore.isSkippable()) {
        transition.redirect('members');
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return Authenticated;
}
