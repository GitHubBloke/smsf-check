import _ from 'lodash';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Asset Allocation',
      useHTML: true,
    },

    xAxis: {
      categories: [
        'Avg Aust Shares Percent',
        'Avg Cash Fixed Percent',
        'Avg Direct Prop Percent',
        'Avg Intl Fixed Percent',
        'Avg Intl Shares Percent',
        'Avg Listed Prop Percent',
        'Avg Mortgages Percent',
        'Avg Other Percent',
      ],
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv'), true),
    ato: csvToSeries(require('./ato.csv'), true),
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
