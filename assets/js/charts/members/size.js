import _ from 'lodash';
import React from 'react';

import { pie, csvToSeries } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Member Size',
      useHTML: true,
    },
  }),
  series: {
    siq: csvToSeries(require('./size-siq.csv')),
    ato: csvToSeries(require('./size-ato.csv')),
  }
};
