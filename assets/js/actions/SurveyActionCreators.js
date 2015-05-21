import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SurveyAPI from '../api/SurveyAPI';
import SurveyStore from '../stores/SurveyStore';

const validators = [];

export default {
  addMember(member) {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_ADD_MEMBER, member });
  },

  save() {
    const valid = _.reduce(validators, (valid, validator) => validator() && valid, true);

    if (valid) {
      if (SurveyStore.isDirty()) {
        AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_SAVE });
        SurveyAPI.save(SurveyStore.getDirtySurvey().toJS());
      }
    } else {
      AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_SAVE_ERROR });
    }
  },

  makeDirty(dirtySurvey) {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_MAKE_DIRTY, dirtySurvey });
  },

  makeMemberDirty(member, dirtyMember) {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_MAKE_MEMBER_DIRTY, member, dirtyMember });
  },

  addValidator(validator) {
    validators.push(validator);
  },

  removeValidator(validator) {
    _.remove(validators, (v) => validator === v);
  },
};
