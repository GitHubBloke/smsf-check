import _ from 'lodash';

import { pie, csvToSeries } from '../../base';

const data = {
  config: _.merge({}, pie, {
    title: {
      text: 'Number of Members',
      useHTML: true,
    },
  }),

  series: {
    siq: csvToSeries(require('./siq.csv')),
    ato: csvToSeries(require('./ato.csv')),
  },

  getActiveDataset(source, member) {
    const dataset = data.series[source];
    if (!dataset) { return null; }
    return member ? null : dataset['All'];
  },
};

export default data;
