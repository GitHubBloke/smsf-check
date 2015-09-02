import _ from 'lodash';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Accounting & Tax Fees',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '$0 - $999',
        '$1,000 - $1,499',
        '$1,500 - $1,999',
        '$2,000 - $2,499',
        '$2,500 - $2,999',
        '$3,000 - $3,499',
        '$3,500 - $3,999',
        '$4,000 - $4,499',
        '$4,500 - $4,999',
        '$5,000+',
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
