import _ from 'lodash';

import { pie, csvToSeries } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Trust Deed Supplier',
      useHTML: true,
    },
  }),
  series: {
    siq: csvToSeries(require('./deedSupplier-siq.csv')),
  }
};
