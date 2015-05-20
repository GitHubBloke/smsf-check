import Immutable from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let currentSurvey, dirtySurvey;

if (locals.user) { currentSurvey = dirtySurvey = Immutable.fromJS(locals.user.survey); }

const SurveyStore = createStore({
  getSurvey() { return currentSurvey; },
  getDirtySurvey() { return dirtySurvey; },
  isDirty() { return currentSurvey !== dirtySurvey; }
});

SurveyStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response, member, err } = action;

  switch (action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
      const user = response && response.user;
      currentSurvey = dirtySurvey = Immutable.fromJS(user.survey);
      break;

    case ActionTypes.SURVEY_ADD_MEMBER:
      dirtySurvey = dirtySurvey.update('members', (v) => v.push(Immutable.fromJS(member)));
      break;

    default:
      return;
  }

  SurveyStore.emitChange();
});

export default SurveyStore;
