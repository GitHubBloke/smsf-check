import React from 'react';

import BaseComponent from './BaseComponent';
import SurveyActionCreators from '../actions/SurveyActionCreators';
import SurveyStore from '../stores/SurveyStore';

export function wrapSurvey({ requireSkippable, confirmDirtySurvey }, Component) {
  class Authenticated extends BaseComponent {
    static willTransitionTo(transition) {
      if (requireSkippable && !SurveyStore.isSkippable()) {
        transition.redirect('members');
      }
    }

    static willTransitionFrom(transition) {
      if (confirmDirtySurvey && SurveyStore.isDirty()) {
        if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
          transition.abort();
        } else {
          SurveyActionCreators.clearDirty();
        }
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return Authenticated;
}
