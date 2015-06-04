import _ from 'lodash';

import { pie, csvToSeries } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Member Gender',
      useHTML: true,
    },
  }),
  series: {
    siq: csvToSeries(require('./gender-siq.csv')),
    ato: csvToSeries(require('./gender-ato.csv')),
  }
};
