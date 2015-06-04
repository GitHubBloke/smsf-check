import _ from 'lodash';
import React from 'react';

import { pie } from '../base';

export default {
  config: _.merge({}, pie, {
    title: {
      text: 'Trustee Type',
      useHTML: true,
    },
  }),
  series: {
    siq: [{
      animation: false,
      name: '% of total',
      data: [
        ['Individuals as Trustee', 54.02],
        ['Corporate Trustee', 45.99],
      ],
    }],
    ato: [{
      animation: false,
      name: '% of total',
      data: [
        ['Individuals as Trustee', 76.94],
        ['Corporate Trustee', 23.06],
      ],
    }],
  }
};
