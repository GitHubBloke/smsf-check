import SurveyActionCreators from '../actions/SurveyActionCreators';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SurveyStore from '../stores/SurveyStore';

export default {
  handleSaveSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SURVEY_SAVE_SUCCESS,
      response,
    });
  },

  handleSaveError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.SURVEY_SAVE_ERROR,
      err
    });
  },
};
