import _ from 'lodash';
import prefix from 'superagent-prefix';
import request from 'superagent';

import router from '../router';
import SurveyServerActionCreators from '../actions/SurveyServerActionCreators';

const prefixer = prefix('/api/surveys');

export default {
  save(survey, cb = () => {}) {
    request.put(`/${survey.id}`)
      .use(prefixer)
      .send(survey)
      .end((err, res) => {
        if (err || !res.status === 200) {
          return SurveyServerActionCreators.handleSaveError(res.body);
        }

        SurveyServerActionCreators.handleSaveSuccess(res.body);
        cb();
      }
    );
  },
};
