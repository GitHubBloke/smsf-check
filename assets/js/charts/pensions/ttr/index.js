import _ from 'lodash';
import moment from 'moment';

import { column, csvToSeries, findGroup } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'TTR Pension Values',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '< $100k',
        '$100k - $500k',
        '$500k - $1M',
        '$1M - $2M',
        '$2M - $5M',
        '$5M - $10M',
      ],
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: '',
      },
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
