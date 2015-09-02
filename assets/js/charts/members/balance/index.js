import _ from 'lodash';
import moment from 'moment';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Member Balance',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '$50 - $100k',
        '$100 - $150k',
        '$150 - $200k',
        '$200 - $500k',
        '$500k - $1M',
        '$1 - $2M',
        '$2 - $5M',
        '$5 - $10M',
        '> $10M',
      ],
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv'), true),
    ato: csvToSeries(require('./ato.csv'), true),
  },

  getActiveDataset(source, member) {
    const dataset = data.series[source];

    if (member) {
      const age = moment().diff(moment(member.get('dateOfBirth'), 'DD / MM / YYYY'), 'years');
      return findGroup(age, dataset);
    } else {
      return dataset['All'];
    }
  },
};

export default data;
