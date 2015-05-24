import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SurveyAPI from '../api/SurveyAPI';
import SurveyStore from '../stores/SurveyStore';

import router from '../router';

const validators = [];

export default {
  addMember(member) {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_ADD_MEMBER, member });
  },

  save(cb = () => {}, currentStep) {
    const valid = _.reduce(validators, (valid, validator) => validator() && valid, true);

    if (valid) {
      if (SurveyStore.isDirty()) {
        const survey = SurveyStore.getDirtySurvey().toJS();
        survey.currentStep = currentStep;

        AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_SAVE });
        SurveyAPI.save(survey, cb);
      } else {
        cb();
      }
    } else {
      AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_SAVE_ERROR });
    }
  },

  saveAndTransitionTo(nextRoute) {
    this.save(() => router.transitionTo(nextRoute), nextRoute);
  },

  makeDirty(dirtySurvey) {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_MAKE_DIRTY, dirtySurvey });
  },

  makeMemberDirty(member, dirtyMember) {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_MAKE_MEMBER_DIRTY, member, dirtyMember });
  },

  deleteMember(member) {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_DELETE_MEMBER, member });
  },

  clearDirty() {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_CLEAR_DIRTY });
  },

  addValidator(validator) {
    validators.push(validator);
  },

  removeValidator(validator) {
    _.remove(validators, (v) => validator === v);
  },
};
