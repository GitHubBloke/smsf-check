import _ from 'lodash';
import moment from 'moment';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Total Contribitions',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '< $5k',
        '$5 - $10k',
        '$10 - $20k',
        '$20 - $30k',
        '$30 - $50k',
        '$50 - $100k',
        '$100 - $200k',
        '$200 - $500k',
        '$500k - $1M',
      ],
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv'), true),
    ato: {},
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
