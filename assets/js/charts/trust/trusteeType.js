import _ from 'lodash';
import React from 'react';

import { pie, csvToSeries } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Trustee Type',
      useHTML: true,
    },
  }),
  series: {
    siq: csvToSeries(require('./trusteeType-siq.csv')),
    ato: csvToSeries(require('./trusteeType-ato.csv')),
  }
};
