import _ from 'lodash';

import { column, csvToSeries } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Fund Balance',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '< $50k',
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

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: '',
      }
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv'), true),
    ato: csvToSeries(require('./ato.csv'), true),
  },

  getActiveDataset(source, member) {
    const dataset = data.series[source];
    return member ? null : dataset['All'];
  },
};

export default data;
