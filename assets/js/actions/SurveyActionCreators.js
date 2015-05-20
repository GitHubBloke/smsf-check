import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SurveyStore from '../stores/SurveyStore';

export default {
  addMember(member) {
    AppDispatcher.handleViewAction({ type: ActionTypes.SURVEY_ADD_MEMBER, member });
  },
};
