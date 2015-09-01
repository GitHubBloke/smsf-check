import _ from 'lodash';

import { column, csvToSeries } from '../../base';

const data = {
  config: _.merge({}, column, {
    title: {
      text: 'Member Income',
      useHTML: true,
    },

    xAxis: {
      categories: [
        '$0 - $20k',
        '$20 - $40k',
        '$40 - $60k',
        '$60 - $80k',
        '$80 - $100k',
        '$100 - $150k',
        '$150 - $200k',
        '$200 - $500k',
        '$500k+',
        'Unknown',
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
    siq: {},
    ato: csvToSeries(require('./ato.csv'), true),
  },

  getActiveDataset(source, member) {
    const dataset = data.series[source];
    return member ? null : dataset['All'];
  },
};

export default data;
