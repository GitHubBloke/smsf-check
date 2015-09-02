import _ from 'lodash';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Trust Deed Age',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '0-2 Years',
        '3-5 Years',
        '6-10 Years',
        '11-15 Years',
        '15+ Years',
      ],
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv'), true),
    ato: {},
  },

  getActiveDataset(source, member, survey) {
    const dataset = data.series[source];

    if (member) {
      return null;
    } else if (survey) {
      const fundBalance = _.sum(survey.get('members').toJS(), (member) => parseFloat(member.currentMemberBalance));
      return findGroup(fundBalance, dataset) || dataset['All'];
    }

    return dataset['All'];
  },
};

export default data;
