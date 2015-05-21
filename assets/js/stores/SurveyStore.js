import _ from 'lodash';
import Immutable from 'immutable';
import Joi from 'joi';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';
import locals from '../utils/locals';

let currentSurvey, dirtySurvey;
let saving = false, saveError;

if (locals.user) { currentSurvey = dirtySurvey = Immutable.fromJS(locals.user.survey); }

const SurveyStore = createStore({
  getSurvey() { return currentSurvey; },

  getDirtySurvey() { return dirtySurvey; },
  isDirty() { return currentSurvey !== dirtySurvey; },

  isSaving() { return saving; },
  getSaveError() { return saveError; },

  isSkippable() { return !currentSurvey.get('members').isEmpty(); },
});

SurveyStore.dispatchToken = AppDispatcher.register((payload) => {
  const { action } = payload;
  const { response, err } = action;

  switch (action.type) {
    case ActionTypes.SIGNIN_SUCCESS:
      const user = response && response.user;
      if (!currentSurvey || !dirtySurvey) {
        currentSurvey = dirtySurvey = Immutable.fromJS(user.survey);
      }
      break;

    case ActionTypes.SIGNOUT_SUCCESS:
      currentSurvey = void 0;
      dirtySurvey = void 0;
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
      const survey = response && response.survey;
      saving = false;
      currentSurvey = dirtySurvey = Immutable.fromJS(survey);
      saveError = void 0;
      break;

    case ActionTypes.SURVEY_SAVE_ERROR:
      saving = false;
      saveError = err;
      break;

    case ActionTypes.SURVEY_MAKE_DIRTY:
      dirtySurvey = action.dirtySurvey;
      break;

    case ActionTypes.SURVEY_MAKE_MEMBER_DIRTY:
      const { member, dirtyMember } = action;
      const members = dirtySurvey.get('members');
      const index = members.indexOf(member);
      dirtySurvey = dirtySurvey.setIn([ 'members', index ], dirtyMember);
      break;

    case ActionTypes.SURVEY_DELETE_MEMBER:
      const { member } = action;
      const members = dirtySurvey.get('members');
      const index = members.indexOf(member);
      dirtySurvey = dirtySurvey.deleteIn([ 'members', index ]);
      break;

    case ActionTypes.SURVEY_CLEAR_DIRTY:
      dirtySurvey = currentSurvey;
      break;

    default:
      return;
  }

  SurveyStore.emitChange();
});

export default SurveyStore;
