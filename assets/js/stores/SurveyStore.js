import Immutable from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let currentSurvey;

if (locals.user) { currentSurvey = Immutable.fromJS(locals.user.survey); }

const SurveyStore = createStore({
  getSurvey() { return currentSurvey; }
});

SurveyStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response, member, err } = action;

  switch (action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
      const user = response && response.user;
      currentSurvey = Immutable.fromJS(user.survey);
      break;

    case ActionTypes.SURVEY_ADD_MEMBER:
      currentSurvey = currentSurvey.update('members', (v) => v.push(Immutable.fromJS(member)));
      break;

    default:
      return;
  }

  SurveyStore.emitChange();
});

export default SurveyStore;
