import _ from 'lodash';
import Immutable from 'immutable';
import Joi from 'joi';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let currentSurvey, dirtySurvey;
let saving, saveError;

if (locals.user) { currentSurvey = dirtySurvey = Immutable.fromJS(locals.user.survey); }

const SurveyStore = createStore({
  getSurvey() { return currentSurvey; },
  getDirtySurvey() { return dirtySurvey; },
  isDirty() { return currentSurvey !== dirtySurvey; },

  isSaving() { return saving; },
  getSaveError() { return saveError; },
});

SurveyStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response, err } = action;

  switch (action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
      const user = response && response.user;
      currentSurvey = dirtySurvey = Immutable.fromJS(user.survey);
      break;

    case ActionTypes.SURVEY_ADD_MEMBER:
      const { member } = action;
      dirtySurvey = dirtySurvey.update('members', (v) => v.push(Immutable.fromJS(member)));
      break;

    case ActionTypes.SURVEY_SAVE:
      saving = true;
      saveError = void 0;
      break;

    case ActionTypes.SURVEY_SAVE_SUCCESS:
      saving = false;
      currentSurvey = dirtySurvey;
      saveError = void 0;
      break;

    case ActionTypes.SURVEY_SAVE_ERROR:
      saving = false;
      saveError = err;
      break;

    default:
      return;
  }

  SurveyStore.emitChange();
});

export default SurveyStore;
