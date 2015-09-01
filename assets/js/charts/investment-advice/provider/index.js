import _ from 'lodash';

import { pie, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, pie, {
    title: {
      text: 'Source of Investment Advice',
      useHTML: true,
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv')),
    ato: {},
  },

  getActiveDataset(source, member, survey) {
    const dataset = data.series[source];

    if (member) {
      return findGroup(member.get('currentMemberBalance'), dataset);
    } else if (survey) {
      const fundBalance = _.sum(survey.get('members').toJS(), (member) => parseFloat(member.currentMemberBalance));
      return findGroup(fundBalance, dataset);
    }

    return dataset['All'];
  },
};

export default data;
