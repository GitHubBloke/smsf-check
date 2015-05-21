import prefix from 'superagent-prefix';
import request from 'superagent';

import SurveyServerActionCreators from '../actions/SurveyServerActionCreators';

const prefixer = prefix('/api/surveys');

export default {
  save(survey, cb = () => {}) {
    setTimeout(() => {
      SurveyServerActionCreators.handleSaveSuccess();
      cb();
    }, 1000);
  },
};
