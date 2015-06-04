import _ from 'lodash';

import { pie, csvToSeries } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Member Age',
      useHTML: true,
    },
  }),
  series: {
    siq: csvToSeries(require('./age-siq.csv')),
    ato: csvToSeries(require('./age-ato.csv')),
  }
};
